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
      github,
      linkedin,
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
      skill,
      github,
      linkedin
    );

    displayResume(resumeOut);
    makeEditable();
  } else {
    console.error("One or more form elements are missing");
  }
});

function getFormValues() {
  const elementpic = document.getElementById("profilePic");
  const elementName = document.getElementById("name");
  const elementEmail = document.getElementById("email");
  const elementPhone = document.getElementById("phone");
  const elementAdd = document.getElementById("add");
  const elementEducation = document.getElementById("education");
  const elementExperience = document.getElementById("experience");
  const elementSkill = document.getElementById("skill");
  const elementUser = document.getElementById("username");
  const elementGitHub = document.getElementById("github");
  const elementLinkedIn = document.getElementById("linkedin");

  if (
    elementpic &&
    elementName &&
    elementEmail &&
    elementPhone &&
    elementAdd &&
    elementEducation &&
    elementExperience &&
    elementSkill &&
    elementUser &&
    elementGitHub &&
    elementLinkedIn
  ) {
    return {
      name: elementName.value.trim(),
      email: elementEmail.value.trim(),
      phone: elementPhone.value.trim(),
      add: elementAdd.value.trim(),
      education: elementEducation.value.trim(),
      experience: elementExperience.value.trim(),
      skill: elementSkill.value.trim(),
      profilePicURL: elementpic.files?.[0] ? URL.createObjectURL(elementpic.files[0]) : "",
      username: elementUser.value.trim(),
      github: elementGitHub.value.trim(),
      linkedin: elementLinkedIn.value.trim(),
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
  skill,
  github,
  linkedin
) {
  return `
    <h2>Resume</h2>
    ${profilePicURL ? `<img src="${profilePicURL}" alt="Profile Picture" class="profilePic">` : ""}
    <p><strong>Name:</strong><span id="edit-name" class="editable"> ${name}</span></p>
    <p><strong>Email:</strong><span id="edit-email" class="editable">${email}</span></p>
    <p><strong>Phone:</strong><span id="edit-phone" class="editable"> ${phone}</span></p>
    <p><strong>Address:</strong><span id="edit-add" class="editable"> ${add}</span></p>
     <h3>Social Links:</h3>
    <p>
      ${github ? `<a href="${github}" target="_blank"><i class="fab fa-github"></i> GitHub</a>` : ""}
      <br/>
      ${linkedin ? `<a href="${linkedin}" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>` : ""}
    </p>
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
      const options = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().from(resumeOutElement).set(options).save();
    });
    buttonContainer.appendChild(downloadButton);
  }
}

function makeEditable() {
  const editableElements = document.querySelectorAll(".editable");
  editableElements.forEach((element) => {
    element.addEventListener("click", function () {
      const currentElement = element;
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
