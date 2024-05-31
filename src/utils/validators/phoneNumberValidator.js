export const validatePhoneNumber = (phoneNumber) => {
    // Regular expression for international and local phone number validation
    const phoneNumberRegex = /^(\+?\d{1,3})?\s?\d{10}$/;
    // Check if phone number is empty
    if (!phoneNumber) {
        return "Please fill in this field";
    }
    // Check if phone number is valid using the regex
    if (!phoneNumberRegex.test(phoneNumber)) {
        return "Invalid phone number";
    }
    return ""; // Return empty string if phone number is valid
}