<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useUsersStore } from '@/stores/users'
  import { useRouter, RouterLink } from "vue-router"

  const usersStore = useUsersStore()
  const { user, fullName, teamName } = storeToRefs(usersStore)
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
    <div>
      <img
      alt="NetMinded Logo"
      class="logo"
      src="@/assets/NetMinded_Logo.svg"
      width="160"
      height="28"
    />
    <router-link class="nav-link" v-if="user.loggedIn" to="/">Diagnostic Chains</router-link>
    </div>
    <div v-if="user.loggedIn">
      <div>
        <p v-if="fullName" class="user-name">{{ fullName }}</p>
        <p v-if="teamName" class="team-name"><font-awesome-icon icon="fa-regular fa-id-badge" /> {{ teamName }}</p>
      </div>
      <div>
        <span class="ver-divider"></span>
        <a href="#" @click.prevent="signOut"><font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />Logout</a>
      </div>
    </div>
  </nav>
</template>

<style>
nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background: linear-gradient(108.69deg, #092842 13.22%, #0c0527 86.57%)
    no-repeat;
    z-index: 1;
}

@media screen and (max-width: 310px) {
  nav .logo {
    width: 130px;
  }
}

.nav-link {
  position: relative;
  top: -6px;
  margin-left: 30px;
}

nav div:nth-child(2) {
  display: flex;
  justify-content: space-between;
}

.user-name {
  color: #FFFFFF;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 12px;
  padding-right: 15px;
}

.fa-id-badge {
  margin-right: 2px;
}

.team-name {
  color: #b2b2b2;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 10px;
  padding-right: 15px;
}

.ver-divider {
  width: 3px;
  height: 20px;
  display: inline-block;
  background: #6d55f7;
  position: relative;
  top: 8px;
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
  top: 3px;
}

nav .fa-arrow-right-from-bracket {
  margin-right: 5px;
}
</style>
