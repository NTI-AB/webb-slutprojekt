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

    // Modals
    const modals = {
        "about": "<h2>About Us</h2><p>Address: 123 Luxury Lane...</p><p><a href='../html/info.html#about'>View full About page</a></p>",
        "wine-bar": "<h2>Wine Bar Menu</h2><ul><li>Red Wines...</li></ul>",
        "bakery": "<h2>Bakery Menu</h2><ul><li>Croissants...</li></ul>"
    };

    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");

    // If modals exist in the page
    if (modal && modalText) {
        document.querySelectorAll(".modal-trigger").forEach(link => {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                const section = this.getAttribute("href").substring(1);
                modalText.innerHTML = modals[section];
                modal.style.display = "block";
            });
        });

        document.querySelector(".close").addEventListener("click", () => {
            modal.style.display = "none";
        });

        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

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