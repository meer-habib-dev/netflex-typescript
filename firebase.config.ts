// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyCxwlibdMP1piqMaq2JML_aSzG4Lhbd2no',
  authDomain: 'netflix-clone-106ed.firebaseapp.com',
  projectId: 'netflix-clone-106ed',
  storageBucket: 'netflix-clone-106ed.appspot.com',
  messagingSenderId: '766974537870',
  appId: '1:766974537870:web:5ad78c2eb607191c7499df',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
