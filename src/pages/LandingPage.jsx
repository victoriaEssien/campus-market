
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { HeroSection, SignUp, Login, VerifyEmail, ResetPassword, HomePage, SearchPage, CartPage, SavedPage, ProductDescription, Profile, FashionItems } from "./index"



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
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/my-cart" element={<CartPage />} />
                    <Route path="/saved" element={<SavedPage />} />
                    <Route path="/description" element={<ProductDescription />} />
                    <Route path="/my-profile" element={<Profile />} />
                    <Route path="/fashion-items" element={<FashionItems />} />
                </Routes>
            </div>
        </Router>
    </div>
  )
}

export default LandingPage