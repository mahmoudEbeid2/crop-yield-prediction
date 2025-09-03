import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, updatePassword, deleteUser } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

// Get Firebase configuration from the config manager
const firebaseConfigData = window.firebaseConfig ? window.firebaseConfig.getConfig() : {
  apiKey: "AIzaSyDV6pScpMLcu69Jo4eMqSAgh_pY8b1Ql2w",
  authDomain: "graduation-project-560f4.firebaseapp.com",
  projectId: "graduation-project-560f4",
  storageBucket: "graduation-project-560f4.appspot.com",
  messagingSenderId: "533080583769",
  appId: "1:533080583769:web:167f1275665cba29fc4b48",
  measurementId: "G-ZWFEHLBKMM"
};

const app = initializeApp(firebaseConfigData);
const auth = getAuth(app);
const db = getFirestore(app);

const username = document.querySelector("#uname");
const userimage = document.querySelector("#ulogo");

const setImageWithFallback = (imgElement, imageUrl, fallbackUrl) => {
  if (!imgElement) return;
  // If URL missing/empty, use fallback immediately
  if (!imageUrl || typeof imageUrl !== "string" || imageUrl.trim() === "") {
    imgElement.src = fallbackUrl;
    return;
  }
  // Attach one-time onerror to fallback
  imgElement.onerror = () => {
    imgElement.onerror = null;
    imgElement.src = fallbackUrl;
  };
  imgElement.src = imageUrl;
};

const getUserInfo = async () => {
    const user = auth.currentUser;
  
    if (user) {
      const userId = user.uid;
      const docRef = doc(db, "users", userId);
  
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log("User data fetched successfully:", userData);
          username.textContent  = userData.fullname; 
          setImageWithFallback(userimage, userData.image, "../img/sign-up/avatar.png");
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    } else {
      console.log("No user signed in.");
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user);
        getUserInfo();
      } else {
        console.log("No user signed in.");
      }
    });
  });