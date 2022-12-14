<script setup lang="ts">
    import { ref } from 'vue'
    import { Sortable } from "sortablejs-vue3"
    import DashColorSection from "../components/DashColorSection.vue"
    import DashThemeSection from "../components/DashThemeSection.vue"
    import SupportMsgToggleSection from "./SupportMsgToggleSection.vue"
    import DashDepListItem from "../components/DashDepListItem.vue"
    import SaveDepSection from './SaveDepSection.vue';
    import { storeToRefs } from 'pinia'
    import { useDepsStore } from '@/stores/deps'

    const depsStore = useDepsStore()
    const { depsList } = storeToRefs(depsStore)
    const { addNewDep, onSort, resetDeps } = depsStore

    const props = defineProps<{
        chainId: string | string[]
    }>()

    // Sortable values
    const sortableInstance = ref({
        animation: 150,
        easing: "cubic-bezier(1, 0, 0, 1)",
        handle: ".dep-header-handle",
        ghostClass: 'ghost'
    })
</script>

<template>
    <div class="deps-config">
        <h4 class="dashboard-greeting">Diagnostic Chain Designer</h4>
        <hr />
        <DashColorSection />
        <DashThemeSection />
        <SupportMsgToggleSection />
        <Sortable :class="depsList.length >= 1 && 'deps-list'" :list="depsList" item-key="id" :options="sortableInstance" @sort="(event) => onSort(event)">
            <template #item="{element, index}">
                <div class="draggable" :key="element.id">
                    <DashDepListItem :index="index" />
                </div>
            </template>
        </Sortable>
        <div class="deps-actions">
            <button class="btn btn-secondary" :class="depsList.length === 0 && 'btn-below'" @click="addNewDep">
                <font-awesome-icon icon="fa-solid fa-plus"/>Create New Diagnostic Item
            </button>
            <button v-if="depsList.length >= 1" class="btn btn-secondary" :class="depsList.length === 0 && 'btn-below'" @click="resetDeps">
                <font-awesome-icon icon="fa-solid fa-rotate-left" />Reset
            </button>
        </div>
        <SaveDepSection :chainId="chainId" />
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

    .deps-actions {
        display: flex;
        justify-content: space-between;
    }

    @media screen and (max-width: 320px) {
        .deps-actions {
            flex-direction: column;
        }
    }

    .ghost {
        opacity: 0.1;
        background: #6d55f7;
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
        transition-timing-function: ease-in;
        transition: 0.5s;
        margin-bottom: 30px;
        cursor: pointer;
    }

    .btn-secondary {
        background: transparent;
        border: 0 solid transparent;
        color: #0d6af6;
        padding: 10px 0;
        border-radius: 0;
        box-shadow: none;
    }

    .btn-secondary:hover {
        color: #0c54c0;
    }

    .btn-below {
        margin-top: 25px;
    }

    .fa-plus, .fa-rotate-left {
        margin-right: 5px;
    }
</style>