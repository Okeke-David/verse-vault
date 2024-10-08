// script.js
document.getElementById('uploadButton').addEventListener('click', function() {
    document.getElementById('videoInput').click();
});

document.getElementById('videoInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        uploadVideo(file);
    }
});

function uploadVideo(file) {
    const formData = new FormData();
    formData.append('video', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Video uploaded successfully!');
            // Optionally, you can display the video on the site here
        } else {
            alert('Error uploading video');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configure multer to only accept MP4 files
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        // Only accept MP4 files
        if (file.mimetype === 'video/mp4') {
            cb(null, true);
        } else {
            cb(new Error('Only MP4 files are allowed!'), false);
        }
    }
});

app.post('/upload', upload.single('video'), (req, res) => {
    if (req.file) {
        // Video is saved in the 'uploads' folder
        res.sendStatus(200);
    } else {
        res.status(400).send('No file uploaded or file is not an MP4.');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 5500');
});
