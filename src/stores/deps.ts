import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid'
import { DepStatusColors } from "@/types"
import type { Dep, Deps, SupportMsgs } from "@/types"
import { database } from "../firebase/firebaseConfig"
import { ref as fbRef, onValue, push, query, orderByChild } from "firebase/database";


export const useDepsStore = defineStore("deps", () => {

    // Default dependency template
    const depsTemplate = {
        title: '',
        statusMsg: '',
        statusColor: DepStatusColors.Green,
        added: false,
        expanded: true,
        supportMsgs: {
            [DepStatusColors.Red]: '',
            [DepStatusColors.Amber]: '',
            [DepStatusColors.Green]: '',
            [DepStatusColors.Default]: '',
        },
        supportExpanded: false,
    }

    const depsList = ref<Dep[]>([])

    const allDepsList = ref<Array<Deps>>([])

    // Compute a single dependency based on an index
    const depItem = computed(() => {
        return (index: number) => depsList.value[index]
    })

    // Compute a list of dependencies whuch have the isAdded status
    const addedDepsList = computed(() => depsList.value.filter(dep => dep.added === true))

    // Add a new dependency to the array with a unique id
    const addNewDep = () => {
        depsList.value.push({id: uuidv4(), ...depsTemplate})
    }

    // Merge the dependency id with updated values to edit the dependency
    const updateDep = (
        index: number, 
        title: string, 
        statusMsg: string, 
        statusColor: DepStatusColors, 
        added: boolean, 
        expanded: boolean, 
        supportMsgs: SupportMsgs, 
        supportExpanded: boolean) => {
        depsList.value[index] = {...depsList.value[index], title, statusMsg, statusColor, added, expanded, supportMsgs, supportExpanded}
    }

    const updateDepSupportExpanded = (id: string, supportExpanded: boolean) => {
        const item = depsList.value.findIndex((dep) => dep.id === id)
        depsList.value[item] = {...depsList.value[item], supportExpanded }
    }

    // Remove a dependency from the array
    const removeDep = (index: number) => {
        depsList.value.splice(index, 1)
    }

    // Re-order the dependencies array based on Sortablejs interactions 
    const onSort = ({oldIndex, newIndex}: {oldIndex: any, newIndex: any}) => {
        depsList.value.splice( newIndex, 0, depsList.value.splice(oldIndex, 1)[0] )
    }

    // Reset the dependencies array
    const resetDeps = () => {
        depsList.value = []
    }

    const saveDepToDb = (userId: string, role: number, teamId: string, depName: string, dep: string) => {
        let fbError
        let isError = false
        let isInTeam = false
        const teamRef = fbRef(database, `teams/${teamId}/team_members/${userId}`)
        const teamDepsRef = fbRef(database, `teams/${teamId}/diagnostic_chains`)
        onValue(teamRef, (snapshot) => {
            let data = snapshot.val()
            if(data['user_id'] && data['user_id'] === userId) isInTeam = true
            if(role <= 2 && isInTeam) {
                push(teamDepsRef, {
                    chain_name: depName,
                    chain: dep,
                    timestamp: Date.now()
                }).catch((err) => {
                    isError = true
                    fbError = err
                })
            }
        })
        // TODO: Add validation to the UI dep has saved
    }

    const getAllSavedDeps = (userId: string, teamId: string,) => {
        let fbError
        let isError = false
        let isInTeam = false
        const teamRef = fbRef(database, `teams/${teamId}/team_members/${userId}`)
        const teamDepsRef = fbRef(database, `teams/${teamId}/diagnostic_chains`)
        onValue(teamRef, (snapshot) => {
            let data = snapshot.val()
            if(data['user_id'] && data['user_id'] === userId) {
                onValue(teamDepsRef, (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        if(childSnapshot.key) {
                            allDepsList.value = []
                            allDepsList.value.push({
                                chainId: childSnapshot.key,
                                chain: JSON.parse(childSnapshot.val().chain),
                                chainName: childSnapshot.val().chain_name,
                                timestamp: childSnapshot.val().timestamp
                            })
                        }
                    })
                })
            }
        })
        
        // TODO: Add validation to the UI dep has saved
    }

    return { depsList, allDepsList, depItem, addedDepsList, 
        addNewDep, updateDep, updateDepSupportExpanded, removeDep, onSort, resetDeps, saveDepToDb, getAllSavedDeps }
})