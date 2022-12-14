import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getDatabase, } from "firebase/database"
import { getAnalytics, logEvent, setUserProperties } from "firebase/analytics"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  databaseURL: import.meta.env.VITE_FB_DATABASE_URL,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
// Set the Provider to use a custom workspace domain when prompting for sign-in
provider.setCustomParameters({
  'hd': 'seethrunetworks.com'
})

// Return auth state in a Promise so that router has chance to recognise the auth state may have changed before routing  
const authedUser = () => {
  return new Promise((resolve, reject) => {
  const unsubscribe = auth.onAuthStateChanged((fbUser) => {
      unsubscribe()
      resolve(fbUser)
    }, reject)
  })
}

const database = getDatabase(app)
const analytics = getAnalytics(app)

const logAnalyticsEvent = (eventName: string, eventParams?: Object) => {
  eventParams ? logEvent(analytics, eventName, eventParams) : logEvent(analytics, eventName)
}

const setUserAnalyticsProperty = (userProperty: any) => {
  setUserProperties(analytics, userProperty)
}

export { auth, provider, database, authedUser, logAnalyticsEvent, setUserAnalyticsProperty }