const labels = document.querySelectorAll('.form-control label')

labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, index) => `<span style="transition-delay:${index * 40}ms">${letter}</span>`)
        .join('')
})


document
  .getElementById("register")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
   
    const email = document.getElementById("registeremail").value;
     const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
  

    // Validation checks
    if ( !email || !name || !password ) {
      showErrorMessage("All fields are required.");
      return;
    }




    //  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    //   showErrorMessage("Please enter a valid email address.");
    //   return;
    // }
  //   if (!/^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
  //     showErrorMessage("Please enter a valid email address.");
  //     return;
  // }
  const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@(gmail\.com|yahoo\.com|rediff\.com|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;


if (!emailRegex.test(email)) {
    showErrorMessage("Please enter a valid email address");
    return;
}


if (!/^[a-zA-Z]+$/.test(name.trim())) {
  showErrorMessage("Name should only contain alphabets");
  return;
}

// Additional validation for password and other requirements if needed
// ...

// Additional validation for other fields if needed
// ...

  


    if (password.length < 8) {
      showErrorMessage("Password should be at least 8 characters long and contain at least one special character.");

      return;
    }

    const specialCharacterRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?!.*\s).{8,}$/;

    if (!specialCharacterRegex.test(password)) {
      showErrorMessage("Password should be at least 8 characters long, contain at least one special character, and should not contain spaces.");
      return;
    }
    




  


    try {
      const duplicateCheckResponse = await axios.get(
        `http://localhost:3000/user/checkEmail/${email}`
      );

      // Check if duplicateCheckResponse.data exists
      if (duplicateCheckResponse && duplicateCheckResponse.data) {
        const { exists, user } = duplicateCheckResponse.data;

        if (exists) {
          showErrorMessage(
            "Email already exists. Please choose another email."
          );
          return;
        }
      }



      // Continue with registration if email is not duplicate
      const userinfo = {
      
        email,
        name,
        password,
    
      };

      axios
        .post("http://localhost:3000/user/registeruser", userinfo)
        .then((response) => {
          console.log("User registered Successfully ", response.data);
          showSuccessMessage("Registered Successfully");
      
        
          document.getElementById("registeremail").value = "";
          document.getElementById("name").value= "";
        
          document.getElementById("password").value = "";


     
        })
        .catch((error) => {
          console.log("Error in registering user", error.response.data);
        });
    } catch (error) {
      console.error("Error checking duplicate email:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  });



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
