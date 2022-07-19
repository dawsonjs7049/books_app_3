import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDveAbkn--ir__h5mDdDIj9OWS2Akw04zk",
  authDomain: "books-app-449ec.firebaseapp.com",
  projectId: "books-app-449ec",
  storageBucket: "books-app-449ec.appspot.com",
  messagingSenderId: "448065705970",
  appId: "1:448065705970:web:9081cc7b16d54dc340bd6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);