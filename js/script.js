/* =========================================================
   NUFA SWIM - MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   HEADER SCROLL
========================================================= */

const mainHeader = document.getElementById("mainHeader");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        mainHeader.classList.add("scrolled");

    } else {

        mainHeader.classList.remove("scrolled");

    }

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const bubbleNav = document.getElementById("bubbleNav");

menuToggle.addEventListener("click", function () {

    bubbleNav.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (bubbleNav.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICK
========================================================= */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        bubbleNav.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        const target = link.getAttribute("href");

        if (target === "#" + currentSection) {

            link.classList.add("active");

        }

    });

});


/* =========================================================
   GALLERY
========================================================= */

const galleryImages = [

    "images/swim-1.jpg",
    "images/swim-2.jpg",
    "images/swim-3.jpg",
    "images/swim-4.jpg",
    "images/swim-5.jpg",
    "images/swim-6.jpg"

];

let currentGalleryIndex = 0;

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");


function openGallery(index) {

    currentGalleryIndex = index;

    lightboxImage.src = galleryImages[currentGalleryIndex];

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeGallery() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


function nextGallery() {

    currentGalleryIndex++;

    if (currentGalleryIndex >= galleryImages.length) {

        currentGalleryIndex = 0;

    }

    lightboxImage.src = galleryImages[currentGalleryIndex];

}


function prevGallery() {

    currentGalleryIndex--;

    if (currentGalleryIndex < 0) {

        currentGalleryIndex = galleryImages.length - 1;

    }

    lightboxImage.src = galleryImages[currentGalleryIndex];

}


/* =========================================================
   CLOSE LIGHTBOX CLICK OUTSIDE
========================================================= */

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        closeGallery();

    }

});


/* =========================================================
   KEYBOARD GALLERY
========================================================= */

document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {

        closeGallery();

    }

    if (event.key === "ArrowRight") {

        nextGallery();

    }

    if (event.key === "ArrowLeft") {

        prevGallery();

    }

});


/* =========================================================
   TESTIMONIAL SLIDER
========================================================= */

const testimonialTrack =
    document.getElementById("testimonialTrack");

const testimonialDots =
    document.querySelectorAll(".dot");

const testimonialCards =
    document.querySelectorAll(".testimonial-card");

let testimonialIndex = 0;


function showTestimonial(index) {

    testimonialIndex = index;

    testimonialTrack.style.transform =
        `translateX(-${testimonialIndex * 100}%)`;


    testimonialDots.forEach(function (dot, i) {

        dot.classList.toggle(
            "active",
            i === testimonialIndex
        );

    });

}


/* =========================================================
   DOT CLICK
========================================================= */

testimonialDots.forEach(function (dot, index) {

    dot.addEventListener("click", function () {

        showTestimonial(index);

    });

});


/* =========================================================
   AUTO SLIDE TESTIMONIAL
========================================================= */

setInterval(function () {

    testimonialIndex++;

    if (testimonialIndex >= testimonialCards.length) {

        testimonialIndex = 0;

    }

    showTestimonial(testimonialIndex);

}, 4500);


/* =========================================================
   SWIPE TESTIMONIAL MOBILE
========================================================= */

let touchStartX = 0;
let touchEndX = 0;


testimonialTrack.addEventListener("touchstart", function (event) {

    touchStartX = event.changedTouches[0].screenX;

});


testimonialTrack.addEventListener("touchend", function (event) {

    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();

});


function handleSwipe() {

    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) < 50) {
        return;
    }

    if (difference > 0) {

        testimonialIndex++;

        if (testimonialIndex >= testimonialCards.length) {
            testimonialIndex = 0;
        }

    } else {

        testimonialIndex--;

        if (testimonialIndex < 0) {
            testimonialIndex = testimonialCards.length - 1;
        }

    }

    showTestimonial(testimonialIndex);

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        if (
            targetId === "#" ||
            !document.querySelector(targetId)
        ) {
            return;
        }

        event.preventDefault();

        const target =
            document.querySelector(targetId);

        const headerHeight =
            mainHeader.offsetHeight;

        const targetPosition =
            target.offsetTop - headerHeight - 15;

        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* =========================================================
   PREVENT IMAGE DRAG
========================================================= */

document.querySelectorAll("img").forEach(function (image) {

    image.addEventListener("dragstart", function (event) {

        event.preventDefault();

    });

});