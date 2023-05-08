document.getElementById("preloader").style.display = "block";

window.onload = function () {
  document.getElementById("preloader").style.display = "none";

  document
    .getElementById("login-button")
    .addEventListener("click", function (e) {
      console.log("called t login");

      var email = document.getElementById("email").value;
      var pass = document.getElementById("password").value;

      let status = [];
      fetch("http://localhost:3000/teacher/login", {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify({
          email,
          password: pass,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log("data = ", response);
          localStorage.clear();
          //   if (response.token) {
          localStorage.setItem("name", response.data.teacher.name);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("email", response.data.teacher.email);
          //   localStorage.setItem(
          //     "enrollment",
          //     response.data.student.enrollment_number
          //   );
          localStorage.setItem("identifier", "teacher");
          window.location.href = "teacherCourse.html";
          //     document.getElementById("login-button").value = "Login";
          //     window.location.href = "myCoursesPage.html";
          //   } else if (response.errorMessage === "Invalid password") {
          //     Swal.fire({
          //       icon: "error",
          //       title: "Oops...",
          //       text: "Invalid password.",
          //     });
          //     document.getElementById("login-button").value = "Login";
          //   } else {
          //     Swal.fire({
          //       icon: "error",
          //       title: "Oops...",
          //       text: "It's not you, it's us! Please try again after a while.",
          //     });
          //     document.getElementById("login-button").value = "Login";
          //   }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "It's not you, it's us! Please try again after a while.",
          });

          document.getElementById("login-button").value = "Login";
        });
      //   if (id.length <= 1) {
      //     document.getElementById("instid").value = "";
      //     document.getElementById("instid").placeholder = "Please enter valid ID";
      //     status.push("false");
      //   } else {
      //     status.push("true");
      //   }

      //   if (password.length <= 1) {
      //     document.getElementById("password").value = "";
      //     document.getElementById("password").placeholder =
      //       "Please enter valid Password";
      //     status.push("false");
      //   } else {
      //     status.push("true");
      //   }

      //   if (status.includes("false")) {
      //     return false;
      //   } else {
      //     document.getElementById("login-button").value = "Loading...";
      //     if (document.getElementById("student-radio").checked) {
      //       fetch("/student/login", {
      //         method: "POST",
      //         headers: new Headers({
      //           "content-type": "application/json",
      //         }),
      //         body: JSON.stringify({
      //           studentId: id,
      //           password: password,
      //         }),
      //       })
      //         .then((response) => {
      //           return response.json();
      //         })
      //         .then((response) => {
      //           if (response.token) {
      //             localStorage.setItem("name", response.name);
      //             localStorage.setItem("token", response.token);
      //             localStorage.setItem("identifier", id);
      //             document.getElementById("login-button").value = "Login";
      //             window.location.href = "myCoursesPage.html";
      //           } else if (response.errorMessage === "Invalid password") {
      //             Swal.fire({
      //               icon: "error",
      //               title: "Oops...",
      //               text: "Invalid password.",
      //             });
      //             document.getElementById("login-button").value = "Login";
      //           } else {
      //             Swal.fire({
      //               icon: "error",
      //               title: "Oops...",
      //               text: "It's not you, it's us! Please try again after a while.",
      //             });
      //             document.getElementById("login-button").value = "Login";
      //           }
      //         })
      //         .catch((err) => {
      //           Swal.fire({
      //             icon: "error",
      //             title: "Oops...",
      //             text: "It's not you, it's us! Please try again after a while.",
      //           });

      //           document.getElementById("login-button").value = "Login";
      //         });
      //     } else {
      //       console.log("called");
      //       fetch(
      //         "http://localhost:3000/teacher/login",
      //         {
      //           method: "POST",
      //           headers: new Headers({
      //             "content-type": "application/json",
      //           }),
      //           body: JSON.stringify({
      //             email: id,
      //             password: password,
      //           }),
      //         }
      //       )
      //         .then((response) => {
      //           return response.json();
      //         })
      //         .then((response) => {
      //           console.log("response - ", response);
      //           // if (response.token) {
      //           localStorage.setItem("name", response.data.teacher.name);
      //           localStorage.setItem("token", response.data.token);
      //           localStorage.setItem("email", response.data.teacher.email);
      //           //   localStorage.setItem("identifier", id);
      //           document.getElementById("login-button").value = "Login";

      //           if (response.message.includes("Invalid")) {
      //             Swal.fire({
      //               icon: "error",
      //               title: "Oops...",
      //               text: "Invalid password.",
      //             });
      //             document.getElementById("login-button").value = "Login";
      //           } else {
      //             window.location.href = "myCoursesPage.html";
      //           }
      //           // } else if (response.errorMessage === "Invalid password") {
      //           //   Swal.fire({
      //           //     icon: "error",
      //           //     title: "Oops...",
      //           //     text: "Invalid password.",
      //           //   });
      //           //   document.getElementById("login-button").value = "Login";
      //           // } else {
      //           //   Swal.fire({
      //           //     icon: "error",
      //           //     title: "Oops...",
      //           //     text: "It's not you, it's us! Please try again after a while.",
      //           //   });
      //           //   document.getElementById("login-button").value = "Login";
      //           // }
      //         })
      //         .catch((err) => {
      //           // console.log("err = ", err.status);
      //           Swal.fire({
      //             icon: "error",
      //             title: "Oops...",
      //             text: "Invalid email or password",
      //           });
      //           document.getElementById("login-button").value = "Login";
      //         });
      //     }
      //   }
    });
};
