// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database"; // ✅ THIS was missing

// ✅ Your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAdhnXd3QyUw9TnwEXYTsuchkcGhQmrJeg",
  authDomain: "ai-order-mgmt.firebaseapp.com",
  databaseURL: "https://ai-order-mgmt-default-rtdb.firebaseio.com",
  projectId: "ai-order-mgmt",
  storageBucket: "ai-order-mgmt.firebasestorage.app",
  messagingSenderId: "916852124495",
  appId: "1:916852124495:web:b45735708e81523933733a"
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Get Realtime Database instance
const database = getDatabase(app);

// ✅ Export everything needed in MenuPage.jsx
export { database, ref, onValue };
