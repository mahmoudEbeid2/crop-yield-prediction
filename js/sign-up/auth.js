import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";
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
const app = initializeApp(firebaseConfig);
// Get Auth
const auth = getAuth(app);
// Get a Firestore instance
const db = getFirestore(app);

const storage = getStorage(app);
export const emailSignup = document.querySelector("#emailSignup");
export const passwordSingup = document.querySelector("#passwordSingup");
export const confirmpasswordSingup = document.querySelector(
  "#confirmpasswordSingup"
);
export const fullNameSingup = document.querySelector("#fullNameSingup");
export const imageUpload = document.querySelector("#ImageInput");

export const errorEmailMessage = document.querySelector("#erroremailmessage");
export const errorPasswordMessage = document.querySelector("#errorpassmessage");
export const errorFullNameMessage = document.querySelector(
  "#errorfullnamemessage"
);
export const errorConfirmPasswordMessage = document.querySelector(
  "#errorconfirmpassmessage"
);
const errorPolicyMessage = document.querySelector("#errorpolicy");
const policyCheckbox = document.querySelector("#pre-tem");

export const btnSignUp = document.querySelector("#signup");

const singinEmailPassword = async () => {
  const email = emailSignup.value;
  const password = passwordSingup.value;
  const confirmPassword = confirmpasswordSingup.value;
  const fullName = fullNameSingup.value;
  const image = imageUpload.files[0];

  let vaild = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/;

  if (!fullName.trim()) {
    errorFullNameMessage.textContent = "Please enter your full name.";
    vaild = false;
  } else if (/\d/.test(fullName)) {
    errorFullNameMessage.textContent = "Full name cannot contain numbers.";
    vaild = false;
  } else {
    errorFullNameMessage.textContent = "";
  }
  if (!emailRegex.test(email)) {
    errorEmailMessage.textContent =
      "Please enter a valid email address (example: user@example.com)";
    vaild = false;
  } else {
    errorEmailMessage.textContent = "";
  }
  if (!passwordPattern.test(password)) {
    errorPasswordMessage.innerHTML = `
      <div style="font-size: 1rem; line-height: 1.5;">
        <strong>Password must contain:</strong><br>
        • At least one lowercase letter (a-z)<br>
        • At least one uppercase letter (A-Z)<br>
        • At least one digit (0-9)<br>
        • At least one special character (!@#$%^&*)<br>
        • Minimum 7 characters
      </div>
    `;
    vaild = false;
  } else {
    errorPasswordMessage.textContent = "";
  }
  // Disallow using the email (or its local-part) as the password
  const emailLocalPart = typeof email === "string" ? email.split("@")[0] : "";
  if (
    password && email && (
      password === email ||
      (emailLocalPart && emailLocalPart.length >= 3 && password.includes(emailLocalPart))
    )
  ) {
    errorPasswordMessage.textContent = "Password cannot be the same as your email or contain your email name.";
    vaild = false;
  }
  if (confirmPassword != password) {
    errorConfirmPasswordMessage.textContent = "Passwords do not match";
    vaild = false;
  } else {
    errorConfirmPasswordMessage.textContent = "";
  }

  // Require policy/terms agreement
  if (!policyCheckbox || !policyCheckbox.checked) {
    if (errorPolicyMessage) errorPolicyMessage.textContent = "You must agree to the Privacy Policy and Terms to continue.";
    vaild = false;
  } else {
    if (errorPolicyMessage) errorPolicyMessage.textContent = "";
  }

  if (vaild == true) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential.user);
    const uid = userCredential.user.uid;
    if (userCredential.user) {
      const storageRef = ref(storage, uid + "images/");
      const uploadTask = uploadBytesResumable(storageRef, image);

      // ***********************************************************************//

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        async () => {
          // Handle successful uploads on complete
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);
            // urlImagesw = downloadURL;

            const docRef = await setDoc(doc(db, "users", uid), {
              id: uid,
              fullname: fullName,
              email: email,
              password: password,
              image: downloadURL,
            });
            console.log(docRef);
            // console.log("Document written with ID: ", docRef.id);
            window.location.href = "../../pages/dashbourd.html";
          } catch (error) {
            console.error("Error getting download URL:", error);
            // Handle error
          }
        }
      );

      // Clear input values
      emailSignup.value = "";
      passwordSingup.value = "";
      confirmpasswordSingup.value = "";
      fullNameSingup.value = "";
    }
  }
};

btnSignUp.addEventListener("click", singinEmailPassword);
