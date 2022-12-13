<script setup lang="ts">
    import type { Dep } from '@/types'
    import DepsPanel from './DepsPanel.vue'
    import { storeToRefs } from 'pinia'
    import { useUsersStore } from '@/stores/users'
    import { useDepsStore } from '@/stores/deps'
    import { RouterLink } from 'vue-router'

    const usersStore = useUsersStore()
    const { userId, teamId, role } = storeToRefs(usersStore)
    const depsStore = useDepsStore()
    const { removeSavedDep } = depsStore

    const props = defineProps<{
        id: string
        name: string
        depList: Dep[]
        timestamp: number
    }>()

    const getDate = () => {
        const date = new Date(props.timestamp)
        return `${date.getUTCDay()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`
    }

</script>

<template>
    <div class="dep-thumbnail-card--header">
        <DepsPanel :depList="depList" :showScreenCaptureBtn="false" :isThumbnailPreview="true" />
    </div>
        <div class="dep-thumbnail-card--body">
            <div class="dep-thumbnail-card--body-content">
                <h2>{{ name }}</h2>
                <p><span>Created At:</span> <span>{{ getDate() }}</span></p>
            </div>
        <div class="dep-thumbnail-card--body-actions">
            <router-link :to="`/design/${id}/view`" class="dep-thumbnail-card--body-action"><font-awesome-icon icon="fa-solid fa-diagram-next" /> View</router-link>
            <router-link :to="`/design/${id}/edit`" class="dep-thumbnail-card--body-action"><font-awesome-icon icon="fa-regular fa-pen-to-square" /> Edit</router-link>
            <a href="javascript:void(0)" class="dep-thumbnail-card--body-action" @click="removeSavedDep(userId, role, teamId, id)"><font-awesome-icon icon="fa-regular fa-trash-can" /> Delete</a>
        </div>
    </div>
</template>

<style scoped>

    .dep-thumbnail-card--header {
        height: 200px;
        overflow-y: hidden;
        border-radius: 15px 15px 0 0;
    }
    .dep-thumbnail-card--body {
        padding: 20px;
    }

    .dep-thumbnail-card--body-content {
        padding-bottom: 10px;
    }

    .dep-thumbnail-card--body-content h2 {
        color: #4c4d55;
        font-family: "Poppins";
        font-weight: 800;
        font-size: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .dep-thumbnail-card--body-content p {
        font-family: 'Karla', sans-serif;
        color: #4c4d55;
    }

    .dep-thumbnail-card--body-actions {
        display: flex;
        justify-content: space-between;
        border-top: 3px solid #6d55f7;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        font-size: 14px;
        text-transform: uppercase;
        padding-top: 10px;
        color: #4c4d55;
    }

    .dep-thumbnail-card--body-actions a {
        color: #4c4d55;
        transition-timing-function: ease-in;
        transition: 0.5s;
        text-decoration: none;
    }

    .dep-thumbnail-card--body-actions a:hover {
        color: #0d6af6;
    }
</style>