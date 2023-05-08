import { Navbar } from "../../components/navbar.js";
import { TopNavbar } from "../../components/topNavbar.js";
import { noteContainer } from "../../components/noteContainer.js";

document.getElementById("preloader").style.display = "block";
window.onload = function () {
  document.getElementById("preloader").style.display = "none";
  //Token to get name
  let token = localStorage.getItem("token");
  const { name } = JSON.parse(
    Buffer.from(token?.split(".")[1], "base64")?.toString()
  );
  const identifier = localStorage.getItem("identifier");
  // Teacher View

  document.getElementsByClassName("sidebar")[0].innerHTML = Navbar({
    activeSection: "Join class",
  });
  document.getElementsByClassName("top-navbar")[0].innerHTML = TopNavbar({
    title: "Join class",
    name,
  });

  //Notes
  document.getElementById("note-taking").innerHTML = noteContainer();

  document
    .getElementById("login-button")
    .addEventListener("click", function (e) {
      console.log("called jijn");
      var id = document.getElementById("classId").value;

      console.log("id = ", id);
      fetch(`http://localhost:3000/student/joinClassroom/${id}`, {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("response = ", res);
          var id = document.getElementById("classId").value;
          setTimeout(() => {
            Swal.fire({
              icon: "success",
              title: "Yayyy",
              text: "you joined classroom successfully!",
            });
          }, 1000);
        });
    });
};
