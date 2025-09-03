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
// edit or save
// document
//   .getElementById("editSaveButton")
//   .addEventListener("click", function () {
//     var button = this;
//     var inputs = document.querySelectorAll(".info input");

//     if (button.textContent === "edit") {
//       button.textContent = "save";
//       inputs.forEach(function (input) {
//         input.disabled = false;
//       });
//     } else {
//       button.textContent = "edit";
//       inputs.forEach(function (input) {
//         input.disabled = true;
//       });
//     }
//   });
