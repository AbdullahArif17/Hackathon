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
    const previewSection = document.querySelector(".preview-section")
  
    // Create preview header if it doesn't exist
    let previewHeader = document.querySelector(".preview-header")
    if (!previewHeader) {
      previewHeader = document.createElement("div")
      previewHeader.className = "preview-header"
      previewHeader.innerHTML = `
        <h2 class="preview-title">Resume Preview</h2>
        <button class="download-btn" onclick="downloadPDF()">
          <i class="fas fa-download"></i> Download PDF
        </button>
      `
      previewSection.insertBefore(previewHeader, resumeOut)
    }
  
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
    previewHeader.style.display = "flex"
    resumeOut.scrollIntoView({ behavior: "smooth" })
  }
  
  function downloadPDF() {
    const downloadBtn = document.querySelector(".download-btn")
    const originalText = downloadBtn.innerHTML
  
    // Show loading state
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...'
    downloadBtn.disabled = true
  
    const element = document.getElementById("resumeOut")
  
    const opt = {
        margin: 0,
        filename: `${document.querySelector(".resume-name")?.textContent || "resume"}.pdf`,
        image: {
          type: "jpeg",
          quality: 1,
        },
        html2canvas: {
          scale: 5,
          useCORS: true,
          allowTaint: false,
          backgroundColor: "#ffffff", // must be white
          logging: false,
        },
        jsPDF: {
          unit: "pt",
          format: "a4",
          orientation: "portrait",
          compress: false,
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };
  
    // Generate PDF with better error handling
    window
      .html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        // Reset button state
        downloadBtn.innerHTML = originalText
        downloadBtn.disabled = false
      })
      .catch((error) => {
        console.error("PDF generation failed:", error)
        downloadBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error - Try Again'
        downloadBtn.disabled = false
  
        // Reset after 3 seconds
        setTimeout(() => {
          downloadBtn.innerHTML = originalText
        }, 3000)
      })
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
  