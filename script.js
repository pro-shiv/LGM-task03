const configBtn = document.querySelector(".enroll-btn");
const displayName = document.querySelector(".form-field-name");
const email = document.querySelector(".form-field-email");
const website = document.querySelector(".form-field-website");
const imageUrl = document.querySelector(".form-field-image");
const radioInput = document.getElementsByName("gender");
const checkBoxes = document.querySelectorAll("[type='checkbox']");
const studentEnrollmentList = [];

function err(data) {
  const errorField = [];

  if (!data.name) {
    errorField.push("Name");
  }
  if (!data.email) {
    errorField.push("Email");
  }
  if (!data.gender) {
    errorField.push("Gender");
  }

  if (errorField.length) {
    alert(errorField);
    return false;
  }
  return true;
}

configBtn.addEventListener("click", () => {
  let gender = null;
  radioInput.forEach((i) => {
    if (i.checked) {
      gender = i;
    }
  });
  const skills = [];
  checkBoxes.forEach((i) => {
    if (i.checked) {
      skills.push(i);
    }
  });

  const data = {
    name: displayName.value,
    email: email.value,
    website: website.value,
    imageUrl: imageUrl.value,
    gender: `${gender ? gender.id : alert("choose gender")}`,
    skills: skills,
  };

  if (!err(data)) return;

  addToEnrollmentList(data);
  clear(displayName, email, website, imageUrl, gender, skills);
});

function clear(displayName, email, website, imageUrl, gender, skills) {
  displayName.value = "";
  email.value = "";
  website.value = "";
  imageUrl.value = "";
  gender.checked = false;
  skills.forEach((i) => {
    i.checked = false;
  });
}
function addToEnrollmentList(studentDetails) {
  studentEnrollmentList.push(studentDetails);
  console.log(studentEnrollmentList);
  displayStudentList(studentEnrollmentList);
}

function displayStudentList(studentEnrollmentList) {
  document.querySelector(".enrolled-student-container").innerHTML = "";
  const temp = document.getElementsByTagName("template")[0];
  studentEnrollmentList.forEach((i) => {
    var student = temp.content.cloneNode(true);
    student.querySelector(".name").innerHTML = i.name;
    student.querySelector(".email").innerHTML = i.email;
    student.querySelector(".website").innerHTML = i.website;
    student.querySelector(".gender").innerHTML = i.gender;
    student.querySelector(".student-image").src = i.imageUrl;
    const skillsContainer = student.querySelector(".skills");

    i.skills.forEach((item) => {
      const test = document.createElement("span");
      test.classList.add("skill-item");
      test.innerHTML = item.name;
      // if (index < i.skills.length - 1) test.innerHTML += ",";
      skillsContainer.append(test);
    });

    document.querySelector(".enrolled-student-container").appendChild(student);
  });
}
