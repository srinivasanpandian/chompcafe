document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    navToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
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