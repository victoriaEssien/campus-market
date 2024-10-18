
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ProtectedRoute from "../components/ProtectedRoute"
import { HeroSection, SignUp, Login, VerifyEmail, ResetPassword, HomePage, SearchPage, CartPage, SavedPage, ProductDescription, Profile, FashionItems, SellerRegisteration } from "./index"



function LandingPage() {
    return (
        <div>
            <Router>
                <div>
                    <Routes>
                        <Route exact path="/" element={
                            <>
                                <HeroSection />
                            </>
                        }>
                        </Route>
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/verify-email" element={<VerifyEmail />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                        <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
                        <Route path="/my-cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                        <Route path="/saved" element={<ProtectedRoute><SavedPage /></ProtectedRoute>} />
                        <Route path="/description" element={<ProtectedRoute><ProductDescription /></ProtectedRoute>} />
                        <Route path="/my-profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                        <Route path="/fashion-items" element={<ProtectedRoute><FashionItems /></ProtectedRoute>} />
                        {/* Seller Registration */}
                        <Route path="/seller-registration" element={<ProtectedRoute><SellerRegisteration /></ProtectedRoute>} />
                    </Routes>
                </div>
            </Router>
        </div>
    )
}

export default LandingPage