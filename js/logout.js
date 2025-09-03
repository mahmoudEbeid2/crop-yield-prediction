import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV6pScpMLcu69Jo4eMqSAgh_pY8b1Ql2w",
  authDomain: "graduation-project-560f4.firebaseapp.com",
  projectId: "graduation-project-560f4",
  storageBucket: "graduation-project-560f4.appspot.com",
  messagingSenderId: "533080583769",
  appId: "1:533080583769:web:167f1275665cba29fc4b48",
  measurementId: "G-ZWFEHLBKMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Select the logout button
const btnLogout = document.querySelector("#logout");

// Define the logout function
const logout = async () => {
  try {
    await signOut(auth);
    window.location.href = "signin.html";
  } catch (error) {
    console.error('Error signing out:', error);
    alert('Error signing out: ' + error.message);
  }
};

// Add click event listener to the logout button
btnLogout.addEventListener("click", logout);
