<script setup lang="ts">
    import { ref } from 'vue'
    import { RouterLink } from 'vue-router'
    import DepListItem from '../components/DepListItem.vue'
    import DepsPanel from '@/components/DepsPanel.vue'
    import ListPagination from '@/components/ListPagination.vue'
    import { storeToRefs } from 'pinia'
    import { useDepsStore } from '@/stores/deps'
    import type { Dep } from '@/types'

    const depsStore = useDepsStore()
    const { allDepsList, getSliceOfDeps } = storeToRefs(depsStore)
    const selectedChain = ref<Dep[]>([])
    const selectedChainName = ref('')
    const toggleSidePanel = ref(false)
    const currentOpenDep = ref('')

    const depListToView = (chain: Dep[], chainName: string) => {
        selectedChain.value = chain
        selectedChainName.value = chainName
    }

    const panelToggle = (selectedDepId: string) => {
        if(selectedDepId === currentOpenDep.value) {
            toggleSidePanel.value = !toggleSidePanel.value
        } else {
            toggleSidePanel.value = true;
        }
        currentOpenDep.value = selectedDepId
    }
</script>

<template>
    <main>
        <div class="list-header">
            <h1>Diagnostic Chains</h1>
            <router-link class="btn" to="/design">Design Chain</router-link>
        </div>
        <div class="dep-list-content">
            <div v-if="allDepsList.length > 0" class="grid">
                <div :class="['dep-thumbnail-card', dep.chainId === currentOpenDep && toggleSidePanel && 'dep-thumbnail-card--active']" v-for="dep in getSliceOfDeps" :key="dep.chainId" @click="depListToView(dep.chain, dep.chainName), panelToggle(dep.chainId)">
                    <DepListItem :name="dep.chainName" :id="dep.chainId" :depList="dep.chain" :timestamp="dep.timestamp" />
                </div>
            </div>
            <div class="dep-list-empty-content" v-else>
                <p>No Diagnostic Chains to show!</p>
            </div>
            <div :class="['dep-side-panel', !toggleSidePanel && 'hide-panel']">
                <div class="panel-header">
                    <h2>{{ selectedChainName }}</h2>
                    <span class="panel-close" @click="toggleSidePanel = !toggleSidePanel"><font-awesome-icon icon="fa-solid fa-xmark" /></span>
                </div>
                <DepsPanel :depList="selectedChain" :showScreenCaptureBtn="false" :isThumbnailPreview="false" />
            </div>
        </div>
        <ListPagination v-if="allDepsList.length > 0" />
    </main>
</template>

<style>

    main {
        height: calc(100vh - 115px);
    }

    .list-header {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        background: #F7F7F7;
    }

    .list-header h1 {
        color: #4c4d55;
        font-family: "Poppins";
        font-weight: 800;
        font-size: 22px;
    }

    .dep-list-content {
        display: flex;
    }

    .dep-list-empty-content {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-top: 15%;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 32px;
        grid-row-gap: 32px;
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        padding: 40px;
    }

    .dep-thumbnail-card {
        background: #e9eff4;
        box-shadow: 0px 4px 14px #c9dbe9;
        border-radius: 15px;
        width: 100%;
    }

    .dep-thumbnail-card--active {
        border: 3px solid #6d55f7;
    }

    .btn {
        background: #0d6af6;
        color: #FFFFFF;
        border: 0 solid transparent;
        border-radius: 50px;
        box-shadow: 0 4px 16px rgb(32 19 104 / 25%);
        font-family: "Poppins", sans-serif;
        font-size: 12px;
        font-weight: 600;
        padding: 10px 20px;
        text-transform: uppercase;
        text-decoration: none;
        transition-timing-function: ease-in;
        transition: 0.5s;
        cursor: pointer;
    }

    .dep-side-panel {
        display: block;
        width: 430px;
        background: #F7F7F7;
        position: fixed;
        right: 0;
        z-index: 1;
        height: calc(100% - 213px);
        overflow-y: auto;
        opacity: 1;
        margin-top: -2px;
        -webkit-transition: margin-right 100ms cubic-bezier(0.65, 0.05, 0.36, 1);
        transition: margin-right 100ms cubic-bezier(.65, .05, .36, 1);
        box-shadow: -4px 0 10px -5px #c9dbe9;
    }

    .hide-panel {
        margin-right: -430px;
    }

    .panel-header {
        display: flex;
        justify-content: space-between;
        background: #e9eff4;
    }

    .panel-header h2 {
        color: #4c4d55;
        font-family: "Poppins";
        font-weight: 800;
        font-size: 20px;
        padding: 10px 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        top: 2px;
    }

    .panel-close {
        font-size: 24px;
        padding: 10px 20px;
        cursor: pointer;
        transition-timing-function: ease-in;
        transition: 0.5s;
    }

    .panel-close:hover {
        color: #0d6af6;
    }
</style>