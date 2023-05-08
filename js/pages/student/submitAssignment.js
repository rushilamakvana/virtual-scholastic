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
  //   if (identifier?.toLowerCase().charAt(0) === "t") {
  document.getElementsByClassName("sidebar")[0].innerHTML = Navbar({
    isTeacher: false,
    activeSection: "submit assignments",
  });
  //   }
  //Navbar
  document.getElementsByClassName("top-navbar")[0].innerHTML = TopNavbar({
    title: "submit Assignments",
    name,
  });

  //Notes
  document.getElementById("note-taking").innerHTML = noteContainer();

  document
    .getElementById("student-assign-post-btn")
    .addEventListener("click", function (e) {
      console.log("called");
      var file = document.getElementById("student-post-assign").files[0];
      var data = new FormData();
      data.append("assignment", file);
      console.log("post = ", file);
      fetch("http://localhost:3000/student/assignment/upload", {
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
            assignment_id: document.getElementById("assign-ques-id").value,
            fileUrl: url,
          };
          fetch("http://localhost:3000/student/assignment/submit", {
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
              document.getElementById("assign-ques-id").value = "";

              Swal.fire({
                icon: "success",
                title: "Yayyy",
                text: "Student added to course successfully!",
              });
            });
        });
    });
};
