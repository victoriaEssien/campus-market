
// Libraries
import { useState, useEffect, Fragment } from 'react';
import { Dialog as Dialogger, Transition } from '@headlessui/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

// Icons
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

// Material UI
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

// Dialog Component
import { PopupMessageComponent } from './Shop/Seller/popup-message.component';
import { useUserStore } from '../stores/user-store';
import { useCartStore } from '../stores/cart-store';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));



function AppNav() {
    const navigation = [
        { name: 'Home', href: '/home' },
        { name: 'Search', href: '/search' },
        { name: 'Cart', href: '/my-cart' },
        { name: 'Saved', href: '/saved' },
        { name: 'My Orders', href: '/orders' },
        { name: 'My Shop', href: '/my-shop' },
    ];

    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showUploadProduct, setShowUploadProduct] = useState(false);
    const [showRegisterSeller, setShowRegisterSeller] = useState(false);

    // Global states
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const clearUser = useUserStore((state) => state.clearUser);
    // global cart state
    const setCartItems = useCartStore((state) => state.setCartItems)

    const handleClickOpen = (userInfo, e) => {
        e.preventDefault()
        if (userInfo.isSeller) {
            setShowUploadProduct(true);
        } else {
            setShowRegisterSeller(true);
            navigate('/seller-registration')
        }
    };
    const handleCloseUploadProduct = () => setShowUploadProduct(false);
    const handleCloseRegisterSeller = () => setShowRegisterSeller(false);

    const toggleDropdown = () => {
        setDropdownOpen((prevOpen) => !prevOpen);
    };

    useEffect(() => {
        const token = Cookies.get('token');
        // console.log(token)
        if (token) {
            axios.get('https://campus-market-api.onrender.com/profile/specific', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    const user = response.data;

                    // add user info to zustand store. 
                    setUser(user);

                    setUserInfo({
                        username: `${user.firstname} ${user.lastname}`,
                        profilePicture: `${user.avatar}`,
                        isSeller: user.seller,
                    });

                    // Fetch the avatar
                    // return axios.get('https://campus-market-api.onrender.com/profile/avatar', {
                    //     headers: {
                    //         'Authorization': `Bearer ${token}`,
                    //     },
                    // });
                })
                // .then(response => {
                //     const avatarUri = response.data.uri;
                //     setUserInfo(prevState => ({
                //         ...prevState,
                //         profilePicture: avatarUri,
                //     }));
                // })
                .catch(error => {
                    console.error('Error fetching user info: ', error);
                });
        }
    }, []);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    // Handle Sign Out function
    const handleSignOut = () => {
        Cookies.remove('token');
        clearUser()
        navigate('/login')
    }


    return (
        <>
            <div className='top-0 sticky bg-white shadow w-full'>
                <header className='top-0 z-50 inset-x-0'>
                    <nav className='flex justify-between items-center p-4 lg:px-12 border-primary-50 border-b' aria-label='Global'>
                        <div className='flex lg:flex mr-8'>
                            <Link to='/home' className='-m-1.5 p-1.5'>
                                <span className='font-os font-bold text-black-600 text-xl'>Campus Market</span>
                            </Link>
                        </div>
                        <div className='lg:hidden flex'>
                            <button type='button' className='inline-flex justify-center items-center -m-2.5 p-2.5 rounded-md text-gray-700' onClick={() => setMobileMenuOpen(true)}>
                                <span className='sr-only'>Open main menu</span>
                                <Bars3Icon className='w-6 h-6' aria-hidden='true' />
                            </button>
                        </div>
                        <div className='hidden lg:flex lg:gap-x-6'>
                            {navigation.map((item) => (
                                <Link key={item.name} to={item.href} className={`text-base font-os leading-6 ${location.pathname === item.href ? 'text-primary-600 font-semibold' : 'text-black-600 font-normal'} text-black-600'}`}>{item.name}</Link>
                            ))}
                        </div>
                        <div className='hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-3'>
                            <Link
                                to=""
                                className='bg-[#FFF] hover:bg-secondary-700 px-5 py-3 border border-secondary-700 rounded-lg font-os text-secondary-700 hover:text-white'
                                onClick={(e) => handleClickOpen(userInfo, e)}
                            >
                                Sell Item
                            </Link>
                            <div className="border-l-2 border-lightgray-300 h-8" />

                            {showUploadProduct && <PopupMessageComponent isOpen={showUploadProduct} handleClose={handleCloseUploadProduct} />}


                            {/* <div className="inline-block relative text-left">
                                    <div>
                                        <button
                                            type="button"
                                            onClick={toggleDropdown}
                                            className="flex items-center space-x-2 focus:outline-none"
                                        >
                                        
                                            <img src={defaultAvatar} alt="Profile" className="rounded-full w-8 h-8 object-cover" />
                                            <span className="font-os font-medium text-black-600 text-base">John Doe</span>
                                            <ChevronDownIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
                                        </button>
                                    </div>
                                    {dropdownOpen && (
                                        <div
                                            className="right-0 absolute bg-white ring-opacity-5 shadow-md mt-2 rounded-md focus:outline-none ring-1 ring-black w-48 origin-top-right"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="user-menu"
                                        >
                                            <div className="py-1">
                                                <Link to="/my-profile" className='block hover:bg-gray-50 px-4 py-2 font-os font-medium text-black-600 text-sm'>My Profile</Link>
                                                <button type='button' onClick={handleLogout} className="block hover:bg-gray-50 px-4 py-2 w-full font-montserrat font-medium text-error-600 text-sm text-left" role="menuitem">
                                                    Sign out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                            </div> */}
                            {userInfo && (
                                <div className="inline-block relative text-left">
                                    <div>
                                        <button
                                            type="button"
                                            onClick={toggleDropdown}
                                            className="flex items-center space-x-2 focus:outline-none"
                                        >

                                            <img src={userInfo.profilePicture} alt="Profile" className="rounded-full w-8 h-8 object-cover" />
                                            <span className="font-os font-medium text-black-600 text-base">{userInfo.username}</span>
                                            <ChevronDownIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
                                        </button>
                                    </div>
                                    {dropdownOpen && (
                                        <div
                                            className="right-0 absolute bg-white ring-opacity-5 shadow-md mt-2 rounded-md focus:outline-none ring-1 ring-black w-48 origin-top-right"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="user-menu"
                                        >
                                            <div className="py-1">
                                                <Link to="/my-profile" className='block hover:bg-gray-50 px-4 py-2 font-os font-medium text-black-600 text-sm'>My Profile</Link>
                                                <button type='button' onClick={handleModalOpen} className="block hover:bg-gray-50 px-4 py-2 w-full font-montserrat font-medium text-error-600 text-sm text-left" role="menuitem">
                                                    Sign out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </nav>
                    <Dialogger as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                        <div className='z-50 fixed inset-0' />
                        <Dialogger.Panel className='right-0 z-50 fixed inset-y-0 bg-white w-full overflow-y-auto'>
                            <div className="flex justify-between items-center">
                                <a href="#" className='-m-1.5 p-5'>
                                    <span className='font-os font-bold text-black-600 text-xl'>Campus Market</span>
                                </a>
                                <button type='button' className='-m-2.5 p-7 rounded-md text-black-700' onClick={() => setMobileMenuOpen(false)}>
                                    <span className='sr-only'>Close menu</span>
                                    <XMarkIcon className='w-6 h-6' aria-hidden='true' />
                                </button>
                            </div>
                            <div className='flow-root mt-4'>
                                <div className='-m-y-6 divide-y divide-gray-500/10'>
                                    <div className='space-y-2'>
                                        {navigation.map((item) => (
                                            <Link key={item.name} to={item.href} className={`-mx-3 block rounded-lg px-7 py-2 text-base font-os leading-7 hover:bg-gray-50 ${location.pathname === item.href ? 'text-primary-600 font-semibold' : 'text-black-600 font-normal'}`}>{item.name}
                                            </Link>
                                        ))}
                                    </div>

                                    <div className='flex flex-col gap-y-8 px-4 py-6 text-center'>
                                        <Link
                                            to="#"
                                            className='bg-[#FFF] hover:bg-secondary-700 px-5 py-3 border border-secondary-700 rounded-lg font-os text-secondary-700 hover:text-white'
                                            onClick={(e) => handleClickOpen(userInfo, e)}
                                        >
                                            Sell Item
                                        </Link>

                                        {userInfo && (
                                            <div className="inline-block relative mx-auto w-fit text-left">
                                                <div>
                                                    <button
                                                        type="button"
                                                        onClick={toggleDropdown}
                                                        className="flex items-center space-x-2 focus:outline-none"
                                                    >
                                                        {userInfo.profilePicture && (
                                                            <img src={userInfo.profilePicture} alt="Profile" className="rounded-full w-8 h-8 object-cover" />
                                                        )}
                                                        <span className="font-os font-medium text-black-600 text-base">{userInfo.username}</span>
                                                        <ChevronDownIcon className="w-5 h-5 text-black-500" aria-hidden="true" />
                                                    </button>
                                                </div>
                                                {dropdownOpen && (
                                                    <div
                                                        className="right-0 absolute bg-white ring-opacity-5 shadow-lg mt-2 rounded-md focus:outline-none ring-1 ring-black w-48 origin-top-right"
                                                        role="menu"
                                                        aria-orientation="vertical"
                                                        aria-labelledby="user-menu"
                                                    >
                                                        <div className="py-1">
                                                            <Link to="/my-profile" className='block hover:bg-gray-50 px-4 py-2 font-os font-medium text-black-600 text-sm'>My Profile</Link>
                                                            <button type='button' onClick={handleModalOpen} className="block hover:bg-gray-50 px-4 py-2 w-full font-montserrat font-medium text-error-600 text-sm text-left" role="menuitem">
                                                                Sign out
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Dialogger.Panel>
                    </Dialogger>
                </header>

                {/* Modal */}
                <Transition appear show={isModalOpen} as={Fragment}>
                    <Dialogger as="div" className="z-50 relative" onClose={handleModalClose}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black-1000 bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex justify-center items-center p-4 min-h-full text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialogger.Panel className="bg-lightgray-100 shadow-xl p-6 rounded-lg w-full max-w-md overflow-hidden text-left align-middle transition-all transform">
                                        <div className="flex justify-end">
                                            <button className="hover:bg-gray-200 p-1 rounded-full" onClick={handleModalClose}>
                                                <XMarkIcon className="w-6 h-6 text-primary-500" />
                                            </button>
                                        </div>
                                        <Dialogger.Title as="h3" className="mt-4 font-lora font-bold text-black-600 text-2xl leading-6">
                                            Log out of Campus Market?
                                        </Dialogger.Title>
                                        <div className="mt-3">
                                            <p className="w-11/12 md:w-10/12 text-[15px] text-black-400 leading-normal md:leading-relaxed">
                                                You can always log back in at any time.
                                            </p>
                                        </div>

                                        <div className="flex md:flex-row flex-col md:justify-end gap-y-4 md:space-x-4 mt-10">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center bg-lightgray-100 px-8 py-3 border border-primary-600 rounded-md font-os font-medium text-primary-600 text-sm"
                                                onClick={handleModalClose}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center bg-primary-600 px-8 py-3 rounded-md font-os font-medium text-lightgray-100 text-sm"
                                                onClick={handleSignOut}
                                            >
                                                Log Out
                                            </button>
                                        </div>
                                    </Dialogger.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialogger>
                </Transition>
            </div>

            {/* Added a spacer in to the header component */}
            <div className='my-20'></div>
        </>
    );
}

export default AppNav;
