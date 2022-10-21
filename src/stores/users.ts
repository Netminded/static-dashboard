import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { auth, provider } from "../firebase/firebaseConfig"
import { signInWithPopup, signOut } from "@firebase/auth"
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
  const setSignIn = async () => {
    const response = await signInWithPopup(auth, provider)
      if(response) {
        const fbUser = response.user
        validateEmail(response.user.email) ? (setLoggedIn(true), setUser({displayName: fbUser.displayName, photoURL: fbUser.photoURL, uid: fbUser.uid})) : await setLogOut()
      } else {
        console.log('Error signing in!')
      }
  }

  // Receive a Firebase user and update whether they are logged in, if they are then update the user  
  const fetchUser = (fbUser: User) => {
    setLoggedIn(fbUser !== null)
    fbUser ? setUser({displayName: fbUser.displayName, photoURL: fbUser.photoURL, uid: fbUser.uid}) : setUser(null)
  }

  return { user, firstName, setUser, fetchUser, setSignIn, setLogOut }
})