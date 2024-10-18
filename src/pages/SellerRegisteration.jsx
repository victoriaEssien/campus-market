import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Add axios import
import { validateEmail } from "../utils/validators/emailValidator";
import { validatePhoneNumber } from "../utils/validators/phoneNumberValidator";
// Components
import AppNav from "../components/AppNav";

export default function SellerRegisteration() {
    const navigate = useNavigate();

    const [shopName, setShopName] = useState('');
    const [shopLocation, setShopLocation] = useState('');
    const [shopPhoneNumber, setShopPhoneNumber] = useState('');
    const [shopType, setShopType] = useState('');
    const [bankName, setBankName] = useState('');
    const [bankSortCode, setBankSortCode] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [loading, setLoading] = useState(false);

    // State variables for error messages
    const [shopNameError, setShopNameError] = useState('');
    const [shopLocationError, setShopLocationError] = useState('');
    const [shopPhoneNumberError, setShopPhoneNumberError] = useState('');
    const [shopTypeError, setShopTypeError] = useState('');
    const [bankNameError, setBankNameError] = useState('');
    const [bankSortCodeError, setBankSortCodeError] = useState('');
    const [accountNumberError, setAccountNumberError] = useState('');
    const [accountNameError, setAccountNameError] = useState('');
    const [generalError, setGeneralError] = useState('');

    // State variable for success message
    const [successMessage, setSuccessMessage] = useState('');

    // State variable to handle showing step 2
    const [showBankingDetailsSection, setShowBankingDetailsSection] = useState(false);

    // Function to handle movement to step 2
    const handleShowBankingDetailsSection = () => {
        // Reset error messages
        setShopNameError('');
        setShopLocationError('');
        setShopPhoneNumberError('');
        setShopTypeError('');

        // Validate form fields
        if (!shopName) {
            setShopNameError('Please enter your shop name');
            setTimeout(() => setShopNameError(''), 5000);
            setLoading(false);
            return;
        }

        if (!shopLocation) {
            setShopLocationError('Please enter your shop location');
            setTimeout(() => setShopLocationError(''), 5000);
            setLoading(false);
            return;
        }

        const phoneNumberValidationResult = validatePhoneNumber(shopPhoneNumber);
        if (phoneNumberValidationResult) {
            setShopPhoneNumberError(phoneNumberValidationResult);
            setTimeout(() => setShopPhoneNumberError(''), 5000);
            setLoading(false);
            return;
        }

        if (!shopType) {
            setShopTypeError('Please select your shop type');
            setTimeout(() => setShopTypeError(''), 5000);
            setLoading(false);
            return;
        }


        setShowBankingDetailsSection(true);


    };


    // 

    // Handle seller registration
    const handleSellerRegisteration = async (e) => {
        e.preventDefault();

        // Reset error messages
        setBankNameError('');
        setBankSortCodeError('');
        setAccountNumberError('');
        setAccountNameError('');

        // Validate form fields
        if (!bankName) {
            setBankNameError('Please enter your bank name');
            setTimeout(() => setBankNameError(''), 5000);
            setLoading(false);
            return;
        }

        if (!bankSortCode) {
            setBankSortCodeError('Please enter your bank sort code');
            setTimeout(() => setBankSortCodeError(''), 5000);
            setLoading(false);
            return;
        }

        if (!accountNumber) {
            setAccountNumberError('Please enter your account number');
            setTimeout(() => setAccountNumberError(''), 5000);
            setLoading(false);
            return;
        }

        if (!accountName) {
            setAccountNameError('Please enter your account name');
            setTimeout(() => setAccountNameError(''), 5000);
            setLoading(false);
            return;
        }

        console.log(shopName, shopLocation, shopPhoneNumber, shopType, bankName, bankSortCode, accountNumber, accountName);
    }

    return (
        <div>
            {/* Navigation */}
            <AppNav />

            <div>
                <div className="md:mx-auto my-8">
                    <div className='mx-auto md:w-5/12'>
                        <h1 className='font-os pt-7 text-3xl md:text-4xl text-center text-black-600 font-bold leading-relaxed'>{!showBankingDetailsSection ? 'Shop Information' : 'Banking Information'}</h1>
                        <p className="font-os text-md text-black-400 text-center leading-relaxed mx-auto w-11/12 mt-2 md:mt-4">
                            {!showBankingDetailsSection ? "Enter your shop's details to help customers know more about your business." : "Submit your banking details to receive payments for your services quickly and securely."}
                        </p>
                        <div className="mt-8 md:mt-10 px-4 md:p-8 md:rounded-[20px] md:border border-lightgray-400 ">
                            <form method="POST" onSubmit={handleSellerRegisteration}>
                                {!showBankingDetailsSection ?
                                    <div>
                                        {/* First Step */}
                                        <div className="mb-4">
                                            <label htmlFor="shopName" className="block mb-2 font-os text-black-600 ">
                                                Shop Name:
                                            </label>
                                            <input
                                                type="text"
                                                id="shopName"
                                                value={shopName}
                                                onChange={(e) => setShopName(e.target.value)}
                                                placeholder="Jewel Jewlries"
                                                className="w-full p-3 border text-black-500 border-lightgray-500 rounded-lg placeholder:text-black-100"
                                            />
                                            {shopNameError && <p className=" font-os text-sm text-error-600 mt-2">{shopNameError}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="location" className="block font-os mb-2 text-black-600">
                                                Shop Location:
                                            </label>
                                            <input
                                                type="text"
                                                id="location"
                                                value={shopLocation}
                                                onChange={(e) => setShopLocation(e.target.value)}
                                                placeholder="Old girls hostel"
                                                className="w-full p-3 border text-black-500 border-lightgray-500 rounded-lg placeholder:text-black-100"
                                            />
                                            {shopLocationError && <p className=" font-os text-sm text-error-600 mt-2">{shopLocationError}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="phone" className="block font-os mb-2 text-black-600">
                                                Shop Phone Number:
                                            </label>
                                            <input
                                                type="text"
                                                id="phone"
                                                value={shopPhoneNumber}
                                                onChange={(e) => setShopPhoneNumber(e.target.value)}
                                                placeholder="090xxxxxxxx"
                                                className="w-full p-3 border text-black-500 border-lightgray-500 rounded-lg placeholder:text-black-100"
                                            />
                                            {shopPhoneNumberError && <p className="font-os text-sm text-error-600 mt-2">{shopPhoneNumberError}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="type" className="block font-os mb-2 text-black-600">
                                                Shop Type:
                                            </label>
                                            <select
                                                type="text"
                                                id="type"
                                                value={shopType}
                                                onChange={(e) => setShopType(e.target.value)}
                                                placeholder="Gadgets"
                                                className="w-full p-3 border text-black-500 border-lightgray-500 rounded-lg placeholder:text-black-100"
                                            >
                                                <option value="Gadgets">Gadgets</option>
                                                <option value="Fashion">Fashion</option>
                                                <option value="Food">Food</option>
                                            </select>
                                            {shopTypeError && <p className="font-os text-sm text-error-600 mt-2">{shopTypeError}</p>}
                                        </div>


                                        <div className="mt-8">
                                            <p className="text-sm text-error-600 my-2 text-center">{generalError}</p>
                                            <button onClick={handleShowBankingDetailsSection} disabled={loading} className="bg-primary-700 hover:bg-primary-800 font-os font-semibold text-[#FFF] py-4 px-4 mb-4 w-full rounded-lg">
                                                {loading ? 'Just a minute...' : 'Next'}
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        {/* Step two */}
                                        <div>
                                            <div className="mb-4">
                                                <label htmlFor="bankName" className="block mb-2 font-os text-black-600 ">
                                                    Bank Name:
                                                </label>
                                                <select
                                                    type="text"
                                                    id="type"
                                                    value={bankName}
                                                    onChange={(e) => setBankName(e.target.value)}
                                                    placeholder="Fidelity Bank"
                                                    className="w-full p-3 border text-black-500 border-lightgray-500 rounded-lg placeholder:text-black-100"
                                                >
                                                    <option value="Fidelity Bank">Fidelity Bank</option>
                                                    <option value="Access Bank">Access Bank</option>
                                                    <option value="First Bank">First Bank</option>
                                                </select>
                                                {bankNameError && <p className=" font-os text-sm text-error-600 mt-2">{bankNameError}</p>}
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="bankSortCode" className="block font-os mb-2 text-black-600">
                                                    Bank Sort Code:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="sortCOde"
                                                    value={bankSortCode}
                                                    onChange={(e) => setBankSortCode(e.target.value)}
                                                    placeholder="185008"
                                                    className="w-full p-3 border text-black-500 border-lightgray-500 rounded-lg placeholder:text-black-100"
                                                />
                                                {bankSortCodeError && <p className=" font-os text-sm text-error-600 mt-2">{bankSortCodeError}</p>}
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="accountNumber" className="block font-os mb-2 text-black-600">
                                                    Bank Account Number:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="accountNumber"
                                                    value={accountNumber}
                                                    onChange={(e) => setAccountNumber(e.target.value)}
                                                    placeholder="45563562356"
                                                    className="w-full p-3 border text-black-500 border-lightgray-500 rounded-lg placeholder:text-black-100"
                                                />
                                                {accountNumberError && <p className="font-os text-sm text-error-600 mt-2">{accountNumberError}</p>}
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="accountName" className="block font-os mb-2 text-black-600">
                                                    Bank Account Name:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="accountName"
                                                    value={accountName}
                                                    onChange={(e) => setAccountName(e.target.value)}
                                                    placeholder="John Doe"
                                                    className="w-full p-3 border text-black-500 border-lightgray-500 rounded-lg placeholder:text-black-100"
                                                />
                                                {accountNameError && <p className="font-os text-sm text-error-600 mt-2">{accountNameError}</p>}
                                            </div>

                                            <div className="mt-8">
                                                <p className="text-sm text-error-600 my-2 text-center">{generalError}</p>
                                                <button type="submit" disabled={loading} className="bg-primary-700 hover:bg-primary-800 font-os font-semibold text-[#FFF] py-4 px-4 mb-4 w-full rounded-lg">
                                                    {loading ? 'Just a minute...' : 'Create Seller Account'}
                                                </button>
                                            </div>

                                            <p onClick={() => setShowBankingDetailsSection(false)} className='cursor-pointer text-center text-secondary-700 font-semibold'>Previous</p>
                                        </div>

                                    </div>
                                }




                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}