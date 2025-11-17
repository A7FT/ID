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
    if(window.innerWidth <= 900) navLinks.classList.remove("active");
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
  updateThemeIcon();
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

// ====== SCROLL REVEAL ANIMATIONS ======
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

// ====== SCROLL TO TOP BUTTON ======
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ====== PROJECT MODAL WITH 3D TILT ======
const modal = document.getElementById("projectModal");
const closeModal = modal.querySelector(".close");
const projectCards = document.querySelectorAll(".projects-grid .card");

projectCards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "perspective(600px) rotateX(5deg) rotateY(5deg) scale(1.03)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
  card.addEventListener("click", () => {
    modal.style.display = "block";
    modal.classList.add("fadeIn");
  });
});

closeModal.addEventListener("click", closeProjectModal);

function closeProjectModal() {
  modal.classList.remove("fadeIn");
  modal.classList.add("fadeOut");
  setTimeout(() => {
    modal.style.display = "none";
    modal.classList.remove("fadeOut");
  }, 300);
}

window.addEventListener("click", (e) => {
  if (e.target === modal) closeProjectModal();
});

// ====== CONTACT FORM WITH EMAILJS ======
// Për këtë të funksionojë realisht, regjistrohu tek https://www.emailjs.com/
// dhe krijo serviceID, templateID, userID
// Zëvendëso "YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", "YOUR_USER_ID" me të vërtetat

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function(e){
  e.preventDefault();

  formStatus.textContent = "Sending...";
  formStatus.classList.add("active");

  // EmailJS example
  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this, 'YOUR_USER_ID')
    .then(() => {
      formStatus.textContent = "Message sent successfully!";
      contactForm.reset();
      setTimeout(() => formStatus.textContent = "", 2500);
    }, (error) => {
      formStatus.textContent = "Failed to send message. Try again.";
      console.error(error);
      setTimeout(() => formStatus.textContent = "", 2500);
    });
});

// ====== HERO SOCIAL LINKS INTERACTIVE HOVER ======
const heroSocials = document.querySelectorAll(".hero-social a");
heroSocials.forEach(link => {
  link.addEventListener("mouseenter", () => link.style.transform = "scale(1.3)");
  link.addEventListener("mouseleave", () => link.style.transform = "scale(1)");
});

// ====== MAGNETIC BUTTON EFFECT ======
document.querySelectorAll(".btn-primary, .btn-secondary").forEach(button => {
  button.addEventListener("mousemove", e => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    button.style.transform = `translate(${x*0.2}px, ${y*0.2}px) scale(1.05)`;
  });
  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0,0) scale(1)";
  });
});

// ====== DYNAMIC GLASS PARALLAX HERO ======
const heroAnimation = document.querySelector(".hero-animation");
window.addEventListener("mousemove", e => {
  const centerX = window.innerWidth/2;
  const centerY = window.innerHeight/2;
  const offsetX = (e.clientX - centerX)/100;
  const offsetY = (e.clientY - centerY)/100;
  heroAnimation.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

// ====== BONUS: ANIMATED SECTION TITLES ======
document.querySelectorAll(".section-title").forEach(title => {
  title.innerHTML = title.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
});

const letters = document.querySelectorAll(".section-title .letter");
letters.forEach((letter, index) => {
  letter.style.display = "inline-block";
  letter.style.transform = "translateY(50px)";
  letter.style.opacity = 0;
  setTimeout(() => {
    letter.style.transition = `all 0.5s ease ${index*0.03}s`;
    letter.style.transform = "translateY(0)";
    letter.style.opacity = 1;
  }, 200);
});
