// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD81YlaJKctBvxnjVgnG1xdp-bdcPOfos",
  authDomain: "eigercustomer.firebaseapp.com",
  projectId: "eigercustomer",
  storageBucket: "eigercustomer.firebasestorage.app",
  messagingSenderId: "364702401542",
  appId: "1:364702401542:web:ddbc08f03a4150dec2af87",
  measurementId: "G-2XB53Q08ZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
