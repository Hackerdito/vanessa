import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3KsVquTWY6L9qo94ZJag9s9J-FUANy5w",
  authDomain: "vanesaa-d9aad.firebaseapp.com",
  projectId: "vanesaa-d9aad",
  storageBucket: "vanesaa-d9aad.firebasestorage.app",
  messagingSenderId: "598995284277",
  appId: "1:598995284277:web:c717e60294f373d51d9c7c",
  measurementId: "G-QERYG3B5G7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
