// 0=> 미정 1=> 출석 2=> 결석 3=> 지각

document.addEventListener("DOMContentLoaded", () => {
  const studentForm = document.getElementById("studentForm");
  const studentList = document.getElementById("studentList");

  let students = [];

  studentForm.addEventListener("submit", function (event) {
    event.preventDefault(); // 폼 제출 시 페이지 리로드 방지

    const name = document.getElementById("name").value;
    const studentNo = document.getElementById("studentNo").value;
    const attendance = document.getElementById("attendance").checked;

    // 학생 객체 생성
    const student = createStudent(name, studentNo, attendance);

    // 학생 배열에 추가
    students.push(student);

    // 학생 리스트 업데이트
    updateStudentList();

    // 폼 초기화
    studentForm.reset();
  });

  // 학생 객체 생성 함수
  function createStudent(name, studentNo, attendance) {
    return {
      name: name,
      studentNo: studentNo,
      출석여부: attendance,
    };
  }

  // 학생 리스트 업데이트 함수
  function updateStudentList() {
    studentList.innerHTML = ""; // 기존 리스트 초기화

    students.forEach((student, index) => {
      const li = document.createElement("li");
      li.textContent = `Name: ${student.name}, Student No: ${
        student.studentNo
      }, 출석 여부: ${student.출석여부 ? "출석" : "결석"}`;
      studentList.appendChild(li);
    });
  }
});
