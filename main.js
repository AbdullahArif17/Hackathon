document.getElementById("resume").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  const profilePicFile = document.getElementById("profilePic").files[0];
  let profilePicSrc = "";

  if (profilePicFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profilePicSrc = e.target.result;
      generateResume(data, profilePicSrc);
    };
    reader.readAsDataURL(profilePicFile);
  } else {
    generateResume(data, profilePicSrc);
  }
});

function generateResume(data, profilePicSrc) {
  const resumeOut = document.getElementById("resumeOut");
  const previewSection = document.querySelector(".preview-section");

  let previewHeader = document.querySelector(".preview-header");
  if (!previewHeader) {
    previewHeader = document.createElement("div");
    previewHeader.className = "preview-header";
    previewHeader.innerHTML = `
      <h2 class="preview-title">Resume Preview</h2>
      <button id="downloadPDF" class="download-btn" onclick="downloadPDF()">
        <i class="fas fa-download"></i> Download PDF
      </button>
    `;
    previewSection.insertBefore(previewHeader, resumeOut);
  }

  const skills = data.skill
    .split(",")
    .map((skill) => `<span class="skill-tag">${skill.trim()}</span>`)
    .join("");

  let socialLinks = "";
  if (data.github || data.linkedin) {
    socialLinks = '<div class="social-links">';
    if (data.github) {
      socialLinks += `<a href="${data.github}" class="social-link" target="_blank">
          <i class="fab fa-github"></i> GitHub
      </a>`;
    }
    if (data.linkedin) {
      socialLinks += `<a href="${data.linkedin}" class="social-link" target="_blank">
          <i class="fab fa-linkedin"></i> LinkedIn
      </a>`;
    }
    socialLinks += "</div>";
  }

  resumeOut.innerHTML = `
    <div class="resume-header">
        ${
          profilePicSrc
            ? `<img src="${profilePicSrc}" alt="Profile Picture" class="profile-pic">`
            : ""
        }
        <h1 class="resume-name">${data.name}</h1>
        <div class="contact-info">
            <div><i class="fas fa-envelope"></i> ${data.email}</div>
            <div><i class="fas fa-phone"></i> ${data.phone}</div>
            <div><i class="fas fa-map-marker-alt"></i> ${data.add}</div>
        </div>
        ${socialLinks}
    </div>

    <div class="resume-section">
        <h2 class="section-title"><i class="fas fa-graduation-cap"></i> Education</h2>
        <div class="section-content">
            <p>${data.education.replace(/\n/g, "<br>")}</p>
        </div>
    </div>

    <div class="resume-section">
        <h2 class="section-title"><i class="fas fa-briefcase"></i> Experience</h2>
        <div class="section-content">
            <p>${data.experience.replace(/\n/g, "<br>")}</p>
        </div>
    </div>

    <div class="resume-section">
        <h2 class="section-title"><i class="fas fa-code"></i> Skills</h2>
        <div class="skills-container">${skills}</div>
    </div>
  `;

  resumeOut.classList.add("show");
  previewHeader.style.display = "flex";
  resumeOut.scrollIntoView({ behavior: "smooth" });
}

function downloadPDF() {
  const resumeElement = document.getElementById("resumeOut");
  const downloadBtn = document.getElementById("downloadPDF");
  const originalText = "Download PDF";

  if (!resumeElement || !downloadBtn) return;

  downloadBtn.disabled = true;
  downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';

  const originalStyle = resumeElement.getAttribute("style") || "";
  resumeElement.setAttribute(
    "style",
    originalStyle +
      `
    background: #ffffff !important;
    color: #000000 !important;
    box-shadow: none !important;
    filter: none !important;
    transform: none !important;
    opacity: 1 !important;
    border-radius: 0 !important;
  `
  );

  const opt = {
    margin: 0,
    filename: `${
      document.querySelector(".resume-name")?.textContent?.trim().replace(/\s+/g, "_") || "resume"
    }.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 4,
      dpi: 300,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      scrollY: 0,
      logging: false,
    },
    jsPDF: {
      unit: "pt",
      format: "a4",
      orientation: "portrait",
      compress: true,
    },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  };

  window
    .html2pdf()
    .set(opt)
    .from(resumeElement)
    .save()
    .then(() => {
      downloadBtn.innerHTML = originalText;
      downloadBtn.disabled = false;
      resumeElement.setAttribute("style", originalStyle);
    })
    .catch((error) => {
      console.error("PDF generation failed:", error);
      downloadBtn.innerHTML = "Error - Try Again";
      setTimeout(() => (downloadBtn.innerHTML = originalText), 3000);
      downloadBtn.disabled = false;
      resumeElement.setAttribute("style", originalStyle);
    });
}
