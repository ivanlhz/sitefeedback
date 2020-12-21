import firebase from 'firebase/app'
import 'firebase/auth'

if (!firebase.apps.length) {
  console.info(process.en.NEXT_PUBLIC_FIREBASE_API_KEY)
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  })
} else {
  firebase.app() // if already initialized, use that one
}
const GithubAuthProvider = new firebase.auth.GithubAuthProvider()
export {firebase, GithubAuthProvider}
