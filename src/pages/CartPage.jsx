import React, { useEffect, useState } from 'react'
import AppNav from '../components/AppNav'
import Cookies from 'js-cookie'
import AddIcon from '../assets/icons/add-icon.svg'
import SubtractIcon from '../assets/icons/subtract-icon.svg'
import DeleteIcon from '../assets/icons/delete-icon.svg'
import { getCart } from '../api-call/GetCart'
import CartSkeleton from '../components/skeletons-ui/CartSkeleton'
import { UpdateCartNumber } from '../api-call/UpdateCartNumber'
import Paystack from '@paystack/inline-js';
import { useUserStore } from '../stores/user-store'
import { Link, useNavigate } from "react-router-dom";
import VerifiedPopup from '../components/payment/VerifiedPopup'
import ErrorPopUp from '../components/payment/ErrorPopup'
import VerifyPopup from '../components/payment/VerifyPopup'



function CartPage() {
  const [getCartItemsLoading, setGetCartItemsLoading] = useState(true)
  const [cartItems, setCartItems] = useState([])
  const [getCartError, setGetCartError] = useState(null)
  const [currentCartItemId, setCurrentCartItemId] = useState(null)
  const [removeCartItemError, setRemoveCartItemError] = useState(null)
  const [totalCartPrice, setTotalCartPrice] = useState(null)
  const [updateCartItemLoading, setUpdateCartItemLoading] = useState(false)
  const [updateCartItemNumberError, setUpdateCartItemNumberError] = useState(null)
  //
  const [transactionRef, setTransactionRef] = useState(null);
  //pickup location
  const [pickupLocation, setPickUpLocation] = useState(null)
  // handle payment popups
  const [showVerifyingPopUp, setShowVerifyingPopUp] = useState(false)
  const [showVerifiedPopUp, setshowVerifiedPopUp] = useState(false)
  const [showErrorPopUp, setShowErrorPopUp] = useState(false)
  const [errorPopUpMessage, setErrorPopUpMessage] = useState(null)

  //global states
  const selectedUser = useUserStore((state) => state.user);


  const popup = new Paystack()
  const navigate = useNavigate();


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

    setTotalCartPrice(total)
  }

  const handleAdd = async (id) => {
    setUpdateCartItemLoading(true)
    try {
      const incrementCartItemNumber = await UpdateCartNumber(Cookies.get('token'), id, 'inc')

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


  // PAYMENT APIs
  const handleMakePayment = (e) => {
    e.preventDefault()

    popup.newTransaction({
      key: 'pk_test_270f2e657ce9444f10ed0bc75ced8e2ce4a8ed7b',
      email: selectedUser.email,
      amount: totalCartPrice * 100,
      onSuccess: (transaction) => {
        setShowVerifyingPopUp(true)
        setTransactionRef(transaction.trxref)
        verifyPayments(transaction.trxref)
      },
      onLoad: (response) => {
        console.log("onLoad: ", response);
      },
      onCancel: () => {
        setErrorPopUpMessage('You cancelled the Payment Process')
        setShowErrorPopUp(true)
      },
      onError: (error) => {
        console.log(error)
        setErrorPopUpMessage('An error eccoured')
        setShowErrorPopUp(true)
      }
    })

  }

  // verify payments
  const verifyPayments = async (transactionRef) => {

    // add the card ids to an array
    const cartIds = []
    cartItems.map((item, index) => {
      cartIds.push(item._id)
    })

    const requestBody = {
      ids: cartIds,
      referenceId: transactionRef
    }

    try {
      const response = await fetch(
        `https://campus-market-api.onrender.com/order/create`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        }
      )

      const jsonResponse = await response.json()
      if (jsonResponse?.error) {
        setErrorPopUpMessage(jsonResponse.error)
        setShowErrorPopUp(true)
        return
      }
      if (jsonResponse?.transaction?.status == 'success') {
        setShowVerifyingPopUp(false)
        setshowVerifiedPopUp(true)
        setTimeout(() => {
          navigate('/orders')
        }, 1000);
        return
      }
      console.log(jsonResponse)

    } catch (error) {
      setErrorPopUpMessage(error)
      setShowErrorPopUp(true)
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
        <div className='flex md:flex-row flex-col-reverse justify-between items-start'>
          {/* Cart */}
          <div className='mt-14 md:mt-0'>
            <h2 className='font-os font-semibold text-black-600 text-2xl'>
              Cart ({cartItems.length})
            </h2>

            {getCartItemsLoading && <CartSkeleton />}

            {/* Cart items */}
            {cartItems.map(item => (
              <div key={item.id} className='mt-10'>
                <div className='flex md:flex-row flex-col items-start gap-x-40'>
                  <div className='flex items-start space-x-5'>
                    <img
                      className='rounded-md size-20'
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
                    <button
                      disabled={item.num <= 1 || updateCartItemLoading}
                      type='button'
                      className={`bg-secondary-600  rounded p-1 disabled:cursor-not-allowed disabled:bg-accent-600`}
                      onClick={() => handleSubtract(item._id)}
                    >
                      <img
                        src={SubtractIcon}
                        alt='Subtract'
                        className='w-6 h-6'
                      />
                    </button>

                    <p className='font-os font-medium text-black-600 text-base'>
                      {item.num}
                    </p>

                    <button
                      disabled={item.num >= item.productId.status || updateCartItemLoading}
                      type='button'
                      className={`bg-secondary-600 rounded p-1 disabled:cursor-not-allowed disabled:bg-accent-600`}
                      onClick={() => handleAdd(item._id)}
                    >
                      <img src={AddIcon} alt='Add' className='w-6 h-6' />
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
                    <img src={DeleteIcon} alt='Delete' className='w-5 h-5' />
                  )}
                  <p
                    className={`text-[#D40000] font-os font-medium text-[15px] ${currentCartItemId == item._id ? 'loader' : ''
                      }`}
                  >
                    {currentCartItemId == item._id ? '' : 'Remove Item'}
                  </p>
                </button>
                <p className='text-red-500 text-sm'>{removeCartItemError}</p>
              </div>
            ))}

            <hr className='mt-5' />
          </div>

          <div className='text-slate-500 text-center'>
            {getCartError && getCartError}
            {updateCartItemNumberError && updateCartItemNumberError}
          </div>

          {/* Summary */}
          <div className='p-4 border border-lightgray-300 rounded-md w-full md:w-[322px]'>
            <h4 className='font-os font-semibold text-black-600 text-lg text-left'>
              Cart Summary
            </h4>
            <hr className='mt-2' />
            <div className='flex justify-between items-center mt-6'>
              <p className='font-os font-medium text-black-600 text-base'>
                Subtotal:
              </p>
              <p className='font-os font-bold text-primary-600 text-xl'>
                ₦{totalCartPrice}
              </p>
            </div>

            <div className='py-6'>
              <form id='checkout-form' onSubmit={handleMakePayment}>
                <div>
                  <label>select a pickup location</label>
                  <select value={pickupLocation} onChange={(e)=>setPickUpLocation(e.target.value)} className='my-2 rounded-lg w-full'>
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
              type="submit"
              form='checkout-form'
              disabled={cartItems.length < 1 || !pickupLocation}
              className='bg-primary-600 mt-8 px-3 py-2.5 rounded-lg w-full text-[#FFF] text-center disabled:bg-accent-600 disabled:cursor-not-allowed'
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Payment Popups */}
      {showVerifyingPopUp && <VerifyPopup />}
      {showVerifiedPopUp && <VerifiedPopup />}
      {showErrorPopUp && <ErrorPopUp errorMessage={errorPopUpMessage ?? 'An error occured'} setShowErrorPopUp={setShowErrorPopUp}/>}
    </div>
  )
}

export default CartPage
