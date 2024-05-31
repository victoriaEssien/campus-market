
export const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Check if email is empty
    if (!email) {
        return "Please enter your email address";
    }
    // Check if email is valid using the regex
    if (!emailRegex.test(email)) {
        return "Please enter a valid email address";
    }
    return ""; // Return empty string if email is valid
  }