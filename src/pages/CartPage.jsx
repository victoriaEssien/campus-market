import React, { useEffect, useState } from 'react'
import AppNav from '../components/AppNav'
import CartShoe from '../assets/images/cart-shoe.png'
import Cookies from 'js-cookie'

import AddIcon from '../assets/icons/add-icon.svg'
import SubtractIcon from '../assets/icons/subtract-icon.svg'
import DeleteIcon from '../assets/icons/delete-icon.svg'
import { getCart } from '../api-call/GetCart'
import CartSkeleton from '../components/skeletons-ui/CartSkeleton'
import { UpdateCartNumber } from '../api-call/UpdateCartNumber'

function CartPage() {
  const [getCartItemsLoading, setGetCartItemsLoading] = useState(true)
  const [cartItems, setCartItems] = useState([])
  const [getCartError, setGetCartError] = useState(null)
  const [currentCartItemId, setCurrentCartItemId] = useState(null)
  const [removeCartItemError, setRemoveCartItemError] = useState(null)
  const [totalCartPrice, setTotalCartPrice] = useState(null)
  const [updateCartItemLoading, setUpdateCartItemLoading] = useState(false)
  const [updateCartItemNumberError, setUpdateCartItemNumberError] = useState(null)

  // Handle Get Cart
  const callGetCart = async () => {
    setUpdateCartItemLoading(false)
    const theCartItems = await getCart(Cookies.get('token'))
    if (theCartItems) {
      setCartItems(theCartItems)
      setGetCartItemsLoading(false)
      calculateTotalPrice(theCartItems)
    } else {
      setGetCartItemsLoading(false)
      console.log(theCartItems)
      setGetCartError('something went wrong. please try again')
    }
  }

  // handle remove from cart
  const handleRemoveCartItem = async id => {
    setCurrentCartItemId(id)
    const requestBody = {
      id: id
    }
    try {
      const response = await fetch(
        `https://campus-market-api.onrender.com/cart/remove`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        }
      )

      const jsonResponse = await response.json()
      if (response.ok) {
        window.location.reload()
      } else {
        setCurrentCartItemId(null)
        setRemoveCartItemError('something went wrong. Please try again')
        setTimeout(() => {
          setRemoveCartItemError(null)
        }, 3000)
      }
      console.log(jsonResponse)
    } catch (error) {
      setCurrentCartItemId(null)
      setRemoveCartItemError('something went wrong. Please try again')
      setTimeout(() => {
        setRemoveCartItemError(null)
      }, 3000)
      console.log(error)
    }
  }

  const calculateTotalPrice = (theCartItems) => {
    let total = 0;
    theCartItems.map((item) => {
      total += (item.productId.price) * item.num;
    })
    console.log(total)
    setTotalCartPrice(total)
  }

  const handleAdd = async (id) => {
    setUpdateCartItemLoading(true)
    try {
      const incrementCartItemNumber = await UpdateCartNumber(Cookies.get('token'), id, 'inc')
      console.log(incrementCartItemNumber)
      if (incrementCartItemNumber) {
        window.location.reload()
      } else {
        setUpdateCartItemLoading(false)
        setUpdateCartItemNumberError('something went wrong. please try again')
        setTimeout(() => {
          setUpdateCartItemNumberError(null)
        }, 3000);
      }
    } catch (error) {
      setUpdateCartItemLoading(false)
      setUpdateCartItemNumberError('something went wrong. please try again')
      setTimeout(() => {
        setUpdateCartItemNumberError(null)
      }, 3000);
      console.log(error)
    }
  }

  const handleSubtract = async (id) => {
    setUpdateCartItemLoading(true)
    try {
      const decrementCartItemNumber = await UpdateCartNumber(Cookies.get('token'), id, 'dec')
      if (decrementCartItemNumber) {
        // callGetCart()
        window.location.reload()
      } else {
        setUpdateCartItemLoading(false)
        setUpdateCartItemNumberError('something went wrong. please try again')
        setTimeout(() => {
          setUpdateCartItemNumberError(null)
        }, 3000);
      }
    } catch (error) {
      setUpdateCartItemLoading(false)
      setUpdateCartItemNumberError('something went wrong. please try again')
      setTimeout(() => {
        setUpdateCartItemNumberError(null)
      }, 3000);
      console.log(error)
    }
  }


  useEffect(() => {
    callGetCart()
  }, [])

  // const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <AppNav />
      <div className='mx-4 md:mx-14 my-14'>
        {/* Cart and Summary */}
        <div className='flex flex-col-reverse md:flex-row items-start justify-between'>
          {/* Cart */}
          <div className='mt-14 md:mt-0'>
            <h2 className='font-os text-2xl text-black-600 font-semibold'>
              Cart ({cartItems.length})
            </h2>

            {getCartItemsLoading && <CartSkeleton />}

            {/* Cart items */}
            {cartItems.map(item => (
              <div key={item.id} className='mt-10'>
                <div className='flex flex-col md:flex-row items-start gap-x-40'>
                  <div className='flex items-start space-x-5'>
                    <img
                      className='size-20 rounded-md'
                      src={item.productId.images[0].image}
                      alt={item.name}
                    />
                    <div className='flex flex-col gap-y-3'>
                      <h4 className='font-os text-[15px] text-black-600'>
                        {item.productId.name}
                      </h4>
                      <p className='font-os text-[15px] text-black-600'>
                        Size: {item.size}
                      </p>
                      <p className='font-os font-bold text-[15px] text-black-600'>
                        ₦{item.productId.price}
                      </p>
                    </div>
                  </div>

                  {/* Add or remove buttons */}

                  <div className='flex items-center space-x-4 my-6 md:mt-0'>
                    {console.log(item)}
                    <button
                      disabled={item.num <= 1 || updateCartItemLoading}
                      type='button'
                      className={`bg-secondary-600  rounded p-1 disabled:cursor-not-allowed disabled:bg-accent-600`}
                      onClick={() => handleSubtract(item._id)}
                    >
                      <img
                        src={SubtractIcon}
                        alt='Subtract'
                        className='h-6 w-6'
                      />
                    </button>

                    <p className='font-os text-base font-medium text-black-600'>
                      {item.num}
                    </p>

                    <button
                      disabled={item.num >= item.productId.status || updateCartItemLoading}
                      type='button'
                      className={`bg-secondary-600 rounded p-1 disabled:cursor-not-allowed disabled:bg-accent-600`}
                      onClick={() => handleAdd(item._id)}
                    >
                      <img src={AddIcon} alt='Add' className='h-6 w-6' />
                    </button>
                  </div>
                </div>
                <button
                  type='button'
                  className='flex items-center space-x-1 mt-6'
                  onClick={() => handleRemoveCartItem(item._id)}
                >
                  {currentCartItemId == item._id ? (
                    ''
                  ) : (
                    <img src={DeleteIcon} alt='Delete' className='h-5 w-5' />
                  )}
                  <p
                    className={`text-[#D40000] font-os font-medium text-[15px] ${currentCartItemId == item._id ? 'loader' : ''
                      }`}
                  >
                    {currentCartItemId == item._id ? '' : 'Remove Item'}
                  </p>
                </button>
                <p className='text-sm text-red-500'>{removeCartItemError}</p>
              </div>
            ))}

            <hr className='mt-5' />
          </div>

          <div className='text-slate-500 text-center'>
            {getCartError && getCartError}
            {updateCartItemNumberError && updateCartItemNumberError}
          </div>

          {/* Summary */}
          <div className='border border-lightgray-300 w-full md:w-[322px] rounded-md p-4'>
            <h4 className='font-os text-lg text-black-600 text-left font-semibold'>
              Cart Summary
            </h4>
            <hr className='mt-2' />
            <div className='flex justify-between items-center mt-6'>
              <p className='font-os text-base font-medium text-black-600'>
                Subtotal:
              </p>
              <p className='font-os font-bold text-xl text-primary-600'>
                ₦{totalCartPrice}
              </p>
            </div>

            <div className='py-6'>
              <form>
                <div>
                  <label>select a pickup location</label>
                  <select className='w-full my-2 rounded-lg'>
                    <option value={'football field'}>football field</option>
                    <option value={'Library'}>Library</option>
                    <option value={'Clinic'}>Clinic</option>
                    <option value={'Senate building'}>Senate building</option>
                    <option value={'Gamza'}>Gamza</option>
                    <option value={'Big cafetaria'}>Big cafetaria</option>
                    <option value={'CMPLH'}>CMPLH</option>
                  </select>
                </div>
              </form>
            </div>

            <button
              type='button'
              className='mt-8 w-full text-center bg-primary-600 text-[#FFF] px-3 py-2.5 rounded-lg'
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
