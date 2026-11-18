// js/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"; // <-- TAMBAHAN BARU

const firebaseConfig = {
  apiKey: "AIzaSyCD81YlaJKctBvxnjVgnG1xdp-bdcPOfos",
  authDomain: "eigercustomer.firebaseapp.com",
  projectId: "eigercustomer",
  storageBucket: "eigercustomer.firebasestorage.app",
  messagingSenderId: "364702401542",
  appId: "1:364702401542:web:ddbc08f03a4150dec2af87",
  measurementId: "G-2XB53Q08ZL"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Database Firestore
const db = getFirestore(app);

// Inisialisasi Authentication <-- TAMBAHAN BARU
const auth = getAuth(app);

// Export db dan auth agar bisa dipakai di index.html
export { db, auth }; // <-- UBAH BAGIAN INI
