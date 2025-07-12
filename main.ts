document.getElementById("resume").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const data = {}
  for (const [key, value] of formData.entries()) {
    data[key] = value
  }

  // Handle profile picture
  const profilePicFile = document.getElementById("profilePic").files[0]
  let profilePicSrc = ""

  if (profilePicFile) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profilePicSrc = e.target.result
      generateResume(data, profilePicSrc)
    }
    reader.readAsDataURL(profilePicFile)
  } else {
    generateResume(data, profilePicSrc)
  }
})

function generateResume(data, profilePicSrc) {
  const resumeOut = document.getElementById("resumeOut")

  // Generate skills tags
  const skills = data.skill
    .split(",")
    .map((skill) => `<span class="skill-tag">${skill.trim()}</span>`)
    .join("")

  // Generate social links
  let socialLinks = ""
  if (data.github || data.linkedin) {
    socialLinks = '<div class="social-links">'
    if (data.github) {
      socialLinks += `<a href="${data.github}" class="social-link" target="_blank">
                <i class="fab fa-github"></i> GitHub
            </a>`
    }
    if (data.linkedin) {
      socialLinks += `<a href="${data.linkedin}" class="social-link" target="_blank">
                <i class="fab fa-linkedin"></i> LinkedIn
            </a>`
    }
    socialLinks += "</div>"
  }

  resumeOut.innerHTML = `
        <button class="download-btn" onclick="downloadPDF()">
            <i class="fas fa-download"></i> Download PDF
        </button>
        
        <div class="resume-header">
            ${profilePicSrc ? `<img src="${profilePicSrc}" alt="Profile Picture" class="profile-pic">` : ""}
            <h1 class="resume-name">${data.name}</h1>
            <div class="contact-info">
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <span>${data.email}</span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <span>${data.phone}</span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${data.add}</span>
                </div>
            </div>
            ${socialLinks}
        </div>
        
        <div class="resume-section">
            <h2 class="section-title">
                <i class="fas fa-graduation-cap"></i>
                Education
            </h2>
            <div class="section-content">
                <p>${data.education.replace(/\n/g, "<br>")}</p>
            </div>
        </div>
        
        <div class="resume-section">
            <h2 class="section-title">
                <i class="fas fa-briefcase"></i>
                Experience
            </h2>
            <div class="section-content">
                <p>${data.experience.replace(/\n/g, "<br>")}</p>
            </div>
        </div>
        
        <div class="resume-section">
            <h2 class="section-title">
                <i class="fas fa-code"></i>
                Skills
            </h2>
            <div class="skills-container">
                ${skills}
            </div>
        </div>
    `

  resumeOut.classList.add("show")
  resumeOut.scrollIntoView({ behavior: "smooth" })
}

function downloadPDF() {
  const element = document.getElementById("resumeOut")
  const opt = {
    margin: 0.5,
    filename: "resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  }

  window.html2pdf().set(opt).from(element).save()
}

// Add smooth scrolling for better UX
document.querySelectorAll("input, textarea").forEach((element) => {
  element.addEventListener("focus", function () {
    this.parentElement.style.transform = "scale(1.02)"
  })

  element.addEventListener("blur", function () {
    this.parentElement.style.transform = "scale(1)"
  })
})
