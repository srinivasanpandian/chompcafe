const navToggler = document.querySelector("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const header = document.querySelector("[data-header]");

navToggler.addEventListener("click", function () {
    navbar.classList.toggle("active");
    this.classList.toggle("active");
});

// Header active on scroll
window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
});

// Close mobile menu when clicking outside
document.addEventListener("click", function (e) {
    if (!navbar.contains(e.target) && !navToggler.contains(e.target)) {
        navbar.classList.remove("active");
        navToggler.classList.remove("active");
    }
}); 