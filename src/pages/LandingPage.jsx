
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { HeroSection, SignUp, Login, VerifyEmail, ResetPassword, HomePage } from "./index"



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
                </Routes>
            </div>
        </Router>
    </div>
  )
}

export default LandingPage