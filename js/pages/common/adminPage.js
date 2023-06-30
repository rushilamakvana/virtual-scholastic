// import { AdminNavbar } from "../../components/navbar.js";
AdminNavbar;
import { AdminNavbar } from "../../components/adminNav.js";
import { noteContainer } from "../../components/noteContainer.js";

window.onload = () => {
  //   const identifier = localStorage.getItem("identifier");

  // Sidebar change as per teacher or student
  if (identifier?.toLowerCase().charAt(0) === "t") {
    document.getElementsByClassName("sidebar")[0].innerHTML = Navbar({
      isTeacher: true,
      activeSection: "MyCourse",
    });
  } else {
    document.getElementsByClassName("sidebar")[0].innerHTML = Navbar({
      activeSection: "MyCourse",
    });
  }
  document.getElementsByClassName("sidebar")[0].innerHTML = AdminNavbar({
    activeSection: "MyCourse",
  });
  //   }

  //Notes
  document.getElementById("note-taking").innerHTML = noteContainer();
};

window.onload = function () {
  document
    .getElementById("add-student-submit-btn")
    .addEventListener("click", function (e) {
      console.log("called");
      var id = document.getElementById("teacher-id").value;
      var name = document.getElementById("teacher-name").value;
      // var email = document.getElementById("admin-email").value;
      let status = [];

      // try {
      fetch("http://localhost:3000/admin/addTeacher", {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        }),
        body: JSON.stringify({
          email: id,
          name: name,
        }),
      })
        .then((res) => {
          if (res.status === 400) {
            // console.log("satus", res.status==);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Invalid email or password.",
            });
          }
          // document.getElementById("login-button").value = "Login";
          return res.json();
        })
        .then((data) => {
          if (data) {
            Swal.fire({
              icon: "success",
              title: "Yayy",
              text: "teacher added successfully",
            });
            setTimeout(() => {
              window.location.href = "https://localhost:5500";
            }, 1000);
            console.log("data teacher added = ", data);
          }

          document.getElementById("login-button").value = "Login";
        });
    });
};
