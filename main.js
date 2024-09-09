var _a;
(_a = document.getElementById('resume')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("Form submitted, preventing default");
    // Get the input elements
    var elementName = document.getElementById('name');
    var elementEmail = document.getElementById('email');
    var elementPhone = document.getElementById('phone');
    var elementEducation = document.getElementById('education');
    var elementExperience = document.getElementById('experience');
    var elementSkill = document.getElementById('skill');
    // Check if any of the elements are null
    if (elementName && elementEmail && elementPhone && elementEducation && elementExperience && elementSkill) {
        // Log retrieved values for debugging
        console.log("All form elements found.");
        console.log("Name:", elementName.value);
        console.log("Email:", elementEmail.value);
        console.log("Phone:", elementPhone.value);
        console.log("Education:", elementEducation.value);
        console.log("Experience:", elementExperience.value);
        console.log("Skills:", elementSkill.value);
        // Retrieve and trim the values from the input elements
        var name_1 = elementName.value.trim();
        var email = elementEmail.value.trim();
        var phone = elementPhone.value.trim();
        var education = elementEducation.value.trim();
        var experience = elementExperience.value.trim();
        var skill = elementSkill.value.trim();
        // Create the resume output HTML
        var resumeOut = "\n            <h2>Resume</h2>\n            <p><strong>Name:</strong> ".concat(name_1, "</p>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Phone:</strong> ").concat(phone, "</p>\n            <h3>Education:</h3>\n            <p>").concat(education, "</p>\n            <h3>Experience:</h3>\n            <p>").concat(experience, "</p>\n            <h3>Skills:</h3>\n            <p>").concat(skill, "</p>\n        ");
        // Display the resume output
        var resumeOutElement = document.getElementById('resumeOut');
        if (resumeOutElement) {
            resumeOutElement.innerHTML = resumeOut;
            console.log("Resume displayed successfully");
        }
        else {
            console.error('The resumeOut element is missing');
        }
    }
    else {
        console.error('One or more form elements are missing');
    }
});
