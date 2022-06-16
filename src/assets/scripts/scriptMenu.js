const navToggle = document.querySelector(".nav__toggle");
const navUl = document.querySelector(".nav__ul");

navToggle.addEventListener("click", ()=>{
    navUl.classList.toggle("nav__ul-visible");
})