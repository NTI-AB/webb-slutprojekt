document.addEventListener("DOMContentLoaded", function() {
    // Section navigation
    const sectionButtons = document.querySelectorAll(".section-btn");
    const contentSections = document.querySelectorAll(".content-section");

    // Function to update nav active state
    function updateNavActiveState(sectionId) {
        // Remove active class from all nav links
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to the corresponding nav link
        const correspondingLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
        if (correspondingLink) {
            correspondingLink.classList.add('active');
        }
    }

    sectionButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Remove active class from all buttons and sections
            sectionButtons.forEach(btn => btn.classList.remove("active"));
            contentSections.forEach(section => section.classList.remove("active"));
            
            // Add active class to clicked button and corresponding section
            this.classList.add("active");
            const targetSection = this.dataset.section;
            document.getElementById(targetSection).classList.add("active");
            
            // Update URL hash without scrolling
            history.pushState(null, null, `#${targetSection}`);
            
            // Update the active state in the navigation
            updateNavActiveState(targetSection);
        });
    });

    // Handle URL hash links
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            // Activate the correct section
            contentSections.forEach(section => section.classList.remove("active"));
            document.getElementById(hash).classList.add("active");
            
            // Activate the correct button
            sectionButtons.forEach(btn => btn.classList.remove("active"));
            document.querySelector(`.section-btn[data-section="${hash}"]`).classList.add("active");
            
            // Update the active state in the navigation
            updateNavActiveState(hash);
        }
    }
    
    // Check hash when page loads
    if (window.location.hash) {
        handleHashChange();
    }
    
    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Mobile menu toggle
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const body = document.body;
    
    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            navToggle.setAttribute("aria-expanded", 
                navMenu.classList.contains("active"));
                
            // Toggle body class for mobile menu
            if (navMenu.classList.contains("active")) {
                body.classList.add("mobile-menu-open");
            } else {
                body.classList.remove("mobile-menu-open");
            }
        });
    }

    // Reservation form validation
    const reservationForm = document.getElementById("reservation-form");
    if (reservationForm) {
        reservationForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            // Basic form validation would happen here
            alert("Thank you! Your reservation request has been received. We will confirm shortly via email.");
            
            // Optionally reset the form
            this.reset();
        });
    }
});