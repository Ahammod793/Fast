// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app"; 
const firebaseConfig = {
  apiKey: "AIzaSyBeoz4fqgD_NA8zEDlzX6qJzfwyg5hmkbM",
  authDomain: "fast-5d49b.firebaseapp.com",
  projectId: "fast-5d49b",
  storageBucket: "fast-5d49b.firebasestorage.app",
  messagingSenderId: "6451547269",
  appId: "1:6451547269:web:824b6ee6e21b366cfdadec",
  measurementId: "G-ER6W4B70G5"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig); 
export  const auth = getAuth(app)