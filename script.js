const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  document.body.classList.toggle("menu-open"); // ndalon scroll faqen
  menuBtn.classList.toggle("open");
});

// Mbyll menu automatikisht kur klikohet linku
document.querySelectorAll(".nav-links li a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    document.body.classList.remove("menu-open"); // rikthen scroll
    menuBtn.classList.remove("open");
  });
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
document.addEventListener("DOMContentLoaded", function() {

  // ====== MOBILE MENU ======
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  menuBtn?.addEventListener("click", () => navLinks.classList.toggle("active"));
  document.querySelectorAll(".nav-links li a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("active")));

  // ====== HERO TYPED ======
  const typedEl = document.getElementById("typed");
  const texts = ["Full Stack Developer","Creative Designer","Problem Solver","Frontend Specialist"];
  let tIndex=0,cIndex=0,deleting=false;

  function typeEffect(){
    if(!typedEl) return;
    typedEl.textContent = texts[tIndex].substring(0,cIndex);
    if(!deleting && cIndex<texts[tIndex].length) cIndex++,setTimeout(typeEffect,120);
    else if(deleting && cIndex>0) cIndex--,setTimeout(typeEffect,70);
    else deleting=!deleting, !deleting&&(tIndex=(tIndex+1)%texts.length),setTimeout(typeEffect,500);
  }
  typeEffect();

  // ====== SCROLL FADE ======
  const faders=document.querySelectorAll(".fade-in");
  function reveal(){faders.forEach((el,i)=>{const top=el.getBoundingClientRect().top; window.innerHeight-100>top&&setTimeout(()=>el.classList.add("show"),i*150)})}
  window.addEventListener("scroll",reveal); window.addEventListener("load",reveal);

  // ====== SCROLL TOP ======
  const scrollBtn=document.getElementById("scrollTopBtn");
  window.addEventListener("scroll",()=>{scrollBtn&&(scrollBtn.style.display=window.scrollY>300?"block":"none")});
  scrollBtn?.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

  // ====== BUTTONS MAGNETIC ======
  document.querySelectorAll(".btn-primary, .btn-secondary").forEach(btn=>{
    btn.addEventListener("mousemove",e=>{
      const rect=btn.getBoundingClientRect(),x=e.clientX-rect.left-rect.width/2,y=e.clientY-rect.top-rect.height/2;
      btn.style.transform=`translate(${x*0.2}px, ${y*0.2}px) scale(1.05)`;
    });
    btn.addEventListener("mouseleave",()=>btn.style.transform="translate(0,0) scale(1)");
  });

});
