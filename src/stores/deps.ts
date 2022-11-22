import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid'
import { DepStatusColors } from "@/types"
import type { Dep, SupportMsgs } from "@/types"


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

    return { depsList, depItem, addedDepsList, addNewDep, updateDep, updateDepSupportExpanded, removeDep, onSort, resetDeps}
})