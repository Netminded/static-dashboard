<script setup lang="ts">
    import { useUsersStore } from '@/stores/users'
    import { useRouter } from 'vue-router'

    const usersStore = useUsersStore()
    const { setSignIn } = usersStore
    const router = useRouter()

    const loginUser = async () => {
      try {
        await setSignIn()
        router.push('/')
      }
      catch (err) {
        console.log(err)
      }
    }
</script>

<template>
  <main>
    <div class="login-container">
      <div class="login-icon">
        <font-awesome-icon icon="fa-solid fa-diagram-next" size="3x" />
      </div>
      <h1>Deps Dashboard</h1>
      <div class="google-btn" @click="loginUser">
        <div class="google-img">
          <img
            width="18"
            height="18"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google Logo"
          />
        </div>
        <div class="google-text">
          <p>Sign in with Google</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 135px);
  width: 100%;
  background: url('../assets/NetMinded_Hero_Bk.svg') 50% 40% no-repeat, linear-gradient(108.69deg, #092842 13.22%, #0C0527 86.57%);
  background-size: cover;
}

.login-container {
  text-align: center;
  background: rgba(233, 239, 244, 0.8);
  padding: 60px 40px;
  border-radius: 15px;
  margin-left: 5%;
  margin-right: 5%;
}

@media screen and (max-width: 380px) {
  .login-container {
    padding: 40px 20px;
  }
}

.login-icon {
  border-radius: 50px;
  padding: 20px;
  background: linear-gradient(98.67deg, #21304f 11.57%, #381f6d 87.97%);
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
}

.login-container .fa-diagram-next {
  color: #ffffff;
  position: relative;
  top: 8px;
}

.login-container h1 {
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #4c4d55;
  padding: 20px;
  text-transform: uppercase;
  margin-bottom: 50px;
}

.google-btn {
  display: flex;
  justify-content: space-between;
  width: 250px;
  border: 2px solid #4285f4;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}

@media screen and (max-width: 380px) {
  .google-btn {
    width: 180px;
  }
}

.google-img {
  background-color: #ffffff;
  width: 50px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
}

@media screen and (max-width: 380px) {
  .google-img {
    width: 35px;
  }
}

.google-text {
  background: #4285f4;
  color: #ffffff;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  padding: 10px;
  flex-grow: 1;
  text-align: center;
}

@media screen and (max-width: 380px) {
  .google-text {
    font-size: 14px;
  }
}
</style>
