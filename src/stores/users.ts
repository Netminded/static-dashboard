import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { auth, provider } from "../firebase/firebaseConfig"
import { signInWithEmailAndPassword, sendPasswordResetEmail, verifyPasswordResetCode, confirmPasswordReset, signOut } from "@firebase/auth"
import { validateEmail, getFirstName } from "@/utilities/utils"
import type { User } from "@firebase/auth"

export const useUsersStore = defineStore("users", () => {

  // Define a user type
  interface FbUser {
    loggedIn: boolean,
    data: { displayName: string | null, photoURL: string | null, uid: string | null } | null,
  }

  const user = ref<FbUser>({
    loggedIn: false,
    data: null,
  })

  // Compute a users first name from their display name
  const firstName = computed(() => user.value.data?.displayName ? getFirstName(user.value.data?.displayName) : '')

  // Update whether the user is logged in or not
  const setLoggedIn = (isLoggedIn: boolean) => {
    user.value.loggedIn = isLoggedIn
  }

  // Sign a user out and reset loggedIn and user values
  const setLogOut = async () => {
    await signOut(auth)
    setLoggedIn(false)
    setUser(null)
  }

  // Set the user display name, profile pic and user id
  const setUser = (data: { displayName: string | null, photoURL: string | null, uid: string | null } | null) => {
    user.value.data = data
  }

  // Authenticate a user with Google sign in popup, validate the user email and then update the user 
  const setSignIn = async (username: string, password: string) => {
    const response = await signInWithEmailAndPassword(auth, username, password)
      if(response) {
        const fbUser = response.user
        setUser({displayName: fbUser.displayName, photoURL: fbUser.photoURL, uid: fbUser.uid})
        setLoggedIn(true)
        // validateEmail(response.user.email) ? (setLoggedIn(true), setUser({displayName: fbUser.displayName, photoURL: fbUser.photoURL, uid: fbUser.uid})) : await setLogOut()
      } else {
        console.log('Error signing in!')
      }
  }

  const setResetPassword = async (username: string) => {
    let fbError
    let isError = false
    await sendPasswordResetEmail(auth, username).catch((err) => { 
      isError = true
      fbError = err.message
    })
    if (isError) {
      console.log('Error resetting password')
      return { validReset: false, codeError: fbError }
    } else {
      return { validReset: true }
    } 
  }

  const fetchResetCode = async (code: string) => {
    let fbError
    let isError = false
    await verifyPasswordResetCode(auth, code).catch((err) => { 
      isError = true
      fbError = err.message
    })
    if (isError) {
      console.log('Error validating reset code')
      return { validCode: false, codeError: fbError }
    } else {
      return { validCode: true }
    } 
  }

  const setNewPassword = async (code: string, newPassword: string) => {
    let fbError
    let isError = false
    await confirmPasswordReset(auth, code, newPassword).catch((err) => { 
      isError = true
      fbError = err.message
    })
    if (isError) {
      console.log('Error resetting password')
      return { validReset: false, codeError: fbError }
    } else {
      return { validReset: true }
    } 
  }

  // Receive a Firebase user and update whether they are logged in, if they are then update the user  
  const fetchUser = (fbUser: User) => {
    setLoggedIn(fbUser !== null)
    fbUser ? setUser({displayName: fbUser.displayName, photoURL: fbUser.photoURL, uid: fbUser.uid}) : setUser(null)
  }

  return { user, firstName, setUser, fetchUser, setSignIn, setResetPassword, fetchResetCode, setNewPassword, setLogOut }
})