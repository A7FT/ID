// ====== MOBILE MENU TOGGLE ======
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active"); // shto .active në CSS për display:block në celular
  menuBtn.classList.toggle("open");
});

// Mbyll menu automatikisht kur klikohet linku në celular
document.querySelectorAll(".nav-links li a").forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 900) navLinks.classList.remove("active");
    menuBtn.classList.remove("open");
  });
});

// ====== THEME TOGGLE WITH LOCALSTORAGE ======
const themeToggle = document.getElementById("themeToggle");

function updateThemeIcon() {
  themeToggle.textContent = document.body.classList.contains("light-theme") ? "🌞" : "🌙";
}

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-theme");
}
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
  animateThemeTransition();
});

function animateThemeTransition() {
  document.body.style.transition = "background 0.8s, color 0.8s";
}

// ====== TYPED HERO EFFECT ======
const typedText = ["Full Stack Developer", "Creative Designer", "Problem Solver", "Frontend Specialist"];
let typeIndex = 0, charIndex = 0, deleting = false;

function typeEffect() {
  const typedEl = document.getElementById("typed");
  if(!typedEl) return; // siguron që elementi ekziston
  const currentText = typedText[typeIndex];
  typedEl.textContent = currentText.substring(0, charIndex);

  if (!deleting && charIndex < currentText.length) {
    charIndex++;
    setTimeout(typeEffect, 120);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 70);
  } else {
    deleting = !deleting;
    if (!deleting) typeIndex = (typeIndex + 1) % typedText.length;
    setTimeout(typeEffect, 500);
  }
}
typeEffect();

// ====== SCROLL REVEAL ======
const faders = document.querySelectorAll(".fade-in");

function revealOnScroll() {
  faders.forEach((el, index) => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (top < windowHeight - 100) {
      setTimeout(() => el.classList.add("show"), index * 150);
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ====== SCROLL TO TOP ======
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if(scrollBtn) scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

if(scrollBtn) scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ====== CONTACT FORM WITH EMAILJS ======
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if(contactForm) {
  contactForm.addEventListener("submit", function(e){
    e.preventDefault();

    if(formStatus) formStatus.textContent = "Sending...";

    // EmailJS
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this, 'YOUR_USER_ID')
      .then(() => {
        if(formStatus) formStatus.textContent = "Message sent successfully!";
        contactForm.reset();
        setTimeout(() => { if(formStatus) formStatus.textContent = ""; }, 2500);
      }, (error) => {
        if(formStatus) formStatus.textContent = "Failed to send message. Try again.";
        console.error(error);
        setTimeout(() => { if(formStatus) formStatus.textContent = ""; }, 2500);
      });
  });
}
