import React, { useEffect, useState } from 'react'

// Components
import AppNav from '../components/AppNav';

// Components
import { SpecificProductDescriptionComponent } from '../components/Shop/Products';
import { ProductDetailsComponent } from '../components/Shop/Products/product-details.component';
import { MoreLikeThisComponent } from '../components/Shop/Products/more-like-this.component';
import { ProductReviewComponent } from '../components/Shop/Products/Reviews/product-review.component';
import { useCategoryStore } from '../stores/category-store';
import ProductDetailsSkeleton from '../components/skeletons-ui/ProductDetailsSkeleton';

function ProductDescription() {
  // Global states
  const selectedProductId = useCategoryStore((state) => state.selectedProductId);
  // local states
  const [productDetails, setProductDetails] = useState([])
  // Error states
  const [error, setError] = useState(null)
  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // fetch product details
  const getProducts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://campus-market-api.onrender.com/products/all?product_id=${selectedProductId}`)
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setProductDetails(data.data)
        setIsLoading(false)
        return;
      }
      setError('something went wrong. please try again');
      setIsLoading(false)
      return;
    } catch (error) {
      console.log(error)
      setError('something went wrong. please try again');
      setIsLoading(false)
      return;
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div>
      {console.log(selectedProductId)}
      <AppNav />

      <div className='mt-8 md:mx-8 pb-12'>
        {isLoading ?
          <ProductDetailsSkeleton />
          :
          error ?
            <div className='flex justify-center items-center'><p className='font-lato font-normal text-black-400 leading-normal'>{error}</p></div>
            :
            productDetails.length > 0 ?
              productDetails.map((element, index) => (
                <div key={index}>
                  <SpecificProductDescriptionComponent product={element} />
                  <ProductDetailsComponent product={element} />
                </div>
              ))
              :
              <div className='flex justify-center items-center'><p className='font-lato font-normal text-black-400 leading-normal'>oh wow. No information for this product. Please try again</p></div>
        }


        <MoreLikeThisComponent title="You May Also Like" />
        <MoreLikeThisComponent title="More From This Seller" />
        <ProductReviewComponent />

      </div>

    </div>
  )
}

export default ProductDescription