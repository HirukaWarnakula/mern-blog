import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-5cecf.firebaseapp.com",
  projectId: "mern-blog-5cecf",
  storageBucket: "mern-blog-5cecf.appspot.com",
  messagingSenderId: "772766959566",
  appId: "1:772766959566:web:e617549f804b4e01c38d9f",
};

export const app = initializeApp(firebaseConfig);
