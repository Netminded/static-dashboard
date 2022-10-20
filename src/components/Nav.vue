<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useUsersStore } from '@/stores/users'
  import { useRouter } from "vue-router"

  const usersStore = useUsersStore()
  const { user } = storeToRefs(usersStore)
  const router = useRouter()
  const { setLogOut } = usersStore

  const signOut = async () => {
        await setLogOut()
        router.push('/login')
  }

</script>

<template>
  <nav>
    <img
      alt="NetMinded Logo"
      class="logo"
      src="@/assets/NetMinded_Logo.svg"
      width="160"
      height="28"
    />
    <div>
      <span class="user-img" v-if="user.data?.photoURL"><img :src="user.data?.photoURL"/></span>
      <a href="#" v-if="user.loggedIn" @click.prevent="signOut"><font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />Logout</a>
    </div>
  </nav>
</template>

<style>
nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: linear-gradient(108.69deg, #092842 13.22%, #0c0527 86.57%)
    no-repeat;
}

@media screen and (max-width: 310px) {
  nav .logo {
    width: 130px;
  }
}

.user-img {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 8px;
}

@media screen and (max-width: 360px) {
  .user-img {
    display: none;
  }
}

.user-img img {
  width: 100%;
  border-radius: 50%;
  margin-bottom: -15px;
}

nav a {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  text-decoration: none;
  text-transform: uppercase;
  padding: 5px;
  position: relative;
  top: 5px;
}

nav .fa-arrow-right-from-bracket {
  margin-right: 5px;
}
</style>
