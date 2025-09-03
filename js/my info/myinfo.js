import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  updatePassword,
  deleteUser,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const emailSignup = document.querySelector("#emailSignup");
const fullNameSingup = document.querySelector("#fullNameSingup");
const imageUpload = document.querySelector("#ImageInput");
const avatarImg = document.querySelector("#avatar-img");
const passwordSignup = document.querySelector("#passwordSingup");
const editSaveButton = document.querySelector("#editSaveButton");
const deleteButton = document.querySelector(".delet-btn");

const errorPasswordMessage = document.querySelector("#errorpassmessage");
const errorFullNameMessage = document.querySelector("#errorfullnamemessage");

let isEditing = false;

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
        fullNameSingup.value = userData.fullname;
        emailSignup.value = userData.email;
        // Set avatar with fallback if image missing or fails
        const fallback = "../../img/sign-up/avatar.png";
        if (!userData.image || typeof userData.image !== "string" || userData.image.trim() === "") {
          avatarImg.src = fallback;
        } else {
          avatarImg.onerror = () => {
            avatarImg.onerror = null;
            avatarImg.src = fallback;
          };
          avatarImg.src = userData.image;
        }
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

const saveUserInfo = async () => {
  const password = passwordSignup.value;
  const fullName = fullNameSingup.value;
  const image = imageUpload.files[0];

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/;

  if (fullName.trim() && !/\d/.test(fullName)) {
    try {
      const user = auth.currentUser;
      await updateDoc(doc(db, "users", user.uid), {
        fullname: fullName,
      });
    } catch (error) {
      console.error("Error updating full name:", error);
      errorFullNameMessage.textContent = "Error updating full name.";
    }
  } else {
    if (!fullName.trim()) {
      errorFullNameMessage.textContent = "Please enter your full name.";
    } else if (/\d/.test(fullName)) {
      errorFullNameMessage.textContent = "Full name cannot contain numbers.";
    }
  }

  if (password !== "********") {
    if (passwordPattern.test(password)) {
      try {
        const user = auth.currentUser;
        await updatePassword(user, password);
        await updateDoc(doc(db, "users", user.uid), {
          password: password,
        });
      } catch (error) {
        console.error("Error updating password:", error);
        errorPasswordMessage.textContent = "Error updating password.";
      }
    } else {
      if (!passwordPattern.test(password)) {
        errorPasswordMessage.textContent =
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.";
      }
    }
  }

  if (image) {
    try {
      const user = auth.currentUser;
      const storageRef = ref(storage, `${user.uid}/images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error("Error uploading file:", error);
          errorImageMessage.textContent = "Error uploading file.";
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);
            await updateDoc(doc(db, "users", user.uid), {
              image: downloadURL,
            });
            errorImageMessage.textContent =
              "Profile image updated successfully.";
          } catch (error) {
            console.error("Error getting download URL:", error);
          }
        }
      );
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  }
};

const deleteUserAccount = async () => {
  try {
    const user = auth.currentUser;

    if (user) {
      await deleteDoc(doc(db, "users", user.uid));

      await deleteUser(user);

      console.log("User account deleted successfully.");
      alert("Your account has been deleted.");

      window.location.href = "../../pages/sign-up.html";
    }
  } catch (error) {
    console.error("Error deleting user account:", error);
    alert("An error occurred while deleting your account. Please try again.");
  }
};

const enableEditing = () => {
  editSaveButton.textContent = "Save";
  fullNameSingup.disabled = false;
  emailSignup.disabled = true;
  imageUpload.disabled = false;
  passwordSignup.disabled = false;
};

const disableEditing = () => {
  editSaveButton.textContent = "Edit";
  fullNameSingup.disabled = true;
  emailSignup.disabled = true;
  imageUpload.disabled = true;
  passwordSignup.disabled = true;
};

editSaveButton.addEventListener("click", () => {
  if (isEditing) {
    saveUserInfo();
    disableEditing();
  } else {
    enableEditing();
  }
  isEditing = !isEditing;
});

document
  .getElementById("deletebtn")
  .addEventListener("click", deleteUserAccount);

document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in:", user);
      getUserInfo();
      passwordSignup.value = "********";
    } else {
      console.log("No user signed in.");
    }
  });
});
