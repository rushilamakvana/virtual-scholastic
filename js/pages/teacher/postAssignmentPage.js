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
      activeSection: "Assignments",
    });
  }
  //Navbar
  document.getElementsByClassName("top-navbar")[0].innerHTML = TopNavbar({
    title: "Post Assignments",
    name,
  });

  //Notes
  document.getElementById("note-taking").innerHTML = noteContainer();

  document
    .getElementById("teacher-assign-post-btn")
    .addEventListener("click", function (e) {
      var file = document.getElementById("teacher-post-assign").files[0];
      var data = new FormData();
      data.append("assignment", file);
      console.log("post = ", file);
      fetch("http://localhost:3000/teacher/assignment/upload", {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.getItem("token"),
        }),
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("response = ", res);
          var url = res.short_path;
          var data = {
            classroomId: document.getElementById("assign-ques-class-id").value,
            name: document.getElementById("assign-ques-name").value,
            description: document.getElementById("assign-ques-desc").value,
            dueDate: document.getElementById("assignment-deadline").value,
            fileUrl: url,
            marks: document.getElementById("assign-ques-marks").value,
          };
          fetch("http://localhost:3000/teacher/createAssignment", {
            method: "POST",
            headers: new Headers({
              "content-type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            }),
            body: JSON.stringify({ ...data }),
          })
            .then((res) => res.json())
            .then((res) => {
              console.log("final = ", res);
              document.getElementById("assign-ques-class-id").value = "";
              document.getElementById("assign-ques-name").value = "";
              document.getElementById("assign-ques-desc").value = "";
              document.getElementById("assignment-deadline").value = "";
              document.getElementById("assign-ques-marks").value = "";
              Swal.fire({
                icon: "success",
                title: "Yayyy",
                text: "Student added to course successfully!",
              });
            });
        });
    });
};
