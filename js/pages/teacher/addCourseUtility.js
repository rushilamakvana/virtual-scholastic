const token = localStorage.getItem("token");

document
  .getElementById("teacher-add-course-btn")
  .addEventListener("click", () => {
    const nameInput = document.getElementById("course-name").value;
    const idInput = document.getElementById("course-id").value;
    if (nameInput.length < 1 || idInput.length < 1) {
      return;
    }
    fetch("http://localhost:3000/courses/addCourse", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ courseName: nameInput, courseId: idInput }),
    })
      .then((res) => res.json())
      .then((data) => console.log("data = ", data));
  });
