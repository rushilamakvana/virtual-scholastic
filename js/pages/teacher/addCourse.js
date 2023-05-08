import { Navbar } from "../../components/navbar.js";
import { TopNavbar } from "../../components/topNavbar.js";
import { noteContainer } from "../../components/noteContainer.js";

document.getElementById("preloader").style.display = "block";
window.onload = () => {
  document.getElementById("preloader").style.display = "none";

  //Getting name from Token
  let token = localStorage.getItem("token");
  const { name } = JSON.parse(
    Buffer.from(token?.split(".")[1], "base64")?.toString()
  );

  //Identifies Teacher or Student
  const identifier = localStorage.getItem("identifier");

  // Sidebar of that page
  if (identifier?.toLowerCase().charAt(0) === "t") {
    document.getElementsByClassName("sidebar")[0].innerHTML = Navbar({
      isTeacher: true,
      activeSection: "Create classroom",
    });
  }
  //Navbar
  document.getElementsByClassName("top-navbar")[0].innerHTML = TopNavbar({
    title: "Create classroom",
    name,
  });

  //Notes
  document.getElementById("note-taking").innerHTML = noteContainer();

  document
    .getElementById("teacher-add-course-btn")
    .addEventListener("click", function (e) {
      var subjectName = document.getElementById("course-name").value;
      var subjectCode = document.getElementById("course-id").value;
      // var name = document.getElementById("name").value;
      console.log(localStorage.getItem("token"));
      let status = [];
      console.log("called");
      // document.getElementById("login-button").value = "Loading...";
      // try {
      fetch("http://localhost:3000/teacher/createClassroom", {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        }),
        body: JSON.stringify({
          subjectName,
          subjectCode,
        }),
      })
        .then((res) => {
          // if (res.status === 400) {
          //   // console.log("satus", res.status==);
          // Swal.fire({
          //   icon: "success",
          //   title: "Yayy",
          //   text: "Student added successfully",
          // });
          // setTimeout(() => {
          //   window.location.href = "myCoursesPage.html";
          // }, 1000);
          // }
          // document.getElementById("login-button").value = "Login";
          return res.json();
        })
        .then((data) => {
          if (data) {
            console.log("data = ", data);
            Swal.fire({
              icon: "success",
              title: "Yayy",
              text: "Student added successfully",
            });
            setTimeout(() => {
              window.location.href = "/myCoursesPage.html";
            }, 1000);
            // if (data.message.includes("successfully")) {
            //   window.location.href = "adminPage.html";
            //   // console.log("data = ", data);
            // } else {
            // }
          }
          // console.log("response = ", data.message.includes("successfully"));
          document.getElementById("login-button").value = "Login";
        });
    });
};
