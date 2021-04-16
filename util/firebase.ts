import firebase from "firebase/app"
import "firebase/auth"

const initFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAxiEDjs74HK4zqV6hWO_Zdz95J8DLHboI",
    authDomain: "go-go-gui.firebaseapp.com",
    projectId: "go-go-gui",
    storageBucket: "go-go-gui.appspot.com",
    messagingSenderId: "474218867220",
    appId: "1:474218867220:web:14139bf3599c640dbf5501",
    measurementId: "G-NFBWXVTVB7"
  }

  // init firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  } else {
    firebase.app() // if already initialized, use that one
  }
}
// Initialize Firebase with project config at the beginning
initFirebase()
