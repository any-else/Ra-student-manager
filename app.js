//CRUD =>
//hiện thị
//tạo mới
//update
//delete
let action = "create";
//khi cập nhập hoặc reload gọi lại hàm render
window.addEventListener("DOMContentLoaded", () => {
  //gọi lại hàm render
  renderStudent();
});
//data
const studentList = [
  ["SV2000", "bui van vu", "vu@gmail.com", "0988178718", "Nam Dinh", "male"],
];
//query element
const tbodyElement = document.querySelector("#content");
const inputCodeElement = document.querySelector("#studentId");
const inputNameElement = document.querySelector("#fullName");
const inputEmailElement = document.querySelector("#email");
const inputPhoneElement = document.querySelector("#phone");
const inputAddressElement = document.querySelector("#address");

const spanErrorElement = document.querySelectorAll(".error");

const buttonElement = document.querySelector("#myBtn");
//chức năng hiện thị
function renderStudent() {
  if (!tbodyElement) return;
  tbodyElement.innerHTML = "";
  for (let i = 0; i < studentList.length; i++) {
    const trElement = `
      <tr>
        <td>${i}</td>
        <td>${studentList[i][0]}</td>
        <td>${studentList[i][1]}</td>
        <td>${studentList[i][2]}</td>
        <td>${studentList[i][3]}</td>
        <td>${studentList[i][4]}</td>
        <td>${studentList[i][5]}</td>
        <td><button onClick="updateStudent('${studentList[i][0]}')">Edit</button> <button onClick="removeStudent('${studentList[i][0]}')">Delete</button> </td>
      </tr>
    `;

    tbodyElement.innerHTML += trElement;
  }
}

//thêm mới + validate
//1.validate
function validateForm() {
  let idValidate = false;
  let nameValidate = false;
  let emailValidate = false;
  let phoneValidate = false;
  let addressValidate = false;

  console.log("test display");
  if (inputCodeElement.value.length == 0) {
    spanErrorElement[0].textContent = "Bạn không nên để id trống";
    spanErrorElement[0].classList.add("display-error");
  } else if (inputCodeElement.value.length < 6) {
    spanErrorElement[0].textContent = "Id bắt buộc phải lớn 6 kí tự";
    spanErrorElement[0].classList.add("display-error");
  } else if (inputCodeElement.value.length > 20) {
    spanErrorElement[0].textContent = "Id Không được lớn hơn 20 kí tự";
    spanErrorElement[0].classList.add("display-error");
  } else {
    spanErrorElement[0].classList.remove("display-error");
    idValidate = true;
  }
  if (inputNameElement.value.length == 0) {
    spanErrorElement[1].textContent = "Bạn không nên để tên trống";
    spanErrorElement[1].classList.add("display-error");
  } else if (inputNameElement.value.length < 6) {
    spanErrorElement[1].textContent = "Tên bắt buộc phải lớn 6 kí tự";
    spanErrorElement[1].classList.add("display-error");
  } else if (inputNameElement.value.length > 30) {
    spanErrorElement[1].textContent = "Tên Không được lớn hơn 30 kí tự";
    spanErrorElement[1].classList.add("display-error");
  } else {
    spanErrorElement[1].classList.remove("display-error");
    nameValidate = true;
  }

  if (inputEmailElement.value.length == 0) {
    spanErrorElement[2].textContent = "Bạn không nên để tên trống";
    spanErrorElement[2].classList.add("display-error");
  } else if (inputEmailElement.value.match("/[^s@]+@[^s@]+.[^s@]+/")) {
    spanErrorElement[2].textContent = "Email không hợp lệ";
    spanErrorElement[2].classList.add("display-error");
  } else {
    spanErrorElement[2].classList.remove("display-error");
    emailValidate = true;
  }

  if (inputPhoneElement.value.length == 0) {
    spanErrorElement[3].textContent = "Bạn không nên để tên trống";
    spanErrorElement[3].classList.add("display-error");
  } else if (inputPhoneElement.value.length < 10) {
    spanErrorElement[3].textContent =
      "Số điện thoại bắt buộc phải lớn hơn 10 số";
    spanErrorElement[3].classList.add("display-error");
  } else if (isNaN(Number(inputPhoneElement.value))) {
    spanErrorElement[3].textContent = "Yêu cầu phải là số điện thoại";
    spanErrorElement[3].classList.add("display-error");
  } else {
    spanErrorElement[3].classList.remove("display-error");
    phoneValidate = true;
  }

  if (inputPhoneElement.value.length == 0) {
    spanErrorElement[4].textContent = "Bạn không nên để tên trống";
    spanErrorElement[4].classList.add("display-error");
  } else if (inputPhoneElement.value.length > 50) {
    spanErrorElement[4].textContent = "Địa chỉ quá dài ";
    spanErrorElement[4].classList.add("display-error");
  } else {
    spanErrorElement[4].classList.remove("display-error");
    addressValidate = true;
  }

  if (
    emailValidate &&
    idValidate &&
    nameValidate &&
    addressValidate &&
    phoneValidate
  ) {
    return true;
  }

  return false;
}

function createStudent() {
  const inputGenderElement = document.querySelector(
    "input[name='gender']:checked"
  ).value;
  //tạo ra mảng con
  const studentNew = [
    inputCodeElement.value,
    inputNameElement.value,
    inputEmailElement.value,
    inputPhoneElement.value,
    inputAddressElement.value,
    inputGenderElement,
  ];

  studentList.push(studentNew);
  renderStudent();

  resetForm();
}

buttonElement.addEventListener("click", (e) => {
  e.preventDefault();
  const isCheck = validateForm();
  if (isCheck) {
    //hành động thêm mới
    if (action == "create") {
      createStudent();
    } else {
      updateFormStudent();
    }
  }
});

//Update fill form to full data
function updateStudent(id) {
  action = "edit";

  const findIndex = findIndexStudent(id);
  // const findIndex = studentList.findIndex((student) => student.includes(id));

  const editStudent = studentList[findIndex];

  inputCodeElement.value = editStudent[0];
  inputNameElement.value = editStudent[1];
  inputPhoneElement.value = editStudent[3];
  inputEmailElement.value = editStudent[2];
  inputAddressElement.value = editStudent[4];
  document.getElementById(editStudent[5]).checked = true;

  inputCodeElement.readonly = true;
}

//UpdateForm
function updateFormStudent() {
  const inputGenderElement = document.querySelector(
    "input[name='gender']:checked"
  ).value;
  const studentUpdate = [
    inputCodeElement.value,
    inputNameElement.value,
    inputEmailElement.value,
    inputPhoneElement.value,
    inputAddressElement.value,
    inputGenderElement,
  ];

  //find Index dua ma code cua sinh vien
  const indexStudent = findIndexStudent(inputCodeElement.value);

  studentList[indexStudent] = studentUpdate;
  renderStudent();
  action = "create";
  resetForm();
  inputCodeElement.readonly = false;
}

//reset Form
function resetForm() {
  inputCodeElement.value = "";
  inputEmailElement.value = "";
  inputNameElement.value = "";
  document.getElementById("male").checked = true;
  inputPhoneElement.value = "";
  inputAddressElement.value = "";
}

//find Index
function findIndexStudent(id) {
  return studentList.findIndex((student) => student.includes(id));
}

//remove Student
function removeStudent(id) {
  let isCheckRemove = confirm("Bạn có muốn xóa hay không?");
  if (isCheckRemove) {
    const indexRemoveStudent = findIndexStudent(id);
    studentList.splice(indexRemoveStudent, 1);
    renderStudent();
  }
}
