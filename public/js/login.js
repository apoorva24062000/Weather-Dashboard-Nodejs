

const labels = document.querySelectorAll('.form-control label')

labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, index) => `<span style="transition-delay:${index * 40}ms">${letter}</span>`)
        .join('')
})


document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Validation checks
    if (!email || !password) {
      showErrorMessage("Email and password are required.");
      return;
    }

 
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@(gmail\.com|yahoo\.com|rediff\.com|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;


    if (!emailRegex.test(email)) {
        showErrorMessage("Please enter a valid email address");
        return;
    }

    const logininfo = {
      email,
      password,
    };

    axios
      .post("http://localhost:3000/user/loginuser", logininfo)
      .then((response) => {
        console.log("User Logged In Successfully ", response.data);

        window.sessionStorage.token = response.data.token;
        window.sessionStorage.userInfo = response.data.userInfo;
        window.sessionStorage.userName = response.data.userName
         window.location.href = "./dashboard";
        showSuccessMessage("Login Successful");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            showErrorMessage("Incorrect password. Please try again.");
          } else if (error.response.status === 404) {
            showErrorMessage("Email not registered. Please register first.");
          } else {
            console.log("Error in Logging a user", error.response.data);
          }
        } else {
          console.log("Error in Logging a user", error.message);
        }
      });
  });

// Function to show error message
// Replace the existing showErrorMessage function with Swal alerts
function showErrorMessage(message) {
  Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
  });
}

// Replace the existing showSuccessMessage function with Swal alerts
function showSuccessMessage(message) {
  Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
  });
}
