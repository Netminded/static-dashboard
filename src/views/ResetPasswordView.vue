<script setup lang="ts">
    import { ref } from 'vue'
    import { useUsersStore } from '@/stores/users'
    import { useRouter, RouterLink } from 'vue-router'

    const usersStore = useUsersStore()
    const { setResetPassword } = usersStore
    const router = useRouter()
    const username = ref('')
    const resetError = ref('')

    const validateField = (field: string) => {
      return field.trim().length > 0 ? true : false
    }

    const resetErrorMsg = () => {
      setTimeout(() => {
        resetError.value = ''
      }, 5000) 
    }

    const resetPassword = async () => {
      if(validateField(username.value)) {
          try {
          const isEmailSent = await setResetPassword(username.value)
          if (isEmailSent?.validReset) { 
              resetError.value = 'Password reset request sent! Please check your email inbox.'
              resetErrorMsg()
            } else if (isEmailSent?.codeError) {
              resetError.value = isEmailSent['codeError']
              resetErrorMsg() 
            }
          }
          catch (err) {
            console.log(err)
          }
      } else {
        resetError.value = 'Please enter a valid email address.'
        resetErrorMsg()
      }
    }
</script>

<template>
  <main>
    <div class="login-container">
      <div class="login-icon">
        <font-awesome-icon icon="fa-regular fa-thumbs-up" size="3x" />
      </div>
      <h1>Request Password Reset</h1>
      <div>
        <input class="login-field" type="text" placeholder="Email Address" v-model="username" />
      </div>
      <div v-if="resetError.length > 0">
        <p class="reset-error">{{ resetError }}</p>
      </div>
      <button class="btn" @click="resetPassword">Reset Password</button>
      <!-- <a class="login-link" href="#" @click="router.push('/')">Back to Login</a> -->
      <router-link to="/" class="login-link">Back to Login</router-link>

    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 115px);
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
  max-width: 400px;
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

.login-container .fa-thumbs-up {
  color: #ffffff;
  position: relative;
  top: 8px;
  left: 3px;
}

.login-container h1 {
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #4c4d55;
  padding: 20px;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.login-field {
  background: transparent;
  border: transparent;
  border-bottom: 3px solid #1b1a4b;
  border-radius: 0;
  color: #4c4d55;
  font-family: "Karla", sans-serif;
  font-size: 16px;
  padding: 10px 20px 10px 0;
  width: 100%;
}

.login-field:focus {
  box-shadow: none;
  outline: 0;
}

.login-field::placeholder {
  color: #0c0c0c;
}

.reset-error {
  background: #4c4d55;
  border-radius: 15px;
  color: #FFFFFF;
  font-family: "Karla", sans-serif;
  font-size: 16px;
  padding: 15px;
  margin: 15px 0 0 0;
}

.btn {
  background: #0d6af6;
  border: 0 solid transparent;
  border-radius: 50px;
  box-shadow: 0 4px 16px rgb(32 19 104 / 25%);
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  text-transform: uppercase;
  transition-timing-function: ease-in;
  transition: 0.5s;
  margin-top: 20px;
  cursor: pointer;
}

.btn:hover {
  background: #0c54c0;
}

.login-link {
  color: #0d6af6;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  text-decoration: none;
  margin-top: 25px;
  display: block;
}

.login-link:hover {
  color: #0c54c0;
}
</style>
