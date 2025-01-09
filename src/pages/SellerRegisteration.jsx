import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Add axios import
import { validateEmail } from "../utils/validators/emailValidator";
import { validatePhoneNumber } from "../utils/validators/phoneNumberValidator";
import Cookies from 'js-cookie'

// Components
import AppNav from "../components/AppNav";
import { RegisterSellerApi } from '../api-call/RegisterSeller';

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
    const [registerError, setRegisterError] = useState(null);

    //success
    const [registerSuccess, setRegisterSuccess] = useState(null);
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


    // Handle seller registration
    const handleSellerRegisteration = async (e) => {
        setLoading(true)
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

        //handle api call
        try {
            const body = {
                seller: true,
                shopName: shopName,
                shopLocation: shopLocation,
                shopPhone: shopPhoneNumber,
                shopType: shopType,
                bankName: bankName,
                bankSortCode: bankSortCode,
                bankAccNum: accountNumber,
                bankAccName: accountName
            }
            const response = await RegisterSellerApi(Cookies.get('token'), body)
            if (response) {
                setRegisterSuccess('Seller registration successful');
                setTimeout(() => {
                    navigate('/my-shop')
                }, 2000);

            } else {
                setLoading(false)
                setRegisterError('Seller registration failed, please try again');
                setTimeout(() => {
                    setRegisterError(null);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
            setRegisterError('An error occurred, please try again');
            setTimeout(() => {
                setRegisterError(null);
            }, 3000);

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
                        <h1 className='pt-7 font-bold font-os text-3xl text-black-600 text-center md:text-4xl leading-relaxed'>{!showBankingDetailsSection ? 'Shop Information' : 'Banking Information'}</h1>
                        <p className="mx-auto mt-2 md:mt-4 w-11/12 font-os text-black-400 text-center text-md leading-relaxed">
                            {!showBankingDetailsSection ? "Enter your shop's details to help customers know more about your business." : "Submit your banking details to receive payments for your services quickly and securely."}
                        </p>
                        <div className="mt-8 md:mt-10 px-4 md:p-8 md:border border-lightgray-400 md:rounded-[20px]">
                            <form method="POST" onSubmit={handleSellerRegisteration}>
                                {!showBankingDetailsSection ?
                                    <div>
                                        {/* First Step */}
                                        <div className="mb-4">
                                            <label htmlFor="shopName" className="block mb-2 font-os text-black-600">
                                                Shop Name:
                                            </label>
                                            <input
                                                type="text"
                                                id="shopName"
                                                value={shopName}
                                                onChange={(e) => setShopName(e.target.value)}
                                                placeholder="Jewel Jewlries"
                                                className="p-3 border border-lightgray-500 rounded-lg w-full text-black-500 placeholder:text-black-100"
                                            />
                                            {shopNameError && <p className="mt-2 font-os text-error-600 text-sm">{shopNameError}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="location" className="block mb-2 font-os text-black-600">
                                                Shop Location:
                                            </label>
                                            <input
                                                type="text"
                                                id="location"
                                                value={shopLocation}
                                                onChange={(e) => setShopLocation(e.target.value)}
                                                placeholder="Old girls hostel"
                                                className="p-3 border border-lightgray-500 rounded-lg w-full text-black-500 placeholder:text-black-100"
                                            />
                                            {shopLocationError && <p className="mt-2 font-os text-error-600 text-sm">{shopLocationError}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="phone" className="block mb-2 font-os text-black-600">
                                                Shop Phone Number:
                                            </label>
                                            <input
                                                type="text"
                                                id="phone"
                                                value={shopPhoneNumber}
                                                onChange={(e) => setShopPhoneNumber(e.target.value)}
                                                placeholder="090xxxxxxxx"
                                                className="p-3 border border-lightgray-500 rounded-lg w-full text-black-500 placeholder:text-black-100"
                                            />
                                            {shopPhoneNumberError && <p className="mt-2 font-os text-error-600 text-sm">{shopPhoneNumberError}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="type" className="block mb-2 font-os text-black-600">
                                                Shop Type:
                                            </label>
                                            <select
                                                type="text"
                                                id="type"
                                                value={shopType}
                                                onChange={(e) => setShopType(e.target.value)}
                                                placeholder="Gadgets"
                                                className="p-3 border border-lightgray-500 rounded-lg w-full text-black-500 placeholder:text-black-100"
                                            >
                                                <option value="Gadgets">Gadgets</option>
                                                <option value="Fashion">Fashion</option>
                                                <option value="Food">Food</option>
                                            </select>
                                            {shopTypeError && <p className="mt-2 font-os text-error-600 text-sm">{shopTypeError}</p>}
                                        </div>


                                        <div className="mt-8">
                                            <p className="my-2 text-center text-error-600 text-sm">{generalError}</p>
                                            <button onClick={handleShowBankingDetailsSection} disabled={loading} className="bg-primary-700 hover:bg-primary-800 mb-4 px-4 py-4 rounded-lg w-full font-os font-semibold text-[#FFF]">
                                                {loading ? 'Just a minute...' : 'Next'}
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        {/* Step two */}
                                        <div>
                                            <div className="mb-4">
                                                <label htmlFor="bankName" className="block mb-2 font-os text-black-600">
                                                    Bank Name:
                                                </label>
                                                <select
                                                    type="text"
                                                    id="type"
                                                    value={bankName}
                                                    onChange={(e) => setBankName(e.target.value)}
                                                    placeholder="Fidelity Bank"
                                                    className="p-3 border border-lightgray-500 rounded-lg w-full text-black-500 placeholder:text-black-100"
                                                >
                                                    <option value="Fidelity Bank">Fidelity Bank</option>
                                                    <option value="Access Bank">Access Bank</option>
                                                    <option value="First Bank">First Bank</option>
                                                </select>
                                                {bankNameError && <p className="mt-2 font-os text-error-600 text-sm">{bankNameError}</p>}
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="bankSortCode" className="block mb-2 font-os text-black-600">
                                                    Bank Sort Code:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="sortCOde"
                                                    value={bankSortCode}
                                                    onChange={(e) => setBankSortCode(e.target.value)}
                                                    placeholder="185008"
                                                    className="p-3 border border-lightgray-500 rounded-lg w-full text-black-500 placeholder:text-black-100"
                                                />
                                                {bankSortCodeError && <p className="mt-2 font-os text-error-600 text-sm">{bankSortCodeError}</p>}
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="accountNumber" className="block mb-2 font-os text-black-600">
                                                    Bank Account Number:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="accountNumber"
                                                    value={accountNumber}
                                                    onChange={(e) => setAccountNumber(e.target.value)}
                                                    placeholder="45563562356"
                                                    className="p-3 border border-lightgray-500 rounded-lg w-full text-black-500 placeholder:text-black-100"
                                                />
                                                {accountNumberError && <p className="mt-2 font-os text-error-600 text-sm">{accountNumberError}</p>}
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="accountName" className="block mb-2 font-os text-black-600">
                                                    Bank Account Name:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="accountName"
                                                    value={accountName}
                                                    onChange={(e) => setAccountName(e.target.value)}
                                                    placeholder="John Doe"
                                                    className="p-3 border border-lightgray-500 rounded-lg w-full text-black-500 placeholder:text-black-100"
                                                />
                                                {accountNameError && <p className="mt-2 font-os text-error-600 text-sm">{accountNameError}</p>}
                                            </div>

                                            <div className="mt-8">
                                                <p className="my-2 text-center text-error-600 text-sm">{generalError}</p>
                                                {registerError && <p className="my-2 text-center text-error-600 text-sm">{registerError}</p>}
                                                {registerSuccess && <p className="my-2 text-center text-sm text-success-600">{registerSuccess}</p>}
                                                <button type="submit" disabled={loading} className="bg-primary-700 hover:bg-primary-800 mb-4 px-4 py-4 rounded-lg w-full font-os font-semibold text-[#FFF]">
                                                    {loading ? 'Just a minute...' : 'Create Seller Account'}
                                                </button>
                                            </div>

                                            <p onClick={() => setShowBankingDetailsSection(false)} className='font-semibold text-center text-secondary-700 cursor-pointer'>Previous</p>
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