import "./firebase"
import firebase from "firebase/app"
import "firebase/auth"

const getRefreshIdToken = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      unsubscribe()
      console.log(user)
      if (user) {
        const refreshedToken = await user
          .getIdToken(true)
          .catch((err) => reject(err))
        resolve(refreshedToken)
      } else {
        reject(new Error("please sign in"))
      }
    })
  })
}

export default getRefreshIdToken
