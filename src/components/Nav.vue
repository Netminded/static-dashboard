<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useUsersStore } from '@/stores/users'
  import { useRouter } from "vue-router"

  const usersStore = useUsersStore()
  const { user, fullName } = storeToRefs(usersStore)
  const router = useRouter()
  const { setLogOut } = usersStore

  // Sign a user out and re-direct to login
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
      <p v-if="fullName" class="user-name">{{fullName}}</p>
      <span class="ver-divider"></span>
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
    z-index: 1;
}

@media screen and (max-width: 310px) {
  nav .logo {
    width: 130px;
  }
}

.user-name {
  color: #FFFFFF;
  font-family: "Poppins", sans-serif;
  display: inline-block;
  font-weight: 600;
  padding-right: 15px;
  position: relative;
  top: 1px;
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

.ver-divider {
  width: 3px;
  height: 20px;
  display: inline-block;
  background: #6d55f7;
  position: relative;
  top: 6px;
}

nav a {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  text-decoration: none;
  text-transform: uppercase;
  padding: 5px;
  margin-left: 10px;
  position: relative;
  top: 1px;
}

nav .fa-arrow-right-from-bracket {
  margin-right: 5px;
}
</style>
