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
  set,
  get,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
const db = getDatabase();

//  reference form the html
//button which goes to sign in

let signIn = document.querySelector("#signIn");
signIn.addEventListener("click", () => {
  window.location.replace("/signIn/signIn.html");
});
//   inputs
let nameBox = document.querySelector("#nameBox");
let fatherNameBox = document.querySelector("#fatherNameBox");
let secBox = document.querySelector("#secBox");
let rollBox = document.querySelector("#rollBox");
let genBox = document.querySelector("#genBox");
let emailBox = document.querySelector("#emailBox");
//   button
let insBtn = document.querySelector("#insBtn");
//   function for the buttons here
//   insert function
let insertData = async () => {
  if (
    nameBox.value.length === 0 ||
    fatherNameBox.value.length === 0 ||
    rollBox.value.length === 0 ||
    emailBox.value.length === 0
  ) {
    alert("Must fill the fields first!");
    return;
  }
  try {
    const dbref = ref(db, "TheStudents");
    const databaseSnapshot = await get(dbref);
    if (databaseSnapshot.exists()) {
      const students = databaseSnapshot.val(); // All student data
      const rollNumbers = Object.values(students).map(
        (student) => student.rollNo
      );
      console.log(students);

      if (rollNumbers.includes(rollBox.value)) {
        alert("Roll number already exists!");
        return;
      }
    }
    //   if no duplicates
    set(ref(db, "TheStudents/" + rollBox.value), {
      nameOfStd: nameBox.value,
      fatherName: fatherNameBox.value,
      rollNo: rollBox.value,
      section: secBox.value,
      gender: genBox.value,
      email: emailBox.value,
      login: true,
    })
      .then(() => {
        alert("Data store success!");
      })
      .catch((error) => {
        alert("No succes storing data! " + error);
      });
    nameBox.value = "";
    fatherNameBox.value = "";
    rollBox.value = "";
    secBox.value = "";
    genBox.value = "";
    emailBox.value = "";
  } catch (error) {
    console.log(error);
  }
  window.location.replace("/userArea/userArea.html");
}; //   Here we are assgingin the button so hang on !
insBtn.addEventListener("click", insertData);

//this funciton is for the validation
let validation = (e) => {
  let target = e.target;
  let value = target.value;

  // Validation for name
  if (target.id === "nameBox" && value.length < 3) {
    target.nextElementSibling.nextElementSibling.innerHTML =
      "Name should be 3 letters long.";
  } else if (target.id === "nameBox") {
    target.nextElementSibling.nextElementSibling.innerHTML = "";
  }
  // Validation for fathername
  if (target.id === "fatherNameBox" && value.length < 3) {
    target.nextElementSibling.nextElementSibling.innerHTML =
      "Fathername shoudl be 3 letters long.";
  } else if (target.id === "fatherNameBox") {
    target.nextElementSibling.nextElementSibling.innerHTML = "";
  }
  // Validation for rollno.
  if (target.id === "rollBox") {
    if (!value.startsWith("123-")) {
      target.nextElementSibling.nextElementSibling.innerHTML =
        "ID must start with '123-' .";
      //   idCheckFlage = false;
    } else if (value.length < 7) {
      target.nextElementSibling.nextElementSibling.innerHTML =
        "Make sure to have 3 more characters after 123- .";
      //   idCheckFlage = false;
    } else {
      target.nextElementSibling.nextElementSibling.innerHTML = "";
      //   idCheckFlage = true;
    }
  }
  // validation for email
  if (target.id === "emailBox") {
    if (
      value.indexOf("@") === -1 ||
      value.indexOf(".") === -1 ||
      value.length <= value.indexOf(".") + 2
    ) {
      target.nextElementSibling.nextElementSibling.innerText =
        "Make sure to enter the correct email format !";
    } else {
      target.nextElementSibling.nextElementSibling.innerText = "";
    }
  }
};

// here we are assigning  all the input boxes with function of validation
nameBox.addEventListener("input", validation);
fatherNameBox.addEventListener("input", validation);
rollBox.addEventListener("input", validation);
emailBox.addEventListener("input", validation);
