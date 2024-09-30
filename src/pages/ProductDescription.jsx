import React from 'react'

// Components
import AppNav from '../components/AppNav';

// Placeholder images
import ToteBag from "../assets/images/tote-bag.png";

// React icons
import { FaRegHeart } from "react-icons/fa6"; // Favourite icon
import { FaStar } from "react-icons/fa"; // Star icon

function ProductDescription() {

  return (
    <div>
      <AppNav />

      <div className='mt-8 md:mx-8'>

        <div>

          <div>
            <img src={ ToteBag } alt='Image loading...' className='mx-auto md:mx-0' />
            <div className='flex my-3 justify-center'>
              <img src={ ToteBag } alt='Image loading...' className='w-12 mx-1' />
              <img src={ ToteBag } alt='Image loading...' className='w-12 mx-1' />
              <img src={ ToteBag } alt='Image loading...' className='w-12 mx-1' />
              <img src={ ToteBag } alt='Image loading...' className='w-12 mx-1' />
              <img src={ ToteBag } alt='Image loading...' className='w-12 mx-1' />
            </div>
          </div>

          <div className='mx-4 mt-8'>
            <p className='bg-blue-100 inline-block p-1 px-3 rounded text-xs'>JaneDeo shop</p>
            <div className='flex'>
              <h4 className='mt-3 text-xl'>5 Pairs Quality Cotton Ankle Socks - White&Black&Navy&Gray</h4>
              <FaRegHeart className='text-2xl cursor-pointer' />
            </div>
            <p className='my-3 text-green-600'>In stock</p>
            <h4 className='text-2xl font-normal'>₦4,500</h4>
            <hr className='my-3' />

            <p className='mt-1 font-thin'>Variation Available</p>

            <button className='p-2 border rounded my-3'>ONE SIZE FITS ALL</button>
          </div>

        </div>

      </div>

    </div>
  )
}

export default ProductDescription