import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
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
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    // State variables for error messages
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [currentPasswordError, setCurrentPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [fileSizeError, setFileSizeError] = useState('');


        // Function to handle password visibility toggle
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const token = Cookies.get('token'); // Assuming token is stored in cookies with the name 'token'
        
        if (token) {
            axios.get("https://campus-market-api.onrender.com/profile/specific", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                const { firstname, lastname, email, avatar } = response.data;
                setUserFirstName(firstname);
                setUserLastName(lastname);
                setUserEmail(email);
                setAvatar(avatar)
            })
            .catch(err => {
                console.error(err);
                setError("Failed to fetch user profile.");
            });

        } else {
            setError("User is not authenticated.");
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const maxSize = 2 * 1024 * 1024; // 2MB

        if (file && file.size > maxSize) {
            setFileSizeError("File size exceeds 2MB. Please select a smaller file.");
            setSelectedFile(null);
            setTimeout(() => {
                setFileSizeError('');
            }, 5000)
            return;
        }

        setSelectedFile(file);
        setFileSizeError('');

        // Update avatar preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatar(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = (e) => {
        e.preventDefault(); // Prevent the default form submission
    
        const token = Cookies.get('token');
        const formData = new FormData();
        formData.append('upload', selectedFile);
    
        if (token && selectedFile) {
            axios.post("https://campus-market-api.onrender.com/profile/avatar", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                setAvatar(response.data.data.avatar); // Update avatar with the response data
                setSuccessMessage("Profile picture updated successfully!");
                setTimeout(() => {
                    setSuccessMessage('');
                }, 5000)
            })
            .catch(err => {
                console.error(err);
                setError("Failed to upload profile picture.");
                setTimeout(() => {
                    setError('');
                }, 5000)
            });
        } else {
            setError("Please select a file to upload.");
            setTimeout(() => {
                setError('');
            }, 5000)
        }
    };
    

    return (
        <div>
            {/* Navigation */}
            <AppNav />

            {/* Display error or success message */}
            {error && <div className="bg-error-100 w-full fixed top-0 z-50 text-center mx-auto mb-6 px-10 py-4"><p className='font-lato text-base text-error-700 leading-6'>{error}</p></div>}

            {successMessage && <div className="bg-success-100 w-full fixed top-0 z-50 text-center mx-auto px-10 py-4"><p className='font-lato text-base text-success-700 leading-6'>{successMessage}</p></div>}

            {fileSizeError && <div className="bg-error-100 w-full fixed top-0 z-50 text-center mx-auto px-10 py-4"><p className='font-lato text-base text-error-700 leading-6'>{fileSizeError}</p></div>}


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
                        <div className="md:w-fit flex flex-col md:flex-row items-center gap-x-8 mt-5">

                        <form onSubmit={handleUpload} className="w-full">
                            <div className="flex flex-col md:flex-row items-center gap-x-3 gap-y-4 mt-5 md:mt-0 w-full">

                                <div className="flex items-center">
                                    <img src={avatar} alt="User profile" className="w-32 rounded-full object-cover" />
                                </div>

                                <div className="flex flex-col mt-4 md:mt-0 w-full md:w-fit">
                                    <label htmlFor="userPhoto" className="rounded-lg border border-lightgray-800 text-center text-lightgray-800 font-os text-base px-4 py-3 cursor-pointer">
                                        Change Photo
                                    </label>
                                    <input type="file" id="userPhoto" accept="image/*" className="hidden" onChange={handleFileChange} />
                                </div>

                                <button type="submit" className="rounded-lg bg-primary-700 hover:bg-primary-800 text-lightgray-100 font-os text-base px-4 py-3 cursor-pointer w-full md:w-fit">
                                    Save Changes
                                </button>
                            </div>
                                
                            <div className="mt-4 md:mt-10">
                                <button type="submit" className="rounded-lg md:border md:border-error-700 text-center text-error-700 font-os text-base font-medium px-4 py-3 cursor-pointer w-full md:w-fit">
                                    Remove Photo
                                </button>
                            </div>
                        </form>

                        </div>

                        {/* Input fields */}
                        <form method="POST">
                            <div className="flex flex-col md:flex-row md:flex-wrap gap-x-5 gap-y-7 md:w-fit mt-10">
                                {/* First Name */}
                                <div className="">
                                    <label htmlFor="" className="font-os block text-base font-normal text-black-600 leading-6">First Name</label>
                                    <input type="text" value={userFirstName} onChange={(e) => setUserFirstName(e.target.value)} className="font-os block mt-3 w-full md:w-[380px] rounded-lg border border-lightgray-400 px-4 py-3 text-black-600 outline-primary-100 placeholder:text-black-100" placeholder='Jane' />
                                    {firstNameError && <p className='text-sm text-red-500 mt-1'>{firstNameError}</p>}
                                </div>

                                {/* Last Name */}
                                <div className="">
                                    <label htmlFor="" className="font-os block text-base font-normal text-black-600 leading-6">Last Name</label>
                                    <input type="text" value={userLastName} onChange={(e) => setUserLastName(e.target.value)} className="font-os block mt-3 w-full md:w-[380px] rounded-lg border border-lightgray-400 px-4 py-3 text-black-600 outline-primary-100 placeholder:text-black-100" placeholder='Doe' />
                                    {lastNameError && <p className='text-sm text-red-500 mt-1'>{lastNameError}</p>}
                                </div>

                                {/* Email Address */}
                                <div className="md:mt-0">
                                    <label htmlFor="" className="font-os block text-base font-normal text-black-600 leading-6">Email Address</label>
                                    <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="block mt-3 w-full md:w-[380px] rounded-lg border border-lightgray-400 px-4 py-3 text-black-600 outline-primary-100 placeholder:text-black-100" placeholder='jane.doe123@gmail.com' />
                                    {emailError && <p className='text-sm text-error-700 mt-1'>{emailError}</p>}   
                                </div>
                            </div>

                            {/* Save Changes Button */}
                            <div className="mt-10">
                                <button type="submit" disabled={loading} className="font-lato text-base bg-primary-700 hover:bg-primary-800 w-full md:w-fit text-center text-lightgray-100 rounded-lg px-16 py-3">{loading ? 'Saving...' : 'Save Changes'}</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Security section */}
                <div className="mt-20">
                    <h3 className="text-2xl font-sg font-bold text-black-500 leading-8">Security</h3>
                    <p className="text-[15px] w-[300px] md:w-full font-lato font-normal text-black-400 leading-normal me-auto mt-2">Update your security settings such as your password.</p>

                    {/* Change Password Form */}
                    <form method="POST" className="mt-8">
                        <div className=" flex flex-col md:flex-row md:flex-wrap gap-x-5 gap-y-7 md:w-fit">
                            {/* Current Password */}
                            <div className="">
                                <label htmlFor="current-password" className="font-os block text-base font-normal text-black-600 leading-6">Current Password</label>
                                <div className="relative flex items-center mt-3">
                                    <input type={showPassword ? 'text' : 'password'} id="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="font-os block w-full md:w-[380px] rounded-lg border border-lightgray-400 px-4 py-3 text-black-600 outline-primary-100 placeholder:text-black-100" placeholder='Current Password' />
                                    <button type='button' className='absolute text-base font-os right-2 md:right-0 px-4 py-3' onClick={handlePasswordVisibility}>
                                        {showPassword ? <img src={EyeOpen} alt="Eye Open" /> : <img src={EyeClosed} alt="Eye Closed" />}
                                    </button>
                                </div>
                                {currentPasswordError && <p className='text-sm text-error-700 mt-1'>{currentPasswordError}</p>}
                            </div>

                            {/* New Password */}
                            <div className="">
                                <label htmlFor="new-password" className="font-os block text-base font-normal text-black-600 leading-6">New Password</label>
                                <div className="relative flex items-center mt-3">
                                    <input type={showPassword ? 'text' : 'password'} id="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="font-os block w-full md:w-[380px] rounded-lg border border-lightgray-400 px-4 py-3 text-black-600 outline-primary-100 placeholder:text-black-100" placeholder='New Password' />
                                    <button type='button' className='absolute text-base font-os right-2 md:right-0 px-4 py-3' onClick={handlePasswordVisibility}>
                                        {showPassword ? <img src={EyeOpen} alt="Eye Open" /> : <img src={EyeClosed} alt="Eye Closed" />}
                                    </button>
                                </div>
                                {newPasswordError && <p className='text-sm text-error-700 mt-1'>{newPasswordError}</p>}
                            </div>

                            {/* Confirm New Password */}
                            <div className="">
                                <label htmlFor="confirm-new-password" className="font-os block text-base font-normal text-black-600 leading-6">Confirm New Password</label>
                                <div className="relative flex items-center mt-3">
                                    <input type={showPassword ? 'text' : 'password'} id="confirm-new-password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="font-os block w-full md:w-[380px] rounded-lg border border-lightgray-400 px-4 py-3 text-black-600 outline-primary-100 placeholder:text-black-100" placeholder='Confirm New Password' />
                                    <button type='button' className='absolute text-base font-os right-2 md:right-0 px-4 py-3' onClick={handlePasswordVisibility}>
                                        {showPassword ? <img src={EyeOpen} alt="Eye Open" /> : <img src={EyeClosed} alt="Eye Closed" />}
                                    </button>
                                </div>
                                {confirmNewPasswordError && <p className='text-sm text-error-700 mt-1'>{confirmNewPasswordError}</p>}
                            </div>
                        </div>

                        {/* Change Password Button */}
                        <div className="mt-10">
                            <button type="submit" disabled={loading} className="font-lato text-base bg-primary-700 hover:bg-primary-800 w-full md:w-fit text-center text-lightgray-100 rounded-lg px-16 py-3">{loading ? 'Saving...' : 'Change Password'}</button>
                        </div>
                    </form>

                    <div className="my-8"></div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
