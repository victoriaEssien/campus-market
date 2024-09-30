import React from 'react'

// Components
import AppNav from '../components/AppNav';

// Placeholder images
import ToteBag from "../assets/images/tote-bag.png";

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
          <div></div>
        </div>
      </div>

    </div>
  )
}

export default ProductDescription