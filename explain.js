// script.js
const outputArea = document.getElementById('output');
const inputField = document.getElementById('inputField');

// Listen for input events on the input field
inputField.addEventListener('input', function() {
    const input = inputField.value.trim();

    if (input) {
        fetchBibleVerse(input)
            .then(explanation => {
                outputArea.innerHTML = `<strong>Explanation:</strong> ${explanation}`;
            })
            .catch(error => {
                outputArea.innerHTML = 'Error fetching data. Please try again.';
                console.error('Error fetching data:', error);
            });
    } else {
        outputArea.innerHTML = ''; // Clear the output if input is empty
    }
});

// Function to fetch Bible verse from Bible API
async function fetchBibleVerse(query) {
    const response = await fetch(`https://bibleapi.co/api/v1/verse/${encodeURIComponent(query)}/`);
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Check if the verse is found
    if (data && data.data && data.data.text) {
        return data.data.text; // Return the verse text as explanation
    } else {
        return "No explanation found for this input.";
    }
}
