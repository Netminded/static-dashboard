<script setup lang="ts">
import { RouterView } from "vue-router"
import Nav from "./components/Nav.vue"
import Footer from "./components/Footer.vue"
import { auth } from './firebase/firebaseConfig'
import { useUsersStore } from '@/stores/users'
import { useOptionsStore } from '@/stores/options'
import { useDepsStore } from '@/stores/deps'

const usersStore = useUsersStore()
const optionsStore = useOptionsStore()
const depsStore = useDepsStore()

// Update local stores from Session Storage
if(sessionStorage.getItem('options')) {
  optionsStore.$state = JSON.parse(sessionStorage.getItem('options')!)
}
if(sessionStorage.getItem('deps')) {
  depsStore.$state = JSON.parse(sessionStorage.getItem('deps')!)
}
// Subscribe to changes in the Options and Deps stores and update Session Storage 
optionsStore.$subscribe((mutations, state) => {
  sessionStorage.setItem('options', JSON.stringify(state))
})
depsStore.$subscribe((mutations, state) => {
  sessionStorage.setItem('deps', JSON.stringify(state))
})
// Listen for auth changes and update the Users store
auth.onAuthStateChanged((user) => {
  if(user) {
    usersStore.fetchUser(user)
  }
})
</script>

<template>
  <Nav />
  <RouterView />
  <Footer />
</template>
