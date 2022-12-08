<script setup lang="ts">
    import { onMounted, computed } from 'vue'
    import { useRouter, RouterLink } from 'vue-router'
    import { storeToRefs } from 'pinia'
    import { useDepsStore } from '@/stores/deps'
    import { useUsersStore } from '@/stores/users'

    const usersStore = useUsersStore()
    // const { userId, teamId } = storeToRefs(usersStore)
    let userId = computed(() => usersStore.userId)
    let teamId = computed(() => usersStore.teamId)

    const depsStore = useDepsStore()
    const { depsList, allDepsList } = storeToRefs(depsStore)
    const { getAllSavedDeps } = depsStore

    // window.addEventListener('team-id-update', e => {
    //     console.log('Fired', teamId.value)
    //     if(userId.value && teamId.value) getAllSavedDeps(userId.value, teamId.value)
    // })

    // if(userId.value && teamId.value) getAllSavedDeps(userId.value, teamId.value)
    // onMounted(() => {
    //     setTimeout(() => {
    //         console.log('Dependency List Mounted', {
    //             userId: userId.value,
    //             teamId: teamId.value
    //         })
    //         if(userId.value && teamId.value) getAllSavedDeps(userId.value, teamId.value)
    //     }, 1000)
        
    // })
</script>

<template>
    <main>
        <div>
            <router-link class="btn" to="/design">Design Chain</router-link>
            {{ allDepsList }}
        </div>
    </main>
</template>

<style>

main {
    height: calc(100vh - 135px);
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