import React from 'react'

// Components
import AppNav from '../components/AppNav';

// Components
import { SpecificProductDescriptionComponent } from '../components/Shop/Products';

function ProductDescription() {

  return (
    <div>
      <AppNav />

      <div className='mt-8 md:mx-8'>

        <SpecificProductDescriptionComponent />
        

      </div>

    </div>
  )
}

export default ProductDescription