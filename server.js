const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory user "database" (replace with a real database in production)
const users = [
  { email: 'user1@example.com', password: 'password1' },
  { email: 'user2@example.com', password: 'password2' }
];

// Serve the login HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the email exists in the user database
  const user = users.find(user => user.email === email);

  if (!user) {
    // If email is not found, send "Account not found" message
    res.send('Account not found.');
  } else if (user.password !== password) {
    // If password doesn't match, send "Incorrect password"
    res.send('Incorrect password.');
  } else {
    // If email and password match, login is successful
    res.send('Login successful!');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
