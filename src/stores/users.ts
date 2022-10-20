import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { auth, provider } from "../firebase/firebaseConfig"
import { signInWithPopup, signOut } from "@firebase/auth"
import { validateEmail, getFirstName } from "@/utilities/utils"
import type { User } from "@firebase/auth"

export const useUsersStore = defineStore("users", () => {
  interface FbUser {
    loggedIn: boolean,
    data: { displayName: string | null, photoURL: string | null, uid: string | null } | null,
  }

  const user = ref<FbUser>({
    loggedIn: false,
    data: null,
  })

  const firstName = computed(() => user.value.data?.displayName ? getFirstName(user.value.data?.displayName) : '')

  const setLoggedIn = (isLoggedIn: boolean) => {
    user.value.loggedIn = isLoggedIn
  }

  const setLogOut = async () => {
    await signOut(auth)
    setLoggedIn(false)
    setUser(null)
  }

  const setUser = (data: { displayName: string | null, photoURL: string | null, uid: string | null } | null) => {
    user.value.data = data
  }

  const setSignIn = async () => {
    const response = await signInWithPopup(auth, provider)
      if(response) {
        const fbUser = response.user
        validateEmail(response.user.email) ? (setLoggedIn(true), setUser({displayName: fbUser.displayName, photoURL: fbUser.photoURL, uid: fbUser.uid})) : await setLogOut()
        // setUser(response.user)
      } else {
        console.log('Error signing in!')
      }
  }

  const fetchUser = (fbUser: User) => {
    setLoggedIn(fbUser !== null)
    fbUser ? setUser({displayName: fbUser.displayName, photoURL: fbUser.photoURL, uid: fbUser.uid}) : setUser(null)
  }

  return { user, firstName, setUser, fetchUser, setSignIn, setLogOut }
})