import { firebaseConfig } from "./config.js";
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const signoutBtn = document.querySelector('#signoutbtn');
signoutBtn.addEventListener('click', () => {
  auth.signOut()
    .then(() => {
      console.log('User signed out successfully');
      location.href = "login.html";
    })
    .catch((error) => {
      alert('Error signing out: ', error);
    });
});
function signOut() {
  auth.signOut()
  .then(() => {
    console.log("User signed out successfully");
    location.href = "login.html";
    
  })
  .catch((error) => {
    alert("Error signing out. Please contact the support. Copy and Paste this to help us to fix the problem:  ", error)
  })
}