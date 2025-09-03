import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Get Firebase configuration from the config manager
const firebaseConfigData = window.firebaseConfig ? window.firebaseConfig.getConfig() : {
  apiKey: "AIzaSyDV6pScpMLcu69Jo4eMqSAgh_pY8b1Ql2w",
  authDomain: "graduation-project-560f4.firebaseapp.com",
  projectId: "graduation-project-560f4",
  storageBucket: "graduation-project-560f4.appspot.com",
  messagingSenderId: "533080583769",
  appId: "1:533080583769:web:167f1275665cba29fc4b48",
  measurementId: "G-ZWFEHLBKMM",
};

const app = initializeApp(firebaseConfigData);

// Get Auth
const auth = getAuth(app);
auth.onAuthStateChanged(function (user) {
  if (!user) {
    window.location.href = "../pages/signin.html";
  }
});
