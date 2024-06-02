
// Libraries
import { Link } from 'react-router-dom'

// Components
import MainNav from '../components/MainNav'

// Assets
import HeroImg from '../assets/images/hero-img.svg'

function HeroSection() {
  return (
    <div>
        <MainNav />
        <div className='px-4 md:px-12 flex flex-col md:flex-row'>
            <div className=''>
                <h1 className='text-4xl md:text-[54px] font-os font-bold text-gray-600 mt-4 md:mt-14 w-full md:w-[590px] leading-normal md:leading-snug'>Discover the <span className='text-accent-600'>best deals on your campus</span> in seconds!</h1>
                <p className='mt-6 md:mt-3 font-os font-normal w-full md:w-[516px] leading-relaxed text-lg text-gray-500'>Shop items from fellow students and enjoy hassle-free transactions. Find everything from accessories to gadgets, all within your university community.</p>
                <div className='mt-8 md:mt-6'>
                <Link to="/signup">
                  <button type='button' className='bg-primary-700 rounded-[10px] text-center block md:inline font-lato text-white text-lg font-normal w-full md:w-[279px] px-[30px] py-[14px] hover:bg-primary-800'>Start Shopping Now!</button>
                </Link>
                {/* <Link to='/login'>
                  <button type='button' className='border border-primary-600 rounded-[10px] text-center block md:inline font-lato text-primary-600 text-[18px] font-normal w-full md:w-[190px] px-[30px] py-[14px] mt-4'>Review your CV</button>
                </Link> */}
                </div>
            </div>
            <div className='w-12/12 md:w-12/12 md:ml-16 mt-8 md:mt-0 flex self-center'>
                <img className='w-full' src={HeroImg} alt="" />
            </div>
        </div>
    </div>
  )
}

export default HeroSection