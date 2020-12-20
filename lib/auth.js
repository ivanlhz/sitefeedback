import {createContext, useContext, useState, useEffect} from 'react'
import {firebase, GithubAuthProvider} from './firebase'

export const AuthContext = createContext()

export function useAuthProvider() {
  const [user, setUser] = useState(false)

  const signIn = () =>
    firebase
      .auth()
      .signInWithPopup(GithubAuthProvider)
      .then((resp) => {
        setUser(resp.user)
        return resp.user
      })

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false)
      })
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(false)
      }
    })
    return () => unsubscribe
  }, [])

  return {user, signIn, signOut}
}
export const useAuth = () => useContext(AuthContext)
export function AuthProvider({children}) {
  const auth = useAuthProvider()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
