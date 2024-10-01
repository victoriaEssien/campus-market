import React from 'react'

// Components
import AppNav from '../components/AppNav';

// Components
import { SpecificProductDescriptionComponent } from '../components/Shop/Products';
import { ProductDetailsComponent } from '../components/Shop/Products/product-details.component';

function ProductDescription() {

  return (
    <div>
      <AppNav />

      <div className='mt-8 md:mx-8 pb-12'>

        <SpecificProductDescriptionComponent />
        <ProductDetailsComponent />

      </div>

    </div>
  )
}

export default ProductDescription