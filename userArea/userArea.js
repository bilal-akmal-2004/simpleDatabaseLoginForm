// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfgK34boUe0T77KFpteYvMRCYJ-aXOjqc",
  authDomain: "verysimpleuserform.firebaseapp.com",
  projectId: "verysimpleuserform",
  storageBucket: "verysimpleuserform.firebasestorage.app",
  messagingSenderId: "712556880799",
  appId: "1:712556880799:web:c9ae8ce0632ae17b68d3aa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
  getDatabase,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
const db = getDatabase();

//Update funciton
let updateData = () => {
  update(ref(db, "TheStudents/"), {
    login: false,
  })
    .then(() => {
      alert("Data Updated success!");
    })
    .catch((error) => {
      alert("No succes updating data! " + error);
      return;
    });
  console.log("mew");
};
// let inUpButton = document.querySelector("#inUpButton");
// inUpButton.addEventListener("click", () => {
//   window.location.href = "/signUp/signUp.html";
// });
