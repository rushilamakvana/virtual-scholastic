import { Navbar } from "../../components/navbar.js";
import { TopNavbar } from "../../components/topNavbar.js";
import { noteContainer } from "../../components/noteContainer.js";

document.getElementById("preloader").style.display = "block";

window.onload = () => {
  document.getElementById("preloader").style.display = "none";
  let token = localStorage.getItem("token");
  const { name } = JSON.parse(
    Buffer.from(token?.split(".")[1], "base64")?.toString()
  );

  //Sidebar change as per teacher or student
  const identifier = localStorage.getItem("identifier");
  // if (identifier?.toLowerCase().charAt(0) === "t") {
  document.getElementsByClassName("sidebar")[0].innerHTML = Navbar({
    isTeacher: false,
    activeSection: "MyCourse",
  });
  // }

  //TopNavbar
  document.getElementById("top-navbar").innerHTML = TopNavbar({
    title: "My Courses",
    name,
  });

  //Notes
  document.getElementById("note-taking").innerHTML = noteContainer();
  document
    .getElementById("login-button")
    .addEventListener("click", function (e) {
      var id = document.getElementById("classId").value;
      console.log("id = ", id);

      fetch(`http://localhost:3000/student/classroom/${id}`, {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("class det = ", res);
          var details = `<div id="details" style="margin-top: 50px;border: 2px solid;padding:20px;border-radius: 20px;background-color: #a8aec8;">
          <h4 class="title" style="font-weight: bold;margin-bottom: 20px">SE (SE123)</h4>
          <div class="t-details" style="margin-bottom: 20px;">
              <h5 style="margin-bottom: 5px;">
                  Teacher Details
              </h5>
              <span>Name : ${res.data.teacher_details.name}</span><br>
              <span>Email :  ${res.data.teacher_details.email}</span>
          </div>
          <div class="assignment-details" style="margin-bottom: 20px;">
              <h4>Assignment : </h4>
              <div>
           
                  <span>Practical-1</span><br>
                  <span>Practical-2</span>
              </div>
          </div>
          <div class="s-details">
              <h4>Students : </h4>
              <div>
              ${res.data.students.map((e) => `<span>${e.email}</span><br>`)}
              </div>
          </div>
          </div>`;
          document.getElementById("class-details").innerHTML = details;
          document.getElementById("classId").value = "";
        });
    });
};
