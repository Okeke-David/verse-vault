<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login & Signup Form</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 400px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            text-align: center;
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin: 10px 0 5px;
        }
        input[type="text"], input[type="password"], input[type="email"] {
            width: 100%;
            padding: 10px;
            margin: 5px 0 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .toggle-password {
            cursor: pointer;
            position: absolute;
            right: 15px;
            top: 38px;
        }
        input[type="submit"] {
            width: 100%;
            padding: 10px;
            background: #5cb85c;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        input[type="submit"]:hover {
            background: #4cae4c;
        }
        .form-toggle {
            text-align: center;
            margin-top: 20px;
        }
        .form-toggle a {
            color: #5cb85c;
            text-decoration: none;
        }
        .error {
            color: red;
            font-size: 0.9em;
        }
        .password-requirements {
            display: none;
            font-size: 0.9em;
            color: #555;
            background: #f0f0f0;
            padding: 10px;
            margin-bottom: 15px;
            border-radius: 5px;
        }
        .welcome-message {
            text-align: center;
            margin-top: 20px;
            color: #5cb85c;
        }
    </style>
</head>
<body>

<?php
// MySQL connection setup
$servername = "localhost";
$username = "root"; // replace with your database username
$password = ""; // replace with your database password
$dbname = "versevault";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Initialize variables
$loginMessage = '';
$signupMessage = '';

// Handle login form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Fetch user data from database
    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $loginMessage = "Welcome to Verse Vault, $username. Sign in successfully!";
        } else {
            $loginMessage = "Invalid password.";
        }
    } else {
        $loginMessage = "No account found with that username.";
    }
}

// Handle signup form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['signup'])) {
    $email = $_POST['email'];
    $username = $_POST['signupUsername'];
    $password = $_POST['signupPassword'];
    $confirmPassword = $_POST['confirmPassword'];

    if ($password !== $confirmPassword) {
        $signupMessage = "Passwords do not match!";
    } else {
        // Password requirements check
        $passwordPattern = '/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/';
        if (preg_match($passwordPattern, $password)) {
            // Encrypt password before storing
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

            // Insert user into database
            $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sss", $username, $email, $hashedPassword);

            if ($stmt->execute()) {
                $signupMessage = "Welcome to Verse Vault, $username. Sign up successfully!";
            } else {
                $signupMessage = "Error: Could not sign up.";
            }
        } else {
            $signupMessage = "Password must be at least 8 characters long, include a number, a special character, and an uppercase letter.";
        }
    }
}
?>

<div class="container">
    <h2 id="formTitle">Login</h2>
    <form id="authForm" method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>

        <label for="password">Password:</label>
        <div style="position: relative;">
            <input type="password" id="password" name="password" required>
            <span class="toggle-password" onclick="togglePassword()">👁️</span>
        </div>

        <input type="submit" name="login" value="Login">
    </form>

    <div class="form-toggle">
        <p>Don't have an account? <a href="#" onclick="toggleForms()">Sign Up</a></p>
    </div>
</div>

<div class="container" id="signupContainer" style="display: none;">
    <h2>Sign Up</h2>
    <form id="signupForm" method="POST">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>

        <label for="signupUsername">Username:</label>
        <input type="text" id="signupUsername" name="signupUsername" required>

        <label for="signupPassword">Password:</label>
        <div style="position: relative;">
            <input type="password" id="signupPassword" name="signupPassword" required>
            <span class="toggle-password" onclick="toggleSignupPassword()">👁️</span>
        </div>

        <label for="confirmPassword">Confirm Password:</label>
        <div style="position: relative;">
            <input type="password" id="confirmPassword" name="confirmPassword" required>
            <span class="toggle-password" onclick="toggleConfirmPassword()">👁️</span>
        </div>

        <input type="submit" name="signup" value="Sign Up">
    </form>

    <div class="form-toggle">
        <p>Already have an account? <a href="#" onclick="toggleForms()">Login</a></p>
    </div>
</div>

<div class="welcome-message">
    <?php if ($loginMessage) echo $loginMessage; ?>
    <?php if ($signupMessage) echo $signupMessage; ?>
</div>

<script>
    function togglePassword() {
        const passwordInput = document.getElementById('password');
        const passwordType = passwordInput.getAttribute('type');
        passwordInput.setAttribute('type', passwordType === 'password' ? 'text' : 'password');
    }

    function toggleSignupPassword() {
        const signupPasswordInput = document.getElementById('signupPassword');
        const signupPasswordType = signupPasswordInput.getAttribute('type');
        signupPasswordInput.setAttribute('type', signupPasswordType === 'password' ? 'text' : 'password');
    }

    function toggleConfirmPassword() {
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const confirmPasswordType = confirmPasswordInput.getAttribute('type');
        confirmPasswordInput.setAttribute('type', confirmPasswordType === 'password' ? 'text' : 'password');
    }

    function toggleForms() {
        const loginForm = document.getElementById('authForm').parentElement;
        const signupForm = document.getElementById('signupContainer');

        if (loginForm.style.display === 'none') {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
            document.getElementById('formTitle').innerText = 'Login';
        } else {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        }
    }
</script>

</body>
</html>
