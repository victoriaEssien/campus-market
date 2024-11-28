

// Placeholder images
import ToteBag from "../../../assets/images/tote-bag.png";

// React icons
import { FaRegHeart } from "react-icons/fa6"; // Favourite icon
import { FaStar } from "react-icons/fa"; // Star icon
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useCartStore } from "../../../stores/cart-store";
import { getCart } from "../../../api-call/GetCart";

export const SpecificProductDescriptionComponent = ({ product }) => {
    // local states
    const [productInCart, setProductInCart] = useState(false);
    const [leadImage, setLeadImage] = useState(product.images[0].image);
    const [addToCartSuccessMessage, setAddToCartSuccessMessage] = useState(null);

    // Handle add to cart
    const handleAddToCart = async () => {
        setProductInCart(true)
        console.log('hey')
        const token = Cookies.get('token');
        const requestBody = {
            productId: product._id,
            num: 1,
        }
        try {
            const response = await fetch(`https://campus-market-api.onrender.com/cart/new`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            })
            const jsonResponse = await response.json();
            console.log(jsonResponse)

            if (response.ok) {
                setAddToCartSuccessMessage('Product added to cart successfully')
                window.location.reload();
            } else {
                setProductInCart(false)
                setAddToCartSuccessMessage('something went wrong. please try again')
            }
        } catch (error) {
            console.log(error)
            setProductInCart(false)
            setAddToCartSuccessMessage('something went wrong. please try again')
        }
    }

    // Handle Get Cart
    const callGetCart = async () => {
        const cartItems = await getCart(Cookies.get('token'));
        if (cartItems) {
            cartItems.map((item) => {
                if (item.productId._id == product._id) {
                    setProductInCart(true)
                }
            })
        } else {
            console.log(cartItems)
        }
    }

    useEffect(() => {
        callGetCart()
    }, [])

    return (
        <>
            <div className="md:flex">
                {console.log(productInCart)}
                <div className="md:pr-16 md:pt-4">
                    <img src={leadImage} alt='Image loading...' className='rounded-xl mx-auto md:mx-0 md:w-80 md:h-80' />
                    <div className='flex my-3 justify-center'>
                        {product.images.map((element, index) => (
                            <img key={index} onClick={() => setLeadImage(element.image)} src={element.image} alt='Image loading...' className='rounded-lg size-16 mx-2 cursor-pointer' />
                        ))}

                    </div>
                </div>

                <div className='mx-4 mt-8 md:grow'>
                    <p className='bg-blue-100 inline-block p-1 px-3 rounded text-xs'>{product.seller.firstname + ' ' + product.seller.lastname + ' shop'}</p>
                    <div className='flex justify-between'>
                        <h4 className='mt-3 text-xl'>{product.name}</h4>
                        <FaRegHeart className='text-2xl cursor-pointer' />
                    </div>
                    <p className={`my-3 ${product.status > 0 ? 'text-green-600' : 'text-red-600'}`}>{product.status > 0 ? `In Stock (${product.status} left)` : 'Out of Stock'}</p>
                    <h4 className='text-2xl font-normal'>{product.price ? '₦' + product.price : null}</h4>
                    <hr className='my-3' />

                    <p className='mt-1 font-thin text-sm'>Variation Available</p>

                    <button className='p-2 border text-xs rounded my-3 border-secondary-700'>ONE SIZE FITS ALL</button>

                    <div className='flex text-base my-2' style={{ color: "#497492" }}>
                        <p>4.9</p>
                        <FaStar className='mx-2 mt-1 text-orange-400' />
                        <p>(30 reviews)</p>
                    </div>

                    <div className="text-center md:text-left">
                        <button disabled={productInCart ? true : false} onClick={handleAddToCart} className={`${productInCart ? ' bg-gray-300' : 'bg-[#11334D] hover:opacity-80'} px-24 md:px-14 md:py-3  py-4 mt-3 outline-none border-none rounded-lg text-base text-white`}>
                            {productInCart ? 'Added to cart' : 'Add to cart'}
                        </button>
                        <p className="text-green-500 text-sm py-2">{addToCartSuccessMessage}</p>
                    </div>
                </div>

            </div>
            <hr className='my-7' />
        </>
    )
}
