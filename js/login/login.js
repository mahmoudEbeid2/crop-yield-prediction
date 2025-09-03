import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

export const emailLogin = document.querySelector("#emailLogin");
export const passwordLogin = document.querySelector("#passwordSingupLogin");
export const errorLogin = document.querySelector("#errorlogin");

export const btnLogin = document.querySelector("#login");

const firebaseConfig = {
  apiKey: "AIzaSyDV6pScpMLcu69Jo4eMqSAgh_pY8b1Ql2w",
  authDomain: "graduation-project-560f4.firebaseapp.com",
  projectId: "graduation-project-560f4",
  storageBucket: "graduation-project-560f4.appspot.com",
  messagingSenderId: "533080583769",
  appId: "1:533080583769:web:167f1275665cba29fc4b48",
  measurementId: "G-ZWFEHLBKMM",
};

// Initialize Firebase
const app = await initializeApp(firebaseConfig);
const auth = getAuth(app);

const login = async () => {
  const email = emailLogin.value;
  const password = passwordLogin.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      errorLogin.textContent = "";
      window.location.href = "../../pages/dashbourd.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      errorLogin.textContent = "Email or Password incorrect";
    });
};

btnLogin.addEventListener("click", login);
