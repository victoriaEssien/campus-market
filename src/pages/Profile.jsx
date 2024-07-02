import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie'
import EyeClosed from "../assets/icons/eye-closed-icon.svg";
import EyeOpen from "../assets/icons/eye-open-icon.svg";
import { validateEmail } from "../utils/validators/emailValidator";

// Components
import AppNav from "../components/AppNav";

function Profile() {
    // State for password fields and password visibility
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(false)

    // State variables for error messages
    const [fullNameError, setFullNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [currentPasswordError, setCurrentPasswordError] = useState('')
    const [newPasswordError, setNewPasswordError] = useState('')
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [error, setError] = useState('')



    return (
        <div>
            {/* Navigation */}
            <AppNav />

            {/* Display error or success message */}
            {error && <div className="bg-error-100 w-full fixed top-0 z-50 text-center mx-auto mb-6 px-10 py-4"><p className='font-lato text-base text-error-700 leading-6'>{error}</p></div>}

            {successMessage && <div className="bg-accent-100 w-full fixed top-0 z-50 text-center mx-auto px-10 py-4"><p className='font-lato text-base text-accent-700 leading-6'>{successMessage   }</p></div>}

            {/* Main content */}
            <div className="mx-4 md:mx-14 mt-10">
                {/* Title */}
                <h1 className="text-4xl font-sg font-bold text-black-600 leading-normal">Settings</h1>

                {/* Account section */}
                <div className="mt-12">
                    <h3 className="text-2xl font-sg font-bold text-black-500 leading-8">Account</h3>
                    <p className="text-[15px] w-[300px] md:w-full font-lato font-normal text-black-400 leading-normal me-auto mt-2">Update your account information such as your profile picture, name etc.</p>

                    {/* Profile Picture */}
                    <div className="mt-12">
                        <p className="font-os text-black-600 leading-normal text-base">Profile Picture</p>
                        <div className="w-fit flex items-center gap-x-8 mt-5">
                            <img src="https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg" alt="User profile" className="h-20 w-20 rounded-full object-cover" />
                            <label htmlFor="appLogo" className="rounded-lg bg-primary-700 hover:bg-primary-800 text-lightgray-100 font-os text-base px-4 py-2.5 cursor-pointer">
                                Change Photo
                            </label>
                            <input type="file" id="appLogo" accept="image/*" className="hidden" />
                        </div>

                        {/* Input fields */}
                        <form method="POST">
                            <div className="flex flex-col md:flex-row gap-x-5 md:w-fit mt-10">
                                {/* Name */}
                                <div className="">
                                    <label htmlFor="" className="font-os block text-base font-normal text-black-600 leading-6">Name</label>
                                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="font-os block mt-3 w-full md:w-[380px] rounded-lg border border-lightgray-400 px-4 py-3 text-black-600 outline-primary-100 placeholder:text-black-100" placeholder='Jane Doe' />
                                    {fullNameError && <p className='text-sm text-red-500 mt-1'>{fullNameError}</p>}
                                </div>

                                {/* Email Address */}
                                <div className="mt-8 md:mt-0">
                                    <label htmlFor="" className="font-os block text-base font-normal text-black-600 leading-6">Email Address</label>
                                    <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="block mt-3 w-full md:w-[380px] rounded-lg border border-lightgray-400 px-4 py-3 text-black-600 outline-primary-100 placeholder:text-black-100" placeholder='jane.doe123@gmail.com' />
                                    {emailError && <p className='text-sm text-error-700 mt-1'>{emailError}</p>}   
                                </div>
                            </div>

                            {/* Save Changes Button */}
                            <div className="mt-10">
                                <button type="submit" disabled={loading} className="font-lato text-base bg-primary-700 hover:bg-primary-800 text-lightgray-100 px-5 py-3 rounded-lg w-full md:w-fit">{loading ? 'Saving...' : 'Save Changes'}</button>
                            </div>
                        </form>
                        {/* Separator */}
                        <hr className="w-full md:w-[810px] h-px my-10 bg-lightgray-400 border-0" />
                    </div>
                </div>

                {/* Security section */}
                <div className="mt-12">
                    <h3 className="text-2xl font-os font-bold text-black-600 leading-8">Security</h3>
                    <p className="text-[15px] font-os font-normal text-black-400 leading-normal mx-auto mt-2">Forgot your password? Change your password here.</p>

                    {/* Password fields */}
                    <div className="mt-12">
                        <form method="POST">
                        <div className="md:flex flex-col md:flex-row md:flex-wrap gap-x-5 w-full mt-10">
                            {/* Current Password */}
                            <div className='relative'>
                                <label htmlFor="">Current Password</label>
                                <div className='flex items-center mt-3'>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name='currentPassword'
                                        id='currentPassword'
                                        className="font-os mx-auto w-full md:w-[380px] block rounded-lg border border-lightgray-400 px-4 py-3 text-base text-black-600 placeholder:text-black-100 outline-primary-100"
                                        placeholder='Password'
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                    <button type='button' className='absolute text-base font-montserrat right-2 md:right-0 px-4 py-3'>
                                        {showPassword ? <img src={EyeOpen} alt="Eye Open" /> : <img src={EyeClosed} alt="Eye Closed" />}
                                    </button>
                                </div>
                                {currentPasswordError && <p className='text-sm text-error-700 mt-1'>{currentPasswordError}</p>}
                            </div>

                            {/* New Password */}
                            <div className='relative mt-8 md:mt-0'>
                                <label htmlFor="">New Password</label>
                                <div className='flex items-center mt-3'>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name='NewPassword'
                                        id='NewPassword'
                                        className="font-lato mx-auto w-full md:w-[380px] block rounded-lg border border-lightgray-600 px-4 py-3 text-base text-gray-600 placeholder:text-gray-200 outline-primary-100"
                                        placeholder='Password'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button type='button' className='absolute text-base font-montserrat right-2 md:right-0 px-4 py-3'>
                                        {showPassword ? <img src={EyeOpen} alt="Eye Open" /> : <img src={EyeClosed} alt="Eye Closed" />}
                                    </button>
                                </div>
                                {newPasswordError && <p className='text-sm text-error-700 mt-1'>{newPasswordError}</p>}
                                <p className="font-lato text-gray-300 text-sm w-[360px] md:w-[380px] mt-2 leading-relaxed">Your password must contain an uppercase letter, a lowercase letter, special characters, and digits.</p>
                            </div>

                            {/* Confirm New Password */}
                            <div className='relative mt-8 md:mt-0'>
                                <label htmlFor="">Confirm New Password</label>
                                <div className='flex items-center mt-3'>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name='confirmNewPassword'
                                        id='confirmNewPassword'
                                        className="font-os mx-auto w-full md:w-[380px] block rounded-lg border border-lightgray-400 px-4 py-3 text-base text-black-600 placeholder:text-gray-100 outline-primary-100"
                                        placeholder='Password'
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />
                                    <button type='button' className='absolute text-base font-montserrat right-2 md:right-0 px-4 py-3'>
                                        {showPassword ? <img src={EyeOpen} alt="Eye Open" /> : <img src={EyeClosed} alt="Eye Closed" />}
                                    </button>
                                </div>
                                {confirmNewPasswordError && <p className='text-sm text-error-700 mt-1'>{confirmNewPasswordError}</p>}
                            </div>
                        </div>
                        

                        {/* Change Password Button */}
                        <div className="mt-10">
                            <button type="submit" disabled={loading} className="font-lato text-base bg-primary-700 hover:bg-primary-800 text-lightgray-100 px-5 py-3 rounded-lg w-full md:w-fit">{loading ? 'Changing...' : 'Change Password'}</button>
                        </div>
                        </form>

                        {/* Separator */}
                        <hr className="w-full md:w-[810px] h-px my-10 bg-lightgray-400 border-0" />
                    </div>
                </div>

                {/* Delete account section */}
                <div className="mt-12 mb-6">
                    <h3 className="text-2xl font-sg font-bold text-error-600 leading-8">Danger Zone</h3>
                    <p className="text-[15px] w-[320px] md:w-[616px] font-lato font-normal text-black-400 leading-normal me-auto mt-2">Here, you have the option to delete your account along with all associated data. Please be aware that this action cannot be undone.</p>

                    {/* Delete Account Input */}
                    <div className="mt-12">
                        <div className="mt-10">
                            <div className="">
                                <label htmlFor="" className="font-lato block text-base font-normal text-gray-500 leading-6">Delete Account</label>

                                <div className="flex flex-col md:flex-row md:items-center mt-3 md:gap-x-5">
                                    <input type="text" className="block w-full md:w-[380px] rounded-lg border border-lightgray-600 px-4 py-3 text-gray-500 outline-primary-100 placeholder:text-gray-200" placeholder='Delete' />

                                    <p className="font-lato text-gray-300 text-sm my-3 leading-relaxed md:hidden">Type <span className="font-semibold text-gray-400">Delete</span> to confirm your account deletion</p>

                                    <button type="button" className="font-lato text-base bg-error-700 text-lightgray-100 px-5 py-3.5 md:py-3 rounded-lg mt-4 mb-10 md:my-0">Delete Account</button>
                                </div>
                                <p className="font-lato text-gray-300 text-sm my-2 leading-relaxed hidden md:block">Type <span className="font-semibold text-gray-400">Delete</span> to confirm your account deletion</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;