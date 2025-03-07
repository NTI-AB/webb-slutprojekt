document.addEventListener("DOMContentLoaded", function () {
    // Menu Button Functionality
    const menuButtons = document.querySelectorAll(".menu-btn");
    const menuContents = document.querySelectorAll(".menu-content");

    menuButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Remove active class from all buttons and content
            menuButtons.forEach(btn => btn.classList.remove("active"));
            menuContents.forEach(content => content.classList.remove("active"));
            
            // Add active class to clicked button and corresponding content
            this.classList.add("active");
            const targetMenu = this.dataset.menu;
            document.getElementById(targetMenu).classList.add("active");
        });
    });

    // Handle URL hash links
    function handleHashChange() {
        const hash = window.location.hash.substring(1); // Remove the '#' from the hash
        if (hash && document.getElementById(hash)) {
            // Remove active class from all buttons and content
            menuButtons.forEach(btn => btn.classList.remove("active"));
            menuContents.forEach(content => content.classList.remove("active"));
            
            // Activate the correct section
            document.getElementById(hash).classList.add("active");
            const buttonToActivate = document.querySelector(`.menu-btn[data-menu="${hash}"]`);
            if (buttonToActivate) {
                buttonToActivate.classList.add("active");
            }
        }
    }

    // Check hash when page loads
    if (window.location.hash) {
        handleHashChange();
    }

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Mobile Menu Toggle
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const body = document.body;
    
    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            navToggle.setAttribute("aria-expanded", 
                navMenu.classList.contains("active"));
                
            // Prevent the mobile menu from affecting other elements
            if (navMenu.classList.contains("active")) {
                body.classList.add("mobile-menu-open");
            } else {
                body.classList.remove("mobile-menu-open");
            }
        });
    }
});