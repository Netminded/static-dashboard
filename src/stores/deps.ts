import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid'
import { DepStatusColors } from "@/types"

interface Dep {
    id: string,
    title: string,
    statusMsg: string,
    statusColor: DepStatusColors,
    added: boolean,
    expanded: boolean
}

export const useDepsStore = defineStore("deps", () => {

    const depsTemplate = {
        title: '',
        statusMsg: '',
        statusColor: DepStatusColors.Green,
        added: false,
        expanded: true,
    }

    const depsList = ref<Dep[]>([])

    const depItem = computed(() => {
        return (index: number) => depsList.value[index]
    })

    const addedDepsList = computed(() => depsList.value.filter(dep => dep.added === true))

    const addNewDep = () => {
        depsList.value.push({id: uuidv4(), ...depsTemplate})
    }

    const updateDep = (index: number, title: string, statusMsg: string, statusColor: DepStatusColors, added: boolean, expanded: boolean) => {
        depsList.value[index] = {...depsList.value[index], title, statusMsg, statusColor, added, expanded}
    }

    const removeDep = (index: number) => {
        depsList.value.splice(index, 1)
    }

    const onSort = ({oldIndex, newIndex}: {oldIndex: any, newIndex: any}) => {
        depsList.value.splice( newIndex, 0, depsList.value.splice(oldIndex, 1)[0] )
    }

    const resetDeps = () => {
        depsList.value = []
    }

    return { depsList, depItem, addedDepsList, addNewDep, updateDep, removeDep, onSort, resetDeps}
})