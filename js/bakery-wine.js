document.addEventListener("DOMContentLoaded", function() {
    // Image Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Initialize first slide and start slideshow if slides exist
    if (slides.length > 0) {
        showSlide(0);
        setInterval(nextSlide, 6000);
    }

    // Section Navigation - similar to info.js
    const sectionButtons = document.querySelectorAll(".section-btn");
    const contentSections = document.querySelectorAll(".content-section");
    const wineNavLink = document.getElementById("wine-nav-link");
    const bakeryNavLink = document.getElementById("bakery-nav-link");

    // Function to update nav active state
    function updateNavActiveState(sectionId) {
        // Remove active class from all nav links
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to the corresponding nav link based on section
        if (sectionId === "wine-bar") {
            wineNavLink.classList.add('active');
        } else if (sectionId === "bakery") {
            bakeryNavLink.classList.add('active');
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
            const buttonToActivate = document.querySelector(`.section-btn[data-section="${hash}"]`);
            if (buttonToActivate) {
                buttonToActivate.classList.add("active");
            }
            
            // Update the active state in the navigation
            updateNavActiveState(hash);
        }
    }
    
    // Check hash when page loads
    if (window.location.hash) {
        handleHashChange();
    } else {
        // If no hash, default to wine-bar and update nav
        updateNavActiveState("wine-bar");
    }
    
    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Handle "View Wine List" button click
    const viewWineListButton = document.getElementById("view-wine-list");
    if (viewWineListButton) {
        viewWineListButton.addEventListener("click", function(e) {
            e.preventDefault();
            // Redirect to the menus page with the wine tab active
            window.location.href = "menus.html#wine";
        });
    }

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
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only process if it's an in-page anchor
            if (targetId.startsWith('#') && document.querySelector(targetId)) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});