// document.addEventListener("DOMContentLoaded", () => {
//     const checkInternetConnection = () => {
//         fetch('https://www.google.com/', { mode: 'no-cors' })
//             .then(() => {
//                 // Internet connection is available
//                 console.log('Internet is connected');
//                 // const errorMessage = document.getElementById("error-message");
//                 const errorDiv = document.getElementById("error");
//                 // errorMessage.style.display = "none"; // Display the error message
//                 errorDiv.style.display = "block";
//                 const h2Element = document.querySelector('h2');
//                 h2Element.style.display="none"
  
//             })
//             .catch(() => {
//                 // Internet connection is not available
//                 // const errorMessage = document.getElementById("error-messag");
//                 const errorDiv = document.getElementById("error");
//                 // errorMessage.style.display = "block"; // Display the error message
//                 errorDiv.style.display = "none";
//                 console.log('Internet is disconnected');
//                 const h2Element = document.querySelector('h2');
//                 h2Element.style.display="block";
                
//             });
//     };
    
//     // Call the function to check the internet connection status
//     setInterval(checkInternetConnection, 1000);
//         console.log("DOMContentLoaded event fired");
     
//   });