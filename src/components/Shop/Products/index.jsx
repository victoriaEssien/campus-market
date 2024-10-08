

// Placeholder images
import ToteBag from "../../../assets/images/tote-bag.png";

// React icons
import { FaRegHeart } from "react-icons/fa6"; // Favourite icon
import { FaStar } from "react-icons/fa"; // Star icon

export const SpecificProductDescriptionComponent = () => {

    return (
        <>
            <div className="md:flex">

                <div className="md:pr-16 md:pt-4">
                    <img src={ ToteBag } alt='Image loading...' className='rounded-xl mx-auto md:mx-0 md:w-80 md:h-80' />
                    <div className='flex my-3 justify-center'>
                        <img src={ ToteBag } alt='Image loading...' className='rounded-lg w-12 mx-1' />
                        <img src={ ToteBag } alt='Image loading...' className='rounded-lg w-12 mx-1' />
                        <img src={ ToteBag } alt='Image loading...' className='rounded-lg w-12 mx-1' />
                        <img src={ ToteBag } alt='Image loading...' className='rounded-lg w-12 mx-1' />
                        <img src={ ToteBag } alt='Image loading...' className='rounded-lg w-12 mx-1' />
                    </div>
                    </div>

                    <div className='mx-4 mt-8 md:grow'>
                    <p className='bg-blue-100 inline-block p-1 px-3 rounded text-xs'>JaneDeo shop</p>
                    <div className='flex justify-between'>
                        <h4 className='mt-3 text-xl'>5 Pairs Quality Cotton Ankle Socks - White&Black&Navy&Gray</h4>
                        <FaRegHeart className='text-2xl cursor-pointer' />
                    </div>
                    <p className='my-3 text-green-600'>In stock</p>
                    <h4 className='text-2xl font-normal'>₦4,500</h4>
                    <hr className='my-3' />

                    <p className='mt-1 font-thin text-sm'>Variation Available</p>

                    <button className='p-2 border text-xs rounded my-3 border-secondary-700'>ONE SIZE FITS ALL</button>

                    <div className='flex text-base my-2' style={{ color: "#497492" }}>
                        <p>4.9</p>
                        <FaStar className='mx-2 mt-1 text-orange-400' />
                        <p>(30 reviews)</p>
                    </div>

                    <div className="text-center md:text-left">
                        <button className='px-24 md:px-14 md:py-3 hover:opacity-80 cursor-pointer py-4 btn_bg mt-3 outline-none border-none rounded-lg text-base text-white'>
                            Add to Cart
                        </button>
                    </div>
                </div>

            </div>
            <hr className='my-7' />
        </>
    )
}
