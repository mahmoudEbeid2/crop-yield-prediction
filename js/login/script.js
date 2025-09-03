document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("passwordSingupLogin");
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
