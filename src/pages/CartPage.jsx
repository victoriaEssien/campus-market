import React, { useState } from "react";
import AppNav from "../components/AppNav";
import CartShoe from "../assets/images/cart-shoe.png";

import AddIcon from "../assets/icons/add-icon.svg";
import SubtractIcon from "../assets/icons/subtract-icon.svg";
import DeleteIcon from "../assets/icons/delete-icon.svg";

function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Men's Shoes Outdoor Comfortable-Brown",
      size: "EU 43",
      price: 7980,
      quantity: 1,
      image: CartShoe
    },
    {
        id: 1,
        name: "Men's Shoes Outdoor Comfortable-Brown",
        size: "EU 43",
        price: 7980,
        quantity: 1,
        image: CartShoe
    },
    {
        id: 1,
        name: "Men's Shoes Outdoor Comfortable-Brown",
        size: "EU 43",
        price: 7980,
        quantity: 1,
        image: CartShoe
    },
  ]);

  const handleAdd = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleSubtract = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <AppNav />
      <div className="mx-4 md:mx-14 my-14">
        {/* Cart and Summary */}
        <div className="flex flex-col-reverse md:flex-row items-start justify-between">
          {/* Cart */}
          <div className="mt-14 md:mt-0">
            <h2 className="font-os text-2xl text-black-600 font-semibold">Cart ({cartItems.length})</h2>

            {/* Cart items */}
            {cartItems.map((item) => (
              <div key={item.id} className="mt-10">
                <div className="flex flex-col md:flex-row items-start gap-x-40">
                  <div className="flex items-start space-x-5">
                    <img src={item.image} alt={item.name} />
                    <div className="flex flex-col gap-y-3">
                      <h4 className="font-os text-[15px] text-black-600">{item.name}</h4>
                      <p className="font-os text-[15px] text-black-600">Size: {item.size}</p>
                      <p className="font-os font-bold text-[15px] text-black-600">₦{item.price}</p>
                    </div>
                  </div>

                  {/* Add or remove buttons */}
                  <div className="flex items-center space-x-4 my-6 md:mt-0">
                    <button type="button" className="bg-accent-600 rounded p-1" onClick={() => handleSubtract(item.id)}>
                      <img src={SubtractIcon} alt="Subtract" className="h-6 w-6" />
                    </button>

                    <p className="font-os text-base font-medium text-black-600">{item.quantity}</p>

                    <button type="button" className="bg-secondary-600 rounded p-1" onClick={() => handleAdd(item.id)}>
                      <img src={AddIcon} alt="Add" className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                <button type="button" className="flex items-center space-x-1 mt-6" onClick={() => handleRemove(item.id)}>
                  <img src={DeleteIcon} alt="Delete" className="h-5 w-5" />
                  <p className="text-[#D40000] font-os font-medium text-[15px]">Remove Item</p>
                </button>
              </div>
            ))}

            <hr className="mt-5" />
          </div>

          {/* Summary */}
          <div className="border border-lightgray-300 w-full md:w-[322px] rounded-md p-4">
            <h4 className="font-os text-lg text-black-600 text-left font-semibold">Cart Summary</h4>
            <hr className="mt-2" />
            <div className="flex justify-between items-center mt-6">
              <p className="font-os text-base font-medium text-black-600">Subtotal:</p>
              <p className="font-os font-bold text-xl text-primary-600">₦{subtotal}</p>
            </div>
            <button type="button" className="mt-8 w-full text-center bg-primary-600 text-[#FFF] px-3 py-2.5 rounded-lg">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
