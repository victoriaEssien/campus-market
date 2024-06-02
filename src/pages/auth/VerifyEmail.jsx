import MainNav from "../../components/MainNav"
import EmailImg from "../../assets/images/email-illustration.svg"

function VerifyEmail() {
    return(
        <div>
        <MainNav />
        <div className="mx-4 md:mx-auto">
        <img src={EmailImg} alt="email illustration" className="w-3/6 md:w-3/12 mx-auto mt-8"/>
        <h1 className='font-os text-2xl md:text-4xl text-center text-black-600 font-bold leading-relaxed mt-4'>Verify your Email Address</h1>
        <p className="font-os text-md text-black-400 text-center leading-relaxed mx-auto w-11/12 md:w-4/12 mt-2 md:mt-4">To confirm your email address, please click on the link in the email we sent to your inbox.
        </p>
        </div>
        </div>
    )
}

export default VerifyEmail