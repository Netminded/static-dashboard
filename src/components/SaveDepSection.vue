<script setup lang="ts">
    import { ref } from 'vue'
    import { storeToRefs } from 'pinia'
    import { useDepsStore } from '@/stores/deps'
    import { useUsersStore } from '@/stores/users'

    const usersStore = useUsersStore()
    const { userId, teamId, role } = storeToRefs(usersStore)

    const depsStore = useDepsStore()
    const { depsList, addedDepsList, depsName } = storeToRefs(depsStore)
    const { saveDepToDb, updateDepInDb } = depsStore

    const props = defineProps<{
        chainId: string | string[]
    }>()

    const depName = ref(depsName.value)

    const saveDep = () => {
        if(userId.value && role.value && teamId.value && depName.value.trim().length > 0) {
            saveDepToDb(userId.value, role.value, teamId.value, depName.value, JSON.stringify(depsList.value))
        }
    }

    const updateDep = () => {
        if(userId.value && role.value && teamId.value && props.chainId && depName.value.trim().length > 0) {
            updateDepInDb(userId.value, role.value, teamId.value, props.chainId as string, depName.value, JSON.stringify(depsList.value))
        }
    }

</script>

<template>
    <div v-if="addedDepsList.length >= 1" class="save-dep-container">
        <input type="text" placeholder="Chain Name" required v-model="depName" />
        <button v-if="chainId" :disabled="depName.trim().length <= 0" class="btn" :class="depsList.length === 0 && 'btn-below'" @click="updateDep">
            Update Chain
        </button>
        <button v-else :disabled="depName.trim().length <= 0" class="btn" :class="depsList.length === 0 && 'btn-below'" @click="saveDep">
            Save Chain
        </button>
    </div>
</template>

<style scoped>

    .save-dep-container {
        display: flex;
        justify-content: space-between;
    }

    .save-dep-container input {
        background: transparent;
        border: transparent;
        border-bottom: 3px solid #1b1a4b;
        border-radius: 0;
        color: #4c4d55;
        font-family: "Karla", sans-serif;
        font-size: 16px;
        padding: 10px 20px 10px 0;
        height: 40px;
        width: 100%;
        margin-right: 15px;
    }

    .save-dep-container input:focus {
        box-shadow: none;
        outline: 0;
    }

    .save-dep-container input::placeholder {
        color: #0c0c0c;
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
        width: 180px;
    }
</style>