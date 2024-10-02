import React from 'react'

// Components
import AppNav from '../components/AppNav';

// Components
import { SpecificProductDescriptionComponent } from '../components/Shop/Products';
import { ProductDetailsComponent } from '../components/Shop/Products/product-details.component';
import { MoreLikeThisComponent } from '../components/Shop/Products/more-like-this.component';

function ProductDescription() {

  return (
    <div>
      <AppNav />

      <div className='mt-8 md:mx-8 pb-12'>

        <SpecificProductDescriptionComponent />
        <ProductDetailsComponent />
        <MoreLikeThisComponent title="You May Also Like" />
        <MoreLikeThisComponent title="More From This Seller" />

      </div>

    </div>
  )
}

export default ProductDescription