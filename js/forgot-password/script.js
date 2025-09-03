function resetPassword() {
  var email = document.getElementById("email").value;
  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email) {
    swal("Error", "Please enter your email address", "error");
  } else if (!emailPattern.test(email)) {
    swal("Error", "Please enter a valid email address", "error");
  } else {
    swal(
      "Email Sent",
      `Password reset instructions have been sent to ${email}`,
      "success"
    );
  }
}
