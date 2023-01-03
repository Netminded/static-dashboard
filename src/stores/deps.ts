import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid'
import { DepStatusColors } from "@/types"
import type { Dep, Deps, SupportMsgs } from "@/types"
import { database } from "../firebase/firebaseConfig"
import { ref as fbRef, onValue, push, remove, update } from "firebase/database";
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'


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
        thirdPartyItem: false
    }

    const depsList = ref<Dep[]>([])

    const allDepsList = ref<Array<Deps>>([])

    const depsName = ref('')

    const skip = 4

    const currentPage = ref(1)

    const router = useRouter()

    // Compute a single dependency based on an index
    const depItem = computed(() => {
        return (index: number) => depsList.value[index]
    })

    // Compute a list of dependencies whuch have the isAdded status
    const addedDepsList = computed(() => depsList.value.filter(dep => dep.added === true))

    const getNumPages = computed(() => {
        return Math.ceil(allDepsList.value.length / skip)
    })

    const getSliceOfDeps = computed(() => {
        return allDepsList.value.slice(skip * currentPage.value - skip, skip * currentPage.value)
    })

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
        supportExpanded: boolean, 
        thirdPartyItem: boolean) => {
        depsList.value[index] = {...depsList.value[index], title, statusMsg, statusColor, added, expanded, supportMsgs, supportExpanded, thirdPartyItem}
    }

    const updateDepsList = (deps: Dep[]) => {
        depsList.value = deps
    }

    const updateDepName = (name: string) => {
        depsName.value = name
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

    /**
     * Increments currentPage by 1
     */
     const incrementCurrentPage = () => {
        currentPage.value++
    }

    /**
     * Decrements currentPage by 1
     */
    const decrementCurrentPage = () => {
        currentPage.value--
    }

    const saveDepToDb = (userId: string, role: number, teamId: string, depName: string, dep: string) => {
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
                }).then(() => {
                    Swal.fire(
                        'Chain Saved!',
                        'Your chain has successfully been saved.',
                        'success'
                    )
                    router.push('/')
                }).catch((err) => {
                    Swal.fire(
                        'Oops!',
                        'There was an issue saving your chain.',
                        'error'
                    )
                })
            }
        })
    }

    const getAllSavedDeps = (userId: string, teamId: string) => {
        let fbError
        let isError = false
        let isInTeam = false
        const teamRef = fbRef(database, `teams/${teamId}/team_members/${userId}`)
        const teamDepsRef = fbRef(database, `teams/${teamId}/diagnostic_chains`)
        onValue(teamRef, (snapshot) => {
            let data = snapshot.val()
            if(data['user_id'] && data['user_id'] === userId) {
                onValue(teamDepsRef, (snapshot) => {
                    allDepsList.value = []
                    snapshot.forEach((childSnapshot) => {
                        if(childSnapshot.key) {
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
        // TODO: Add validation to the UI if failed to get all deps
    }

    const removeSavedDep = (userId: string | null | undefined, role: number | null | undefined, teamId: string | null | undefined, depId: string) => {
        let isInTeam = false
        const teamRef = fbRef(database, `teams/${teamId}/team_members/${userId}`)
        const teamDepsRef = fbRef(database, `teams/${teamId}/diagnostic_chains/${depId}`)
        Swal.fire({
                title: 'Are you sure you want to delete this chain?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    onValue(teamRef, (snapshot) => {
                        let data = snapshot.val()
                        if(data['user_id'] && data['user_id'] === userId) isInTeam = true
                        if (role && role <= 2 && isInTeam) {
                            remove(teamDepsRef).then(() => {
                                Swal.fire(
                                    'Deleted!',
                                    'Your chain has been deleted.',
                                    'success'
                                )
                            }).catch((err) => {
                                Swal.fire(
                                    'Oops!',
                                    'There was an issue deleting your chain.',
                                    'error'
                                )
                            })
                        }
                    })
                }         
        })
    }

    const updateDepInDb = (userId: string, role: number, teamId: string, chainId: string, depName: string, dep: string) => {
        let isInTeam = false
        const teamRef = fbRef(database, `teams/${teamId}/team_members/${userId}`)
        const teamDepsRef = fbRef(database, `teams/${teamId}/diagnostic_chains/${chainId}`)
        onValue(teamRef, (snapshot) => {
            let data = snapshot.val()
            if(data['user_id'] && data['user_id'] === userId) isInTeam = true
            if(role <= 2 && isInTeam) {
                update(teamDepsRef, {
                    chain_name: depName,
                    chain: dep
                }).then(() => {
                    Swal.fire(
                        'Chain Updated!',
                        'Your chain has successfully been updated.',
                        'success'
                    )
                    router.push('/')
                }).catch((err) => {
                    Swal.fire(
                        'Oops!',
                        'There was an issue updating your chain.',
                        'error'
                    )
                })
            }
        })
    }

    return { depsList, allDepsList, depItem, addedDepsList, depsName, currentPage, getNumPages, getSliceOfDeps,
        addNewDep, updateDep, updateDepsList, updateDepName, updateDepSupportExpanded, removeDep, onSort, resetDeps, saveDepToDb, 
        getAllSavedDeps, removeSavedDep, updateDepInDb, incrementCurrentPage, decrementCurrentPage }
})