// Get the "Read More" button and the hidden text
const readMoreBtn = document.getElementById("read-more-btn");
const moreText = document.querySelector(".more-text");

// Make sure the text is initially hidden
moreText.style.display = "none";

// Add event listener to the button
readMoreBtn.addEventListener("click", function() {
    // Toggle the display of the more text
    if (moreText.style.display === "none") {
        // Show the hidden text
        moreText.style.display = "inline";
        readMoreBtn.textContent = "Read Less";  // Change button text
    } else {
        // Hide the text again
        moreText.style.display = "none";
        readMoreBtn.textContent = "Read More";  // Change button text back
    }
});