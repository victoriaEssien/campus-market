import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

import { validateEmail } from "../../utils/validators/emailValidator";
import { validatePassword } from "../../utils/validators/passwordValidator";

import EyeClosed from "../../assets/icons/eye-closed-icon.svg";
import EyeOpen from "../../assets/icons/eye-open-icon.svg";
import MainNav from "../../components/MainNav";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // State variables for error messages
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');

    const navigate = useNavigate();

    // Function to handle password visibility toggle
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Reset error messages
        setEmailError('');
        setPasswordError('');
        setGeneralError('');

        // Validate form fields
        const emailValidationResult = validateEmail(email);
        if (emailValidationResult) {
            setEmailError(emailValidationResult);
            setTimeout(() => setEmailError(''), 5000);
            return;
        }

        const passwordValidationResult = validatePassword(password);
        if (passwordValidationResult) {
            setPasswordError(passwordValidationResult);
            setTimeout(() => setPasswordError(''), 5000);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("https://campus-market-api.onrender.com/user/login", {
                email: email,
                password: password
            });

            if (response.data && response.data.data && response.data.data.token) {
                // Store the token in cookies
                Cookies.set('token', response.data.data.token, { expires: 7 }); // Token will expire in 7 days
                // console.log(response.data);
                navigate("/home");
            }
        } catch (error) {
            console.error("Error logging in: ", error);
            setGeneralError("Failed to log in. Please check your credentials and try again :)");
            setTimeout(() => setGeneralError(''), 5000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=''>
            <MainNav />

            <div className="md:mx-auto mt-8">
                <div className='mx-auto md:w-5/12'>
                    <h1 className='font-os text-3xl md:text-4xl text-center text-black-600 font-bold leading-relaxed'>Welcome Back!</h1>
                    <p className="font-os text-md text-black-400 text-center leading-relaxed mx-auto w-11/12 md:w-9/12 mt-2 md:mt-4">
                        Log in to your account to access your profile, and explore the latest listings from your campus.
                    </p>
                    <div className="mt-8 md:mt-12 px-4 md:p-8 md:rounded-[20px] md:border border-lightgray-400 ">
                    {generalError && (
                        <div className="text-center bg-error-100 mb-10 p-4 rounded-md">
                            <p className="font-os font-medium text-error-700 leading-normal">{generalError}</p>
                        </div>
                    )}
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block font-os mb-2 text-black-600">
                                    Email Address:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="someone@example.com"
                                    className="w-full p-3 border text-black-500 border-lightgray-500 rounded-lg placeholder:text-black-100"
                                    disabled={loading}
                                />
                                {emailError && <p className="font-os text-sm text-error-600 mt-2">{emailError}</p>}
                            </div>
                            <div className="relative mt-2 mb-6">
                                <label htmlFor="password" className="block font-os mb-2 text-black-600">
                                    Password:
                                </label>
                                <div className='flex items-center'>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name='password'
                                        id='password'
                                        className="font-os mx-auto w-full block rounded-lg border border-lightgray-500 px-4 py-3 text-base text-black-600 placeholder:text-black-100 outline-primary-100"
                                        placeholder='Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                    />
                                    <button type='button' className='absolute text-base font-montserrat right-2 md:right-0 px-4 py-3' onClick={handlePasswordVisibility} disabled={loading}>
                                        {showPassword ? <img src={EyeOpen} alt="Eye Open" /> : <img src={EyeClosed} alt="Eye Closed" />}
                                    </button>
                                </div>
                                {passwordError && <p className='text-sm text-error-600 mt-1'>{passwordError}</p>}
                                <div className="w-fit">
                                    <Link to='/reset-password'>
                                        <p className="font-os font-semibold text-secondary-700 text-base mt-3 leading-relaxed">Forgot password?</p>
                                    </Link>
                                </div>
                            </div>
                            
                            <div className="mt-8">
                                <button type="submit" className="bg-primary-700 hover:bg-primary-800 font-os font-semibold text-[#FFF] py-4 px-4 mb-4 w-full rounded-lg" disabled={loading}>
                                    {loading ? "Logging In..." : "Log In"}
                                </button>
                                <p className="mt-3 font-os text-center text-base text-black-600">
                                    Don&apos;t have an account? <Link to="/signup" className="text-secondary-700 font-semibold">Sign Up</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;