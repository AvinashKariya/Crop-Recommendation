import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDlfJUkRgoMzevsCnhybHJTVZcMkCGj6A4",
  authDomain: "crop-prediction-52f6c.firebaseapp.com",
  projectId: "crop-prediction-52f6c",
  storageBucket: "crop-prediction-52f6c.appspot.com",
  messagingSenderId: "680279219599",
  appId: "1:680279219599:web:411b7560e566b30771bffa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
