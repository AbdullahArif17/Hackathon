document.getElementById('resume')?.addEventListener('submit', function(event) {
    event.preventDefault();

    console.log("Form submitted, preventing default");

    // Get the input elements
    const elementName = document.getElementById('name') as HTMLInputElement | null;
    const elementEmail = document.getElementById('email') as HTMLInputElement | null;
    const elementPhone = document.getElementById('phone') as HTMLInputElement | null;
    const elementEducation = document.getElementById('education') as HTMLInputElement | null;
    const elementExperience = document.getElementById('experience') as HTMLInputElement | null;
    const elementSkill = document.getElementById('skill') as HTMLInputElement | null;

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
        const name = elementName.value.trim();
        const email = elementEmail.value.trim();
        const phone = elementPhone.value.trim();
        const education = elementEducation.value.trim();
        const experience = elementExperience.value.trim();
        const skill = elementSkill.value.trim();

        // Create the resume output HTML
        const resumeOut = `
            <h2>Resume</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <h3>Education:</h3>
            <p>${education}</p>
            <h3>Experience:</h3>
            <p>${experience}</p>
            <h3>Skills:</h3>
            <p>${skill}</p>
        `;

        // Display the resume output
        const resumeOutElement = document.getElementById('resumeOut');
        if (resumeOutElement) {
            resumeOutElement.innerHTML = resumeOut;
            console.log("Resume displayed successfully");
        } else {
            console.error('The resumeOut element is missing');
        }
    } else {
        console.error('One or more form elements are missing');
    }
});
