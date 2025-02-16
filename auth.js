let currentUser = null;

// Toggle the Sign In/Sign Up modal visibility
function toggleSignInSignUp() {
    const modal = document.getElementById('signInSignUpContainer');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// Switch to Sign Up form
function switchToSignUp() {
    document.getElementById('signInForm').style.display = 'none';
    document.getElementById('signUpForm').style.display = 'block';
}

// Switch to Sign In form
function switchToSignIn() {
    document.getElementById('signUpForm').style.display = 'none';
    document.getElementById('signInForm').style.display = 'block';
}

// Simulate Sign In process
function signIn() {
    const username = document.getElementById('signInUsername').value;
    const password = document.getElementById('signInPassword').value;

    if (username && password) {
        // Check if user exists and credentials match
        const storedData = JSON.parse(localStorage.getItem(username)); // Retrieve stored data
        if (storedData && storedData.password === password) {
            currentUser = username;
            alert('Welcome back, ' + username + '!');

            toggleSignInSignUp(); // Close the modal
            updateWelcomeMessage();
            updateSignInButton(); // Update the sign-in button
        } else {
            alert('Incorrect username or password!');
        }
    } else {
        alert('Please enter both username and password!');
    }
}

// Simulate Sign Up process
function signUp() {
    const username = document.getElementById('signUpUsername').value;
    const password = document.getElementById('signUpPassword').value;

    if (username && password) {
        // Check if the username already exists
        if (localStorage.getItem(username)) {
            alert('An account with this username already exists!');
        } else {
            // Save user credentials in local storage
            const userData = {
                password: password,
            };
            localStorage.setItem(username, JSON.stringify(userData));
            alert('Sign Up successful! You can now sign in.');

            // Automatically switch to the Sign In form after successful signup
            switchToSignIn();
        }
    } else {
        alert('Please fill in both username and password!');
    }
}

// Update welcome message when user is logged in
function updateWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage) {
        welcomeMessage.textContent = currentUser ? 'Welcome, ' + currentUser + '!' : 'Welcome to Our Website';
    }
}

// Sign out function with confirmation
function signOut() {
    const confirmSignOut = confirm('Are you sure you want to sign out?');
    if (confirmSignOut) {
        currentUser = null;
        alert('You have been signed out.');
        updateWelcomeMessage();
        updateSignInButton();
    }
}

// Update Sign In button based on user login status
function updateSignInButton() {
    const signInButton = document.querySelector('.sign-in-button');

    if (currentUser) {
        signInButton.textContent = 'Sign Out';
        signInButton.onclick = signOut; // Set function to sign out
    } else {
        signInButton.textContent = 'Sign In / Sign Up';
        signInButton.onclick = toggleSignInSignUp; // Open the modal
    }
}

// Initialize the sign-in button on page load
document.addEventListener('DOMContentLoaded', updateSignInButton);



