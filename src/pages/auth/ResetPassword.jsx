

import { useState } from "react";
import { Link } from "react-router-dom";

import { validateEmail } from "../../utils/validators/emailValidator";
import { validatePassword } from "../../utils/validators/passwordValidator"

import EyeClosed from "../../assets/icons/eye-closed-icon.svg";
import EyeOpen from "../../assets/icons/eye-open-icon.svg";
import MainNav from "../../components/MainNav";

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    // const [loading, setLoading] = useState(false);

    // State variables for error messages
    const [emailError, setEmailError] = useState('')

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        // Reset error messages
        setEmailError('')

        // validate form fields
        const emailValidationResult = validateEmail(email);
        if (emailValidationResult) {
            // Email is empty or invalid, set error message
            setEmailError(emailValidationResult);
            // Clear error message after 5 seconds
            setTimeout(() => setEmailError(''), 5000);
            return;
        }

    }

    return (
        <div className='mb-8'>
            <MainNav />
            <div className="md:mx-auto mt-8">
                <div className='mx-auto md:w-5/12'>
                    <h1 className='font-os text-3xl md:text-4xl text-center text-black-600 font-bold leading-relaxed'>Forgot your Password?</h1>
                    <p className="font-os text-md text-black-400 text-center leading-relaxed mx-auto w-11/12 md:w-9/12 mt-2 md:mt-4">
                        Enter your email address below and we will send you a link to change your password
                    </p>
                    <div className="mt-8 md:mt-12 px-4 md:p-8 md:rounded-[20px] md:border border-lightgray-400 ">
                        <form onSubmit={handlePasswordReset}>
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
                                />
                                {emailError && <p className="font-os text-sm text-error-600 mt-2">{emailError}</p>}
                            </div>

                            <div className="mt-8">
                            <button type="submit" className="bg-primary-700 hover:bg-primary-800 font-os font-medium text-[#FFF] py-4 px-4 mb-4 w-full rounded-lg">
                                Submit
                            </button>
                            <div className="w-fit mx-auto mt-8">
                                <Link to='/login'>
                                <p className="text-base font-os font-semibold text-accent-700">Back to Login</p>
                                </Link>
                            </div>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
        </div>

    );
}

export default ResetPassword;