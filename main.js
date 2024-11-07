var _a;
(_a = document.getElementById("resume")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Form submitted, preventing default");
    var formValues = getFormValues();
    if (formValues) {
        var name_1 = formValues.name, email = formValues.email, phone = formValues.phone, add = formValues.add, education = formValues.education, experience = formValues.experience, skill = formValues.skill, profilePicURL = formValues.profilePicURL, username = formValues.username, github = formValues.github, linkedin = formValues.linkedin;
        var uniquePath = "".concat(username.replace(/\s+/g, "_"), "_cv.html");
        var resumeOut = generateResumeHTML(profilePicURL, name_1, email, phone, add, education, experience, skill, github, linkedin);
        displayResume(resumeOut);
        makeEditable();
    }
    else {
        console.error("One or more form elements are missing");
    }
});
function getFormValues() {
    var _a;
    var elementpic = document.getElementById("profilePic");
    var elementName = document.getElementById("name");
    var elementEmail = document.getElementById("email");
    var elementPhone = document.getElementById("phone");
    var elementAdd = document.getElementById("add");
    var elementEducation = document.getElementById("education");
    var elementExperience = document.getElementById("experience");
    var elementSkill = document.getElementById("skill");
    var elementUser = document.getElementById("username");
    var elementGitHub = document.getElementById("github");
    var elementLinkedIn = document.getElementById("linkedin");
    if (elementpic &&
        elementName &&
        elementEmail &&
        elementPhone &&
        elementAdd &&
        elementEducation &&
        elementExperience &&
        elementSkill &&
        elementUser &&
        elementGitHub &&
        elementLinkedIn) {
        return {
            name: elementName.value.trim(),
            email: elementEmail.value.trim(),
            phone: elementPhone.value.trim(),
            add: elementAdd.value.trim(),
            education: elementEducation.value.trim(),
            experience: elementExperience.value.trim(),
            skill: elementSkill.value.trim(),
            profilePicURL: ((_a = elementpic.files) === null || _a === void 0 ? void 0 : _a[0]) ? URL.createObjectURL(elementpic.files[0]) : "",
            username: elementUser.value.trim(),
            github: elementGitHub.value.trim(),
            linkedin: elementLinkedIn.value.trim(),
        };
    }
    return null;
}
function generateResumeHTML(profilePicURL, name, email, phone, add, education, experience, skill, github, linkedin) {
    return "\n    <h2>Resume</h2>\n    ".concat(profilePicURL ? "<img src=\"".concat(profilePicURL, "\" alt=\"Profile Picture\" class=\"profilePic\">") : "", "\n    <p><strong>Name:</strong><span id=\"edit-name\" class=\"editable\"> ").concat(name, "</span></p>\n    <p><strong>Email:</strong><span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n    <p><strong>Phone:</strong><span id=\"edit-phone\" class=\"editable\"> ").concat(phone, "</span></p>\n    <p><strong>Address:</strong><span id=\"edit-add\" class=\"editable\"> ").concat(add, "</span></p>\n     <h3>Social Links:</h3>\n    <p>\n      ").concat(github ? "<a href=\"".concat(github, "\" target=\"_blank\"><i class=\"fab fa-github\"></i> GitHub</a>") : "", "\n      <br/>\n      ").concat(linkedin ? "<a href=\"".concat(linkedin, "\" target=\"_blank\"><i class=\"fab fa-linkedin\"></i> LinkedIn</a>") : "", "\n    </p>\n    <h3>Education:</h3>\n    <p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n    <h3>Experience:</h3>\n    <p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n    <h3>Skills:</h3>\n    <p id=\"edit-skills\" class=\"editable\">").concat(skill, "</p>\n    \n  ");
}
function displayResume(resumeOut) {
    var resumeOutElement = document.getElementById("resumeOut");
    if (resumeOutElement) {
        resumeOutElement.innerHTML = resumeOut;
        var buttonContainer = document.createElement("div");
        buttonContainer.id = "buttonContainer";
        resumeOutElement.appendChild(buttonContainer);
        var downloadButton = document.createElement("button");
        downloadButton.textContent = "Download As PDF";
        downloadButton.addEventListener("click", function () {
            var options = {
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
    var editableElements = document.querySelectorAll(".editable");
    editableElements.forEach(function (element) {
        element.addEventListener("click", function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                var input_1 = document.createElement("input");
                input_1.type = "text";
                input_1.value = currentValue;
                input_1.classList.add("editing-input");
                currentElement.style.display = "none";
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
                input_1.addEventListener("blur", function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = "";
                    input_1.remove();
                });
            }
        });
    });
}
