let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Increment the slide index
    slideIndex++;
    
    // Reset the index when it exceeds the number of slides
    if (slideIndex > slides.length) { 
        slideIndex = 1;
    }

    // Show the current slide
    slides[slideIndex - 1].style.display = "block";

    // Automatically move to the next slide after 3 seconds
    setTimeout(showSlides, 3000);
}
