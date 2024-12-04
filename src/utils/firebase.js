// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZAJEqWrLlKpOG6HmR8nccQW9QtgHie9M",
  authDomain: "mosterton-c6e07.firebaseapp.com",
  projectId: "mosterton-c6e07",
  storageBucket: "mosterton-c6e07.firebasestorage.app",
  messagingSenderId: "1090009055763",
  appId: "1:1090009055763:web:4241796a6bcd5e2156b5e6",
  measurementId: "G-9M5CY455BH",
  databaseURL: "https://mosterton-c6e07-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database }