// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Firebase Firestore
import { getAnalytics } from "firebase/analytics";

// Firebase configuration for your app
const firebaseConfig = {
  apiKey: "AIzaSyDo7FPQyEbkjXiMQE974RHtjL-AGVD2qXQ",
  authDomain: "venture-6edf4.firebaseapp.com",
  projectId: "venture-6edf4",
  storageBucket: "venture-6edf4.appspot.com",
  messagingSenderId: "607834066233",
  appId: "1:607834066233:web:65fb38bc985794aa4e2ce8",
  measurementId: "G-0R38SMJTK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app); // Export Firebase Auth for use in other files
export const db = getFirestore(app); // Export Firestore for use in other files

const analytics = getAnalytics(app);

export default app;
