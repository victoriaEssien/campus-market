import { useEffect, useState } from "react";
import AppNav from "../components/AppNav";
import Cookies from 'js-cookie'
import { ProdcutLoaderComponent } from "../components/Shop/Products/product-loader.component";
import ActionConfirmationMessage from "../components/popups/ActionConfirmationMessage";

function BuyerOrders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [updateError, setUpdateError] = useState(null)
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, showPopupMessage] = useState(null)
    const [popupColor, setPopupColor] = useState(null)


    // get buyer orders
    const handleGetOrders = async () => {
        setLoading(true)
        try {
            const response = await fetch('https://campus-market-api.onrender.com/order/buyer/pending', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                    'Content-Type': 'application/json',
                }
            })
            const jsonResponse = await response.json();
            if (response.ok) {
                setOrders(jsonResponse?.buyerOrders)
                setLoading(false)
            } else {
                setError('something went wrong. please try again')
                setLoading(false)
            }
            console.log(jsonResponse)
        } catch (error) {
            setLoading(false)
            setError(error)
            console.log(error);
        }
    }

    //update order
    const handleUpdateOrder = async (id) => {
        setUpdateLoading(true)

        const data = {
            id: id,
            status: true
        }

        try {
            const response = await fetch('https://campus-market-api.onrender.com/order/buyer/status', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            const jsonResponse = await response.json();
            if (jsonResponse?.data) {
                // add success alert
                setPopupColor('green')
                showPopupMessage('Congrats on Receiving your order')
                setShowPopup(true)

                handleGetOrders()
                console.log(jsonResponse)
                return
            } else {
                // add errror alert
                setPopupColor('red')
                showPopupMessage('Error Updating Order, Please try again')
                setShowPopup(true)

                console.log(jsonResponse)
                return
            }

        } catch (error) {
            setUpdateError(error)
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetOrders()
    }, [])

    return (
        <div>
            <div>
                {/* {console.log(selectedCategory)} */}
                <div>
                    <AppNav />
                </div>
                <div className="mx-4 md:mx-14 mt-14">

                    {/* Fashion Items */}
                    <section className="my-20">
                        <h2 className="font-os font-semibold text-black-600 text-2xl">My Orders</h2>
                        {loading ?
                            <ProdcutLoaderComponent />
                            :
                            <div className="">
                                <div className="gap-x-5 gap-y-20 grid grid-cols-1 md:grid-cols-4 mx-auto md:mx-0 mt-9 w-full">
                                    {orders.map((element, index) => (
                                        <a>
                                            <div className="rounded-[10px] w-full hover:bg-accent-200">
                                                <div className="cursor-pointer">
                                                    <img src={element?.cartId?.productId?.images[0]?.image} className="rounded-xl lg:h-32" />
                                                </div>
                                                <p className="mt-4 font-os font-medium text-black-500 text-sm text-left">{element?.cartId?.productId?.name}</p>
                                                <p className="mt-1 font-os font-medium text-black-500 text-sm text-left">Quantity: {element?.cartId?.num}</p>
                                                <p className="mt-1 font-os font-bold text-black-600 text-base text-left">₦{element?.cartId?.productId?.price}</p>

                                                <div className="pt-3 w-full">
                                                    <button type="" onClick={() => handleUpdateOrder(element._id)} className="bg-primary-700 hover:bg-primary-800 mb-4 px-2 py-4 lg:py-2 rounded-lg w-full lg:w-64 font-os font-semibold text-[#FFF]">
                                                        {"I have Received"}
                                                    </button>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        }
                    </section>
                </div>
            </div>

            {/* popup */}
            <ActionConfirmationMessage
                message={popupMessage}
                show={showPopup}
                onClose={() => setShowPopup(false)}
                colour={popupColor}
            />
        </div>
    )

}

export default BuyerOrders;