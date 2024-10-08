// script.js

document.getElementById('shareBtn').addEventListener('click', function() {
    const shareMenu = document.getElementById('shareMenu');
    shareMenu.style.display = shareMenu.style.display === 'block' ? 'none' : 'block';
});

// Get the current page URL
const currentURL = window.location.href;

// Set share links
document.getElementById('facebookShare').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`;
document.getElementById('twitterShare').href = `https://twitter.com/share?url=${encodeURIComponent(currentURL)}`;
document.getElementById('linkedinShare').href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentURL)}`;
document.getElementById('whatsappShare').href = `https://api.whatsapp.com/send?text=${encodeURIComponent(currentURL)}`;

// Close the share menu if clicked outside
window.addEventListener('click', function(event) {
    if (!event.target.matches('#shareBtn')) {
        const shareMenu = document.getElementById('shareMenu');
        if (shareMenu.style.display === 'block') {
            shareMenu.style.display = 'none';
        }
    }
});
