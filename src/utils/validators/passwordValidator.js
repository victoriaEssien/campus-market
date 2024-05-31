export const validatePassword = (password) => {
    // Regular expression for password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Check if password is empty
    if (!password) {
        return "Please enter your password";
    }
    // Check if password is valid using the regex
    if (!passwordRegex.test(password)) {
        return "Your password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character.";
    }
    return ""; // Return empty string if password is valid
}
