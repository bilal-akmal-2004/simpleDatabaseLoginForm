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
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
const db = getDatabase();

//  reference form the html
//   inputs
let nameBox = document.querySelector("#nameBox");
let fatherNameBox = document.querySelector("#fatherNameBox");
let secBox = document.querySelector("#secBox");
let rollBox = document.querySelector("#rollBox");
let genBox = document.querySelector("#genBox");
//   button
let insBtn = document.querySelector("#insBtn");
let delBtn = document.querySelector("#delBtn");
let updBtn = document.querySelector("#updBtn");
let selBtn = document.querySelector("#selBtn");
//   function for the buttons here
//   insert function
let insertData = async () => {
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
  } catch (error) {
    console.log(error);
  }
};
//select function
let selectData = () => {
  const dbref = ref(db);
  get(child(dbref, "TheStudents/" + rollBox.value))
    .then((snapshot) => {
      if (snapshot.exists()) {
        nameBox.value = snapshot.val().nameOfStd;
        fatherNameBox.value = snapshot.val().fatherName;
        secBox.value = snapshot.val().section;
        genBox.value = snapshot.val().gender;
      } else {
        alert("No data found!");
      }
    })
    .catch((error) => {
      alert("Unsuccessfull! " + error);
    });
};
//Update funciton
let updateData = () => {
  update(ref(db, "TheStudents/" + rollBox.value), {
    nameOfStd: nameBox.value,
    fatherName: fatherNameBox.value,
    section: secBox.value,
    gender: genBox.value,
  })
    .then(() => {
      alert("Data Updated success!");
    })
    .catch((error) => {
      alert("No succes updating data! " + error);
    });
};
//Delet funciton
let deleteData = () => {
  remove(ref(db, "TheStudents/" + rollBox.value))
    .then(() => {
      alert("Data Deletion success!");
    })
    .catch((error) => {
      alert("No succes deleting data! " + error);
    });
};
//   Here we are assgingin the button so hang on !
insBtn.addEventListener("click", insertData);
selBtn.addEventListener("click", selectData);
delBtn.addEventListener("click", deleteData);
updBtn.addEventListener("click", updateData);

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
};

// here we are assigning  all the input boxes with function of validation
nameBox.addEventListener("input", validation);
fatherNameBox.addEventListener("input", validation);
rollBox.addEventListener("input", validation);
