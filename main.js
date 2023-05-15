const APP_ID = "d73ceaa8ea204450a9a95fc1a298a7b6";
const TOKEN =
  "007eJxTYPCQNbNOqdmQet+jwLHJSqDg4tO3bMJ983LlbDs2G9v+klJgSE5OMzK2NDIys0xNMkkxMrJMtUwztjAACZglGSUnfz6YmNIQyMggZn+DgREKQXxOhuScxOLiovz8XAYGACZdH1Q=";
const CHANNEL = "classroom";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

let localTracks = [];
let remoteUsers = {};
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

let joinAndDisplayLocalStream = async () => {
  client.on("user-published", handleUserJoined);

  client.on("user-left", handleUserLeft);

  let UID = await client.join(APP_ID, CHANNEL, TOKEN, null);

  localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

  let player = `<div class="video-container" id="user-container-${UID}">
                        <div class="video-player" id="user-${UID}"></div>
                  </div>`;
  document
    .getElementById("video-streams")
    .insertAdjacentHTML("beforeend", player);

  localTracks[1].play(`user-${UID}`);

  await client.publish([localTracks[0], localTracks[1]]);
};

let joinStream = async () => {
  fetch("http://localhost:3000/teacher/handleLecture", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    }),
    body: JSON.stringify({
      subject_code: getParameterByName("id"),
      flag: true,
    }),
  })
    .then((res) => res.json())
    .then((res) => console.log("json  0 ", res));
  await joinAndDisplayLocalStream();
  // document.getElementById("join-btn").style.display = "none";
  document.getElementById("stream-controls").style.display = "flex";
};

let handleUserJoined = async (user, mediaType) => {
  remoteUsers[user.uid] = user;
  await client.subscribe(user, mediaType);

  if (mediaType === "video") {
    let player = document.getElementById(`user-container-${user.uid}`);
    if (player != null) {
      player.remove();
    }

    player = `<div class="video-container" id="user-container-${user.uid}">
                        <div class="video-player" id="user-${user.uid}"></div> 
                 </div>`;
    document
      .getElementById("video-streams")
      .insertAdjacentHTML("beforeend", player);

    user.videoTrack.play(`user-${user.uid}`);
  }

  if (mediaType === "audio") {
    user.audioTrack.play();
  }
};

let handleUserLeft = async (user) => {
  delete remoteUsers[user.uid];
  document.getElementById(`user-container-${user.uid}`).remove();
};

let leaveAndRemoveLocalStream = async () => {
  for (let i = 0; localTracks.length > i; i++) {
    localTracks[i].stop();
    localTracks[i].close();
  }

  await client.leave();
  // document.getElementById("join-btn").style.display = "block";
  document.getElementById("stream-controls").style.display = "none";
  document.getElementById("video-streams").innerHTML = "";
  fetch("http://localhost:3000/teacher/handleLecture", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    }),
    body: JSON.stringify({
      subject_code: getParameterByName("id"),
      flag: false,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("json  0 ", res);
      if (localStorage.getItem("identifier") == "teacher") {
        window.location.href = "teacherCourse.html";
      } else {
        window.location.href = "studentCourse.html";
      }
    });
};

let toggleMic = async (e) => {
  if (localTracks[0].muted) {
    await localTracks[0].setMuted(false);
    e.target.innerText = "Mic on";
    e.target.style.backgroundColor = "cadetblue";
  } else {
    await localTracks[0].setMuted(true);
    e.target.innerText = "Mic off";
    e.target.style.backgroundColor = "#EE4B2B";
  }
};

let toggleCamera = async (e) => {
  if (localTracks[1].muted) {
    await localTracks[1].setMuted(false);
    e.target.innerText = "Camera on";
    e.target.style.backgroundColor = "cadetblue";
  } else {
    await localTracks[1].setMuted(true);
    e.target.innerText = "Camera off";
    e.target.style.backgroundColor = "#EE4B2B";
  }
};

// document.getElementById("join-btn").addEventListener("click", joinStream);
document
  .getElementById("leave-btn")
  .addEventListener("click", leaveAndRemoveLocalStream);
document.getElementById("mic-btn").addEventListener("click", toggleMic);
document.getElementById("camera-btn").addEventListener("click", toggleCamera);
// document.getElementById("join-btn").click();
joinStream();
