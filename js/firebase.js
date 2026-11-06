// js/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Konfigurasi Firebase milik lu (sesuai yang ada di Firebase Console)
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

// Export biar bisa dipakai di file JS lain (kayak produk.js, transaksi.js)
export { db };
