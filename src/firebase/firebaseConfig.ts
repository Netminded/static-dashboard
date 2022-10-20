import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  'hd': 'seethrunetworks.com'
})

const authedUser = () => {
  return new Promise((resolve, reject) => {
  const unsubscribe = auth.onAuthStateChanged((fbUser) => {
      unsubscribe()
      resolve(fbUser)
    }, reject)
  })
}

export { auth, provider, authedUser }