// Libraries
import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

// Icons
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

// Default Avatar
const defaultAvatar = 'https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg';

function AppNav() {
    const navigation = [
        { name: 'Home', href: '/home' },
        { name: 'Search', href: '/search' },
        { name: 'Cart', href: '/my-cart' },
        { name: 'Saved', href: '/saved' },
    ];

    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen((prevOpen) => !prevOpen);
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            axios.get('https://campus-market-api.onrender.com/profile/specific', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    const user = response.data;
                    setUserInfo({
                        username: `${user.firstname} ${user.lastname}`,
                        profilePicture: defaultAvatar, // Initially, no profile picture
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

    const handleLogout = () => {
        const token = Cookies.get('token');
        if (token) {
            axios.post('https://campus-market-api.onrender.com/user/logout', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    console.log('Successfully logged out:', response.data.msg);
                    Cookies.remove('token');
                    setUserInfo(null);
                    navigate('/login'); // Redirect to login page after logout
                })
                .catch(error => {
                    console.error('Error during logout: ', error);
                });
        }
    };


    return (
        <div className='bg-white'>
            <header className='inset-x-0 top-0 z-50'>
                <nav className='flex items-center justify-between p-4 lg:px-12 border-b border-primary-50' aria-label='Global'>
                    <div className='flex lg:flex mr-8'>
                        <Link to='/home' className='-m-1.5 p-1.5'>
                            <span className='font-os font-bold text-xl text-black-600'>Campus Market</span>
                        </Link>
                    </div>
                    <div className='flex lg:hidden'>
                        <button type='button' className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700' onClick={() => setMobileMenuOpen(true)}>
                            <span className='sr-only'>Open main menu</span>
                            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                        </button>
                    </div>
                    <div className='hidden lg:flex lg:gap-x-6'>
                        {navigation.map((item) => (
                            <Link key={item.name} to={item.href} className={`text-base font-os leading-6 ${location.pathname === item.href ? 'text-primary-600 font-semibold' : 'text-black-600 font-normal'} text-black-600'}`}>{item.name}</Link>
                        ))}
                    </div>
                    <div className='hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-3'>
                        <Link to="#" className='bg-[#FFF] border border-secondary-700 text-secondary-700 font-os rounded-lg px-5 py-2.5'>Sell Item</Link>
                        <div className="h-8 border-l-2 border-lightgray-300"></div>
                        {/* <div className="relative inline-block text-left">
                                <div>
                                    <button
                                        type="button"
                                        onClick={toggleDropdown}
                                        className="flex items-center space-x-2 focus:outline-none"
                                    >
                                    
                                        <img src={defaultAvatar} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
                                        <span className="text-black-600 text-base font-os font-medium">John Doe</span>
                                        <ChevronDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                    </button>
                                </div>
                                {dropdownOpen && (
                                    <div
                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu"
                                    >
                                        <div className="py-1">
                                            <Link to="/my-profile" className='block px-4 py-2 font-os text-sm font-medium text-black-600 hover:bg-gray-50'>My Profile</Link>
                                            <button type='button' onClick={handleLogout} className="block px-4 py-2 font-montserrat text-sm font-medium text-error-600 hover:bg-gray-50 w-full text-left" role="menuitem">
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                        </div> */}
                        {userInfo && (
                            <div className="relative inline-block text-left">
                                <div>
                                    <button
                                        type="button"
                                        onClick={toggleDropdown}
                                        className="flex items-center space-x-2 focus:outline-none"
                                    >
                                    
                                        <img src={userInfo.profilePicture} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
                                        <span className="text-black-600 text-base font-os font-medium">{userInfo.username}</span>
                                        <ChevronDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                    </button>
                                </div>
                                {dropdownOpen && (
                                    <div
                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu"
                                    >
                                        <div className="py-1">
                                            <Link to="/my-profile" className='block px-4 py-2 font-os text-sm font-medium text-black-600 hover:bg-gray-50'>My Profile</Link>
                                            <button type='button' onClick={handleLogout} className="block px-4 py-2 font-montserrat text-sm font-medium text-error-600 hover:bg-gray-50 w-full text-left" role="menuitem">
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </nav>
                <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className='fixed inset-0 z-50' />
                    <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white'>
                        <div className="flex items-center justify-between">
                            <a href="#" className='-m-1.5 p-5'>
                                <span className='font-os font-bold text-xl text-black-600'>Campus Market</span>
                            </a>
                            <button type='button' className='-m-2.5 rounded-md p-7 text-black-700' onClick={() => setMobileMenuOpen(false)}>
                                <span className='sr-only'>Close menu</span>
                                <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                            </button>
                        </div>
                        <div className='mt-4 flow-root'>
                            <div className='-m-y-6 divide-y divide-gray-500/10'>
                                <div className='space-y-2'>
                                    {navigation.map((item) => (
                                        <Link key={item.name} to={item.href} className={`-mx-3 block rounded-lg px-7 py-2 text-base font-os leading-7 hover:bg-gray-50 ${location.pathname === item.href ? 'text-primary-600 font-semibold' : 'text-black-600 font-normal'}`}>{item.name}
                                        </Link>
                                    ))}
                                </div> 
                                
                                <div className='flex flex-col gap-y-8 py-6 px-4 text-center'>
                                <Link to="#" className='bg-[#FFF] border border-secondary-700 text-secondary-700 font-os rounded-lg px-5 py-3'>Sell Item</Link>

                                    {userInfo && (
                                        <div className="relative inline-block mx-auto text-left w-fit">
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={toggleDropdown}
                                                    className="flex items-center space-x-2 focus:outline-none"
                                                >
                                                    {userInfo.profilePicture && (
                                                        <img src={userInfo.profilePicture} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
                                                    )}
                                                    <span className="text-black-600 text-base font-os font-medium">{userInfo.username}</span>
                                                    <ChevronDownIcon className="h-5 w-5 text-black-500" aria-hidden="true" />
                                                </button>
                                            </div>
                                            {dropdownOpen && (
                                                <div
                                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                    role="menu"
                                                    aria-orientation="vertical"
                                                    aria-labelledby="user-menu"
                                                >
                                                    <div className="py-1">
                                                        <Link to="/my-profile" className='block px-4 py-2 font-os text-sm font-medium text-black-600 hover:bg-gray-50'>My Profile</Link>
                                                        <button type='button' onClick={handleLogout} className="block px-4 py-2 font-montserrat text-sm font-medium text-error-600 hover:bg-gray-50 w-full text-left" role="menuitem">
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
                    </Dialog.Panel>
                </Dialog>
            </header>
        </div>
    );
}

export default AppNav;
