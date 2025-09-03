// change imge
document.getElementById("ImageInput").addEventListener("change", function () {
  const file = this.files[0];

  const imageURL = URL.createObjectURL(file);

  document.getElementById("avatar-img").src = imageURL;
});

// show or hiden password
document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("passwordSingup");
  const passToggle = document.getElementById("pass-toggle");
  const eyeOffIcon = document.querySelector(".eye-off");
  const eyeOnIcon = document.querySelector(".eye-on");

  passToggle.addEventListener("click", function (event) {
    event.preventDefault();
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeOffIcon.style.display = "none";
      eyeOnIcon.style.display = "block";
    } else {
      passwordInput.type = "password";
      eyeOnIcon.style.display = "none";
      eyeOffIcon.style.display = "block";
    }
  });
});

// show or hiden confirm password
const cpasswordInput = document.getElementById("confirmpasswordSingup");
const passToggleConfirm = document.getElementById("pass-toggle-confirm");
const eyeOffIconConfirm = document.querySelector(".ceye-off");
const eyeOnIconConfirm = document.querySelector(".ceye-on");

passToggleConfirm.addEventListener("click", function (event) {
  event.preventDefault();
  if (cpasswordInput.type === "password") {
    cpasswordInput.type = "text";
    eyeOffIconConfirm.style.display = "none";
    eyeOnIconConfirm.style.display = "block";
  } else {
    cpasswordInput.type = "password";
    eyeOnIconConfirm.style.display = "none";
    eyeOffIconConfirm.style.display = "block";
  }
});
