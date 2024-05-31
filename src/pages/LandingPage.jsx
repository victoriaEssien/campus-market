
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { HeroSection, SignUp, Login, ResetPassword } from "./index"



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
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
            </div>
        </Router>
    </div>
  )
}

export default LandingPage