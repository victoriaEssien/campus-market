import React from 'react'

const CartSkeleton = () => {
  return (
    <div className='max-w-3xl mx-auto px-4 py-8'>
      {/* Cart Items Section */}
      <div className='space-y-4'>
        {/* Cart Item */}
        <div className='flex items-center gap-4'>
          {/* Image */}
          <div className='w-20 h-20 bg-gray-200 rounded-lg animate-pulse' />

          {/* Details */}
          <div className='flex-1 space-y-2'>
            {/* Product name */}
            <div className='w-3/4 h-6 bg-gray-200 rounded-lg animate-pulse' />

            {/* Price */}
            <div className='w-16 h-6 bg-gray-200 rounded-lg animate-pulse' />

            {/* Quantity */}
            <div className='flex items-center gap-2'>
              <div className='w-10 h-8 bg-gray-200 rounded-lg animate-pulse' />
              <div className='w-10 h-8 bg-gray-200 rounded-lg animate-pulse' />
              <div className='w-10 h-8 bg-gray-200 rounded-lg animate-pulse' />
            </div>
          </div>

          {/* Remove button */}
          <div className='w-6 h-6 bg-gray-200 rounded-full animate-pulse' />
        </div>

        {/* Additional cart items */}
        <div className='flex items-center gap-4'>
          <div className='w-20 h-20 bg-gray-200 rounded-lg animate-pulse' />
          <div className='flex-1 space-y-2'>
            <div className='w-3/4 h-6 bg-gray-200 rounded-lg animate-pulse' />
            <div className='w-16 h-6 bg-gray-200 rounded-lg animate-pulse' />
            <div className='flex items-center gap-2'>
              <div className='w-10 h-8 bg-gray-200 rounded-lg animate-pulse' />
              <div className='w-10 h-8 bg-gray-200 rounded-lg animate-pulse' />
              <div className='w-10 h-8 bg-gray-200 rounded-lg animate-pulse' />
            </div>
          </div>
          <div className='w-6 h-6 bg-gray-200 rounded-full animate-pulse' />
        </div>
      </div>

    </div>
  )
}

export default CartSkeleton
