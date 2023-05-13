import { Navbar } from "../../components/navbar.js";
import { TopNavbar } from "../../components/topNavbar.js";
import { noteContainer } from "../../components/noteContainer.js";
// import { RtcTokenBuilder } from "agora-rtc-sdk";
import Details from "../../components/students.js";
document.getElementById("preloader").style.display = "block";
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

window.onload = () => {
  document.getElementById("preloader").style.display = "none";
  let token = localStorage.getItem("token");
  const { name } = JSON.parse(
    Buffer.from(token?.split(".")[1], "base64")?.toString()
  );

  //Sidebar change as per teacher or student
  const identifier = localStorage.getItem("identifier");
  if (identifier?.toLowerCase().charAt(0) === "t") {
    document.getElementsByClassName("sidebar")[0].innerHTML = Navbar({
      isTeacher: true,
      activeSection: "MyCourse",
    });
  } else {
    document.getElementsByClassName("sidebar")[0].innerHTML = Navbar({
      activeSection: "MyCourse",
      isTeacher: false,
    });
  }

  //TopNavbar
  document.getElementById("top-navbar").innerHTML = TopNavbar({
    title: "My Courses",
    name,
  });

  //Notes
  document.getElementById("note-taking").innerHTML = noteContainer();

  let url = getParameterByName("id");
  console.log("url - ", url);

  if (url) {
    fetch(`http://localhost:3000/teacher/classroom/${url}`, {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        document.getElementById("top-navbar").innerHTML = TopNavbar({
          title: res.data.subject_name,
          name,
        });
        console.log("details -", res);
        var s_data = res.data.students.map(
          (e, i) => ` <tr>
        <td style="border:1px solid">${i + 1}</td>
        <td style="border:1px solid">${e.email}</td>
        <td style="border:1px solid">${e.name}</td>
        </tr>`
        );
        var data = `<div class="row" id="course-card">
        <div class="col-12 col-md-4">
          <div
            class="card"
            data-courseId=""
            onclick=""
            style="height: auto; cursor: pointer;width:950px;"
          >
            <div class="card-header">
              <h5 class="card-title">Subject : ${res.data.subject_name}</h5>
              <h4 class="card-title">Subject code : ${res.data.subject_code}</h4>
            </div>
            <div class="card-header">
            <h5 class="card-category">Teacher : ${res.data.teacher_details.name}</h5>
            <h5 class="card-category">Subject code : ${res.data.teacher_details.email}</h5>
          </div>
          <hr>
            <div class="tab-content mb-5" id="pills-tabContent">
            <!--students list-->
            <div
              class="tab-pane fade show active"
              id="pills-class-members"
              role="tabpanel"
              aria-labelledby="pills-class-members-tab"
            >
              <div class="table-responsive">
                <table class="table student-data-table" style="padding:20px;border:none;">
                  <thead style="background-color: #00564d; color: white">
                    <tr style="text-align: center">
                      <th scope="col">Sr. No.</th>
                      <th scope="col">Email</th>
                      <th scope="col">Name</th>
                      
                    </tr>
                    </thead>
                    
                  <tbody id="student-details">
                  ${s_data}
                                   </tbody>
                </table>
              </div>

              <!-- Modal for Add Student to Course-->
              <div
                class="modal fade"
                id="addStudToCourse"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Add Teacher
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <!-- Student id -->
                      <div>
                        <label for="student-id" id="student-id-label"
                          >Teacher Email Id </label
                        ><br />
                        <input
                          id="teacher-id"
                          class="add-student-modal"
                          type="text"
                          placeholder="Teacher Id"
                        />
                      </div>
                      <div>
                        <label for="student-id" id="student-id-label"
                          >Teacher name </label
                        ><br />
                        <input
                          id="teacher-name"
                          class="add-student-modal"
                          type="text"
                          placeholder="Teacher name"
                        />
                      </div>
                      <!-- <div>
                        <label for="student-id" id="student-id-label"
                          >Password </label
                        ><br />
                        <input
                          id="password"
                          class="add-student-modal"
                          type="text"
                          placeholder="password"
                        />
                      </div> -->
                    </div>
                    <!-- Add Student Button -->
                    <div class="modal-footer">
                      <button
                        type="button"
                        id="add-student-submit-btn"
                        class="btn"
                      >
                        Add Teacher
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--Faculty name-->
            <div
              class="tab-pane fade"
              id="pills-faculty"
              role="tabpanel"
              aria-labelledby="pills-faculty-tab"
            >
              <div class="table-responsive">
                <table class="table">
                  <thead style="background-color: #00564d; color: white">
                    <tr>
                      <th scope="col">Sr. No.</th>
                      <th scope="col">Institute ID</th>
                      <th scope="col">Faculty Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td id="teacher-id"></td>
                      <td id="teacher-name"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!--Meeting Link-->
            <div
              class="tab-pane fade mt-5"
              id="pills-meetings"
              role="tabpanel"
              aria-labelledby="pills-meetings-tab"
            >
              <div class="card" height="300px">
                <div
                  class="meeting p-5 text-center"
                  style="
                    font-weight: bolder;
                    background-color: #00564d;
                    border-radius: 10px;
                  "
                >
                  <a
                    style="
                      text-decoration: none;
                      color: white;
                      font-size: 20px;
                    "
                    id="join-meeting-link"
                    >Join meeting here</a
                  >
                </div>
              </div>
            </div>
          </div>
            <button class="btn-block btn-color" style="width:200px;margin:20px;border-radius:15px;" onclick="createVideoCall('${res.data.subject_code}')" >Start Lecture </button>
          </div>
        </div>
      </div>`;
        document.querySelector(".content").innerHTML = data;
      });
  } else {
    fetch("http://localhost:3000/teacher/dashboard", {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("second - ", res);
        var data = res.data.classrooms.map(
          (e) => `<div class="row" id="course-card">
      <div class="col-12 col-md-4">
        <div
          class="card"
          data-courseId="${e.subject_code}"
          onclick="getDetails('${e._id}')"
          style="height: 270px; cursor: pointer"
        >
          <div class="card-header">
            <h5 class="card-category">${e.subject_code}</h5>
            <h4 class="card-title">${e.subject_name}</h4>
          </div>
        </div>
      </div>
    </div>`
        );

        document.querySelector(".content").innerHTML = data;
      });
  }
};
