document.getElementById("resume")?.addEventListener("submit", function (event) {
  event.preventDefault();

  console.log("Form submitted, preventing default");

  const formValues = getFormValues();

  if (formValues) {
    const {
      name,
      email,
      phone,
      add,
      education,
      experience,
      skill,
      profilePicURL,
      username,
    } = formValues;
    const uniquePath = `${username.replace(/\s+/g, "_")}_cv.html`;

    const resumeOut = generateResumeHTML(
      profilePicURL,
      name,
      email,
      phone,
      add,
      education,
      experience,
      skill
    );

    displayResume(resumeOut);
  } else {
    console.error("One or more form elements are missing");
  }
});

function getFormValues() {
  const elementpic = document.getElementById(
    "profilePic"
  ) as HTMLInputElement | null;
  const elementName = document.getElementById(
    "name"
  ) as HTMLInputElement | null;
  const elementEmail = document.getElementById(
    "email"
  ) as HTMLInputElement | null;
  const elementPhone = document.getElementById(
    "phone"
  ) as HTMLInputElement | null;
  const elementadd = document.getElementById("add") as HTMLInputElement | null;
  const elementEducation = document.getElementById(
    "education"
  ) as HTMLInputElement | null;
  const elementExperience = document.getElementById(
    "experience"
  ) as HTMLInputElement | null;
  const elementSkill = document.getElementById(
    "skill"
  ) as HTMLInputElement | null;
  const elementUser = document.getElementById(
    "username"
  ) as HTMLInputElement | null;

  if (
    elementpic &&
    elementName &&
    elementEmail &&
    elementPhone &&
    elementadd &&
    elementEducation &&
    elementExperience &&
    elementSkill &&
    elementUser
  ) {
    return {
      name: elementName.value.trim(),
      email: elementEmail.value.trim(),
      phone: elementPhone.value.trim(),
      add: elementadd.value.trim(),
      education: elementEducation.value.trim(),
      experience: elementExperience.value.trim(),
      skill: elementSkill.value.trim(),
      profilePicURL: elementpic.files?.[0]
        ? URL.createObjectURL(elementpic.files[0])
        : "",
      username: elementUser.value.trim(),
    };
  }
  return null;
}

function generateResumeHTML(
  profilePicURL,
  name,
  email,
  phone,
  add,
  education,
  experience,
  skill
) {
  return `
        <h2>Resume</h2>
        ${
          profilePicURL
            ? `<img src="${profilePicURL}" alt="Profile Picture" class="profilePic">`
            : ""
        }
        <p><strong>Name:</strong><span id="edit-name" class="editable"> ${name}</span></p>
        <p><strong>Email:</strong><span id="edit-email" class="editable">${email}</span></p>
        <p><strong>Phone:</strong><span id="edit-phone" class="editable"> ${phone}</span></p>
        <p><strong>Address:</strong><span id="edit-add" class="editable"> ${add}</span></p> 
        <h3>Education:</h3>
        <p id="edit-education" class="editable">${education}</p>
        <h3>Experience:</h3>
        <p id="edit-experience" class="editable">${experience}</p>
        <h3>Skills:</h3>
        <p id="edit-skills" class="editable">${skill}</p>
    `;
}

function displayResume(resumeOut) {
  const resumeOutElement = document.getElementById("resumeOut");
  if (resumeOutElement) {
    resumeOutElement.innerHTML = resumeOut;

    const buttonContainer = document.createElement("div");
    buttonContainer.id = "buttonContainer";
    resumeOutElement.appendChild(buttonContainer);

    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Download As PDF";
    downloadButton.addEventListener("click", () => {
      window.print();
    });
    buttonContainer.appendChild(downloadButton);

    console.log("Resume displayed successfully");
    makeEditable();
  }
}

function makeEditable() {
  const editableElements = document.querySelectorAll(".editable");
  editableElements.forEach((element) => {
    element.addEventListener("click", function () {
      const currentElement = element as HTMLElement;
      const currentValue = currentElement.textContent || "";

      if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentValue;
        input.classList.add("editing-input");

        currentElement.style.display = "none";
        currentElement.parentNode?.insertBefore(input, currentElement);
        input.focus();

        input.addEventListener("blur", () => {
          currentElement.textContent = input.value;
          currentElement.style.display = "";
          input.remove();
        });
      }
    });
  });
}
