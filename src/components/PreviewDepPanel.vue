<script setup lang="ts">
    import SupportMsgToggleSection from "./SupportMsgToggleSection.vue"
    import SimpleListItem from './SimpleListItem.vue'
    import { storeToRefs } from 'pinia'
    import { useDepsStore } from '@/stores/deps'

    const depsStore = useDepsStore()
    const { depsList } = storeToRefs(depsStore)

    const props = defineProps<{
        chainId: string | string[]
    }>()
</script>

<template>
    <div class="deps-config">
        <h4 class="dashboard-greeting">Diagnostic Chain Viewer</h4>
        <hr />
        <SupportMsgToggleSection />
        <div :class="depsList.length >= 1 && 'deps-list'" v-for="(dep, index) in depsList" :key="dep.id">
            <SimpleListItem :index="index" />
        </div>
    </div>
</template>

<style scoped>
    .deps-config {
        width: 380px;
        background: #e9eff4;
        padding: 20px 40px;
        overflow-y: auto;
    }

    @media screen and (max-width: 950px) {
        .deps-config {
            width: 100%;
        }
    }

    @media screen and (max-width: 380px) {
        .deps-config {
            padding: 20px;
        }
    }

    .deps-config .dashboard-greeting {
        color: #4c4d55;
        font-family: "Poppins";
        font-weight: 800;
        font-size: 20px;
        text-align: center;
        margin: 0 5px 20px 5px;
    }

    .deps-config hr {
        width: 100%;
        height: 3px;
        background: #6d55f7;
        border: 0;
    }

    .deps-list {
        margin-top: 20px;
        margin-bottom: 25px;
    }
</style>