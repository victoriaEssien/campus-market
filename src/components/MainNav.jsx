
// Libraries
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Link } from 'react-router-dom'

// Icons
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

// Assets
// import Logo from "../assets/images/logo.png"

function MainNav() {
    
    // const navigation = [
    //     {name: 'Home', href: '/'},
    //     {name: 'About', href: '#'},
    // ]

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className='bg-white'>
        <header className='inset-x-0 top-0 z-50'>
            <nav className='flex items-center justify-between p-4 lg:px-12' aria-label='Global'>
                <div className='flex lg:flex mr-8'>
                    <Link to="/" className='-m-1.5 p-1.5 flex items-center gap-x-2'>
                        {/* <img className='w-[35px]' src={Logo} alt="Logo"/> */}
                        <span className='font-sg font-medium text-xl text-gray-1100 leading-8'>Campus Market</span>
                    </Link>
                </div>
                <div className='flex lg:hidden'>
                    <button type='button' className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700' onClick={() => setMobileMenuOpen(true)}>
                        <span className='sr-only'>Open main menu</span>
                        <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                    </button>
                </div>
                {/* <div className='hidden lg:flex lg:gap-x-10 mx-auto'>
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className='text-[19px] font-ssp leading-6 text-[#003709] font-semibold'>{item.name}</a>
                    ))}
                </div> */}
                {/* <div className='hidden lg:flex lg:justify-end space-x-6'>
                <Link>
                    <button type='button' className='bg-[#00A41A] text-white font-semibold text-[19px] font-ssp rounded-[10px] px-[27px] py-[12px]'>Contact Us</button>
                </Link>
                <Link>
                    <button type='button' className='bg-primary-600 text-[#00A41A] font-semibold text-[19px] font-ssp border border-[#00A41A] rounded-[10px] px-[27px] py-[12px]'>Explore Artwork</button>
                </Link>
                </div> */}
            </nav>
            <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className='fixed inset-0 z-50' />
                <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white'>
                    <div className="flex items-center justify-between">
                        <a href="#" className='-m-1.5 p-5 flex items-center gap-x-2'>
                        {/* <img className='w-[35px]' src={Logo} alt="Logo"/> */}
                        <span className='font-sg font-medium text-xl text-gray-1100 leading-8'>Campus Market</span>
                        </a>
                        <button type='button' className='-m-2.5 rounded-md p-7 text-gray-700' onClick={() => setMobileMenuOpen(false)}>
                            <span className='sr-only'>Close menu</span>
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                        </button>
                    </div>
                    {/* <div className='mt-4 flow-root'>
                        <div className='-m-y-6 divide-y divide-gray-500/10'>
                            <div className='space-y-2'>
                                {navigation.map((item) => (
                                    <a key={item.name} href={item.href} className='-mx-3 block rounded-lg px-7 py-2 text-lg font-ssp font-semibold leading-7 text-[#003709] hover:bg-gray-50'>{item.name}
                                    </a>
                                ))}
                            </div>
                            <div className='py-6 px-4'>
                                <Link>
                                    <button type='button' className='text-center block font-ssp text-[19px] text-white bg-[#00A41A] rounded-[10px] px-7 py-4 mt-4 w-full'>Contact Us</button>
                                </Link>

                                <Link>
                                    <button type='button' className='text-center block font-ssp text-[19px] text-[#00A41A] border border-[#00A41A] rounded-[10px] px-7 py-4 mt-4 w-full'>Explore Artwork</button>
                                </Link>
                            </div>
                        </div>
                    </div> */}
                </Dialog.Panel>
            </Dialog>
        </header>
    </div>
  )
}

export default MainNav