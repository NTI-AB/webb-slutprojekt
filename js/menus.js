document.addEventListener("DOMContentLoaded", function() {
    // Menu Button Functionality
    const menuButtons = document.querySelectorAll(".menu-btn");
    const menuContents = document.querySelectorAll(".menu-content");

    menuButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Remove active class from all buttons and content
            menuButtons.forEach(btn => btn.classList.remove("active"));
            menuContents.forEach(content => content.classList.remove("active"));
            
            // Add active class to clicked button and corresponding content
            this.classList.add("active");
            const targetMenu = this.dataset.menu;
            document.getElementById(targetMenu).classList.add("active");
        });
    });

    // Mobile Menu Toggle
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            navToggle.setAttribute("aria-expanded", 
                navMenu.classList.contains("active"));
        });
    }
});