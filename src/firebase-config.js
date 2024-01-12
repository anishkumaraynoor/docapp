






import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDuAG7kGPNLO42ljmFSEKSFRUc1xC--O28",
  authDomain: "docappdocapp.firebaseapp.com",
  projectId: "docappdocapp",
  storageBucket: "docappdocapp.appspot.com",
  messagingSenderId: "834925638289",
  appId: "1:834925638289:web:b4752728f5128bb6c74530",
  measurementId: "G-7JQ4F46DH4"
};

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app)