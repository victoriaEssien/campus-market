import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Add axios import

import { validateEmail } from "../../utils/validators/emailValidator";
import { validatePhoneNumber } from "../../utils/validators/phoneNumberValidator";
import { validatePassword } from "../../utils/validators/passwordValidator";

import EyeClosed from "../../assets/icons/eye-closed-icon.svg";
import EyeOpen from "../../assets/icons/eye-open-icon.svg";
import MainNav from "../../components/MainNav";

const SignUp = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // State variables for error messages
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // State variable for success message
    const [successMessage, setSuccessMessage] = useState('');

    // Function to handle password visibility toggle
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Reset error messages
        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
        setPhoneNumberError('');
        setPasswordError('');
        setSuccessMessage('');
        setLoading(true);

        // Validate form fields
        if (!firstName) {
            setFirstNameError('Please enter your first name');
            setTimeout(() => setFirstNameError(''), 5000);
            setLoading(false);
            return;
        }

        if (!lastName) {
            setLastNameError('Please enter your last name');
            setTimeout(() => setLastNameError(''), 5000);
            setLoading(false);
            return;
        }

        const emailValidationResult = validateEmail(email);
        if (emailValidationResult) {
            setEmailError(emailValidationResult);
            setTimeout(() => setEmailError(''), 5000);
            setLoading(false);
            return;
        }

        const phoneNumberValidationResult = validatePhoneNumber(phoneNumber);
        if (phoneNumberValidationResult) {
            setPhoneNumberError(phoneNumberValidationResult);
            setTimeout(() => setPhoneNumberError(''), 5000);
            setLoading(false);
            return;
        }

        const passwordValidationResult = validatePassword(password);
        if (passwordValidationResult) {
            setPasswordError(passwordValidationResult);
            setTimeout(() => setPasswordError(''), 5000);
            setLoading(false);
            return;
        }

        // Prepare data for API request
        const signUpData = {
            firstname: firstName,
            lastname: lastName,
            phone: phoneNumber,
            email: email,
            password: password,
            link: "https://campus-market-test.vercel.app/login",
        };

        try {
            const response = await axios.post("https://campus-market-api.onrender.com/user/new", signUpData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data && response.data.msg) {
                console.log(response.data);
                setSuccessMessage(response.data.msg);
                navigate('/login');
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error("Server error:", error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                console.error("Network error:", error.request);
            } else {
                // Something else happened
                console.error("Error:", error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=''>
            <MainNav />

            {firstNameError && <div className="hidden md:block bg-error-100 w-full fixed top-0 z-50 text-center mx-auto mb-6 px-10 py-4"><p className='font-os text-base text-error-600 leading-6'>{firstNameError}</p></div>}
            {lastNameError && <div className="hidden md:block bg-error-100 w-full fixed top-0 z-50 text-center mx-auto mb-6 px-10 py-4"><p className='font-os text-base text-error-600 leading-6'>{lastNameError}</p></div>}
            {successMessage && <div className="bg-accent-100 w-full fixed top-0 z-50 text-center mx-auto mb-6 px-10 py-4"><p className='font-os text-base text-accent-600 leading-6'>{successMessage}</p></div>}

            <div className="md:mx-auto my-8">
                <div className='mx-auto md:w-5/12'>
                    <h1 className='font-os text-3xl md:text-4xl text-center text-black-600 font-bold leading-relaxed'>Create an Account</h1>
                    <p className="font-os text-md text-black-400 text-center leading-relaxed mx-auto w-11/12 md:w-full mt-2 md:mt-4">
                        Sign up now to unlock exclusive deals, connect with peers, and start
                        trading hassle-free on campus.
                    </p>
                    <div className="mt-8 md:mt-12 px-4 md:p-8 md:rounded-[20px] md:border border-lightgray-400 ">
                        <form method="POST" onSubmit={handleSignUp}>
                            <div className="mb-4">
                                <label htmlFor="firstName" className="block mb-2 font-os text-black-600 ">
                                    First Name:
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="John"
                                    className="w-full p-3 border text-black-500 border-lightgray-500 rounded-lg placeholder:text-black-100"
                                />
                                {firstNameError && <p className="md:hidden font-os text-sm text-error-600 mt-2">{firstNameError}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="lastName" className="block font-os mb-2 text-black-600">
                                    Last Name:
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Doe"
                                    className="w-full p-3 border text-black-500 border-lightgray-500 rounded-lg placeholder:text-black-100"
                                />
                                {lastNameError && <p className="md:hidden font-os text-sm text-error-600 mt-2">{lastNameError}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block font-os mb-2 text-black-600">
                                    Email Address:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="samantha@example.com"
                                    className="w-full p-3 border text-black-500 border-lightgray-500 rounded-lg placeholder:text-black-100"
                                />
                                {emailError && <p className="font-os text-sm text-error-600 mt-2">{emailError}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block font-os mb-2 text-black-600">
                                    Phone Number:
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="9900xxxxxxx"
                                    className="w-full p-3 border text-black-500 border-lightgray-500 rounded-lg placeholder:text-black-100"
                                />
                                {phoneNumberError && <p className="font-os text-sm text-error-600 mt-2">{phoneNumberError}</p>}
                            </div>
                            <div className="relative mt-2 mb-6">
                                <label htmlFor="password" className="block font-os mb-2 text-black-600">
                                    Password:
                                </label>
                                <div className='flex items-center'>
                                    <input type={showPassword ? 'text' : 'password'} name='password' id='password' className="font-os mx-auto w-full block rounded-lg border border-lightgray-500 px-4 py-3 text-base text-black-600 placeholder:text-black-100 outline-primary-100 '" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <button type='button' className='absolute text-base font-montserrat right-2 md:right-0 px-4 py-3' onClick={handlePasswordVisibility}>{showPassword ? <img src={EyeOpen} alt="Eye Open" /> : <img src={EyeClosed} alt="Eye Closed" />}</button>
                                </div>
                                {passwordError && <p className='text-sm text-error-600 mt-1'>{passwordError}</p>}
                        
                                <p className="font-lato text-black-300 text-sm w-full mt-2 leading-relaxed">Your password must contain an uppercase letter, a lowercase letter, special characters, and digits.</p>
                            </div>

                            <div className="mt-8">
                                <button type="submit" disabled={loading} className="bg-primary-700 hover:bg-primary-800 font-os font-medium text-[#FFF] py-4 px-4 mb-4 w-full rounded-lg">
                                    {loading ? 'Just a minute...' : 'Create Account'}
                                </button>
                                <p className="mt-3 font-os text-center text-base text-black-600">
                                    Already have an account? <Link to="/login" className="text-accent-700 font-medium">Log In</Link>
                                </p>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default SignUp;
