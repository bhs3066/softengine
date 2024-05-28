const createStudentForm = document.getElementById("create-student-form");
const getStudentsButton = document.getElementById("get-students");
const deleteStudentButton = document.getElementById("delete-student");
const studentsList = document.getElementById("students-list");

// 학생 생성 POST
createStudentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const studentNo = document.getElementById("studentNo").value;
  const attendance = document.getElementById("attendance").value;

  try {
    const response = await fetch("http://127.0.0.1:8000/api/students/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, studentNo, attendance }),
    });
    const result = await response.json();
    console.log("Student created:", result);
  } catch (error) {
    console.error("Error creating student:", error);
  }
});

async function request() {
  const response = await fetch("http://127.0.0.1:8000/api/students/");
  const students = await response.json();
  studentsList.innerHTML = ""; // 버튼 누르면 다시 초기화 하는 역할 없으면 같은 명단이 계속 추가됨
  students.forEach((student) => {
    const listItem = document.createElement("li");
    listItem.id = "student-container";
    const attendanceColorDiv = document.createElement("div");
    attendanceColorDiv.id = "attendance-color";
    const info = document.createElement("p");
    info.innerText = `이름:${student.name}
          학번:${student.studentNo}
          출석:${student.attendance}
          `;
    const buttonContainer = document.createElement("div");
    buttonContainer.id = "buttonContainer";
    const checkbutton = document.createElement("button");
    checkbutton.id = "checkbutton";
    checkbutton.classList = "checkbutton";
    checkbutton.innerText = "출석";
    const nocheckbutton = document.createElement("button");
    nocheckbutton.id = "nocheckbutton";
    nocheckbutton.classList = "checkbutton";
    nocheckbutton.innerText = "결석";
    const latecheckbutton = document.createElement("button");
    latecheckbutton.id = "latecheckbutton";
    latecheckbutton.classList = "checkbutton";
    latecheckbutton.innerText = "지각";

    listItem.appendChild(attendanceColorDiv);
    listItem.appendChild(info);

    buttonContainer.appendChild(checkbutton);
    buttonContainer.appendChild(nocheckbutton);
    buttonContainer.appendChild(latecheckbutton);
    listItem.appendChild(buttonContainer);

    if (student.attendance == 0) {
      attendanceColorDiv.style.backgroundColor = "#0064ffad";
      attendanceColorDiv.innerText = "출석";
    } else if (student.attendance == 2) {
      attendanceColorDiv.style.backgroundColor = "#ffe8008a";
      attendanceColorDiv.innerText = "지각";
    } else {
      attendanceColorDiv.style.backgroundColor = "#ff0000b5";
      attendanceColorDiv.innerText = "결석";
    }

    // listItem.textContent = `ID: ${student.id}, Name: ${student.name}, Student No: ${student.studentNo}, Attendance: ${student.attendance}`;
    studentsList.appendChild(listItem);
  });
}
request();
// GET 요청

// 학생 DELETE
deleteStudentButton.addEventListener("click", async () => {
  const studentId = document.getElementById("delete-student-id").value;
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/students/${studentId}/`,
      {
        method: "DELETE",
      }
    );
    if (response.status === 204) {
      console.log(`Student with ID ${studentId} deleted.`);
    } else {
      console.error("Error deleting student:", response.status);
    }
  } catch (error) {
    console.error("Error deleting student:", error);
  }
});


document
  .getElementById("updateAttendanceForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const studentId = document.getElementById("studentId").value;
    const newattendance = Number(
      document.getElementById("newattendance").value
    );
    console.log(newattendance);
    console.log(typeof newattendance);

    let studentName;
    let studentNo;
    const response = await fetch("http://127.0.0.1:8000/api/students/");
    const students = await response.json();
    students.forEach((student) => {
      if (student.id == studentId) {
        studentName = student.name;
        studentNo = student.studentNo;
      }
    });

    console.log(studentName);
    console.log(studentNo);

    await fetch(`http://127.0.0.1:8000/api/students/${studentId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: studentName,
        studentNo: studentNo,
        attendance: newattendance,
      }),
    });
  });
