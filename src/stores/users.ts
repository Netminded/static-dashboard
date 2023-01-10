import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { auth, provider, database } from "../firebase/firebaseConfig"
import { signInWithEmailAndPassword, sendPasswordResetEmail, verifyPasswordResetCode, confirmPasswordReset, signOut } from "@firebase/auth"
import { ref as fbRef, onValue} from "firebase/database";
import { validateEmail, getFirstName } from "@/utilities/utils"
import type { User } from "@firebase/auth"
import { useDepsStore } from '@/stores/deps'

export const useUsersStore = defineStore("users", () => {

  // Define a user type
  interface Team {
    team_id: string | null, team_name: string | null, role: number | null
  }

  interface FbUser {
    loggedIn: boolean,
    data: { firstName?: string | null, lastName?: string | null, uid?: string | null, team?: Team | null } | null,
  }

  const user = ref<FbUser>({
    loggedIn: false,
    data: null,
  })

  const depsStore = useDepsStore()

  //Compute a users full name from their first and last names
  const fullName = computed(() => user.value.data?.firstName && user.value.data?.lastName ? `${user.value.data?.firstName} ${user.value.data?.lastName}` : '')

  // Get a users unique id
  const userId = computed(() => user.value.data?.uid)

  // Get a users team id
  const teamId = computed(() => user.value.data?.team?.team_id)

  // Get a users team name
  const teamName = computed(() => user.value.data?.team?.team_name)

  // Get a users role
  const role = computed(() => user.value.data?.team?.role)

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

  // Set the user id, user name, team id, team name and team role then fetch deps available to the user
  const setUser = async (authUser: { uid: string | null } | null) => {
    user.value.data = authUser
    if (authUser?.uid) {
      try {
        const data = await updateUserFromDb(authUser.uid)
        if(data) {
          let userData: any = data
          user.value.data = {uid: authUser.uid, firstName: userData.first_name, lastName: userData.last_name, team: userData.team}
          if(teamId.value) depsStore.getAllSavedDeps(authUser.uid, teamId.value)
        }
      } catch(err) {
        console.log(err)
      }
    }
  }

  // Return a Promise with the user database snapshot
  const updateUserFromDb = (userId: string) => {
    return new Promise((resolve, reject) => {
      const usersRef = fbRef(database, `users/${userId}`)
      onValue(usersRef, (snapshot) => {
        resolve(snapshot.val())
      })
    })
  }

  // Authenticate a user with Google sign in popup, validate the user email and then update the user 
  const setSignIn = async (username: string, password: string) => {
    const response = await signInWithEmailAndPassword(auth, username, password)
      if(response) {
        const fbUser = response.user
        setUser({uid: fbUser.uid})
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
    fbUser ? setUser({uid: fbUser.uid}) : setUser(null)
  }

  return { user, fullName, userId, teamId, teamName, role, setUser, fetchUser, setSignIn, setResetPassword, fetchResetCode, setNewPassword, setLogOut }
})