import React from 'react'
import Input from '../common/InputFields/Input'
import { BsArrowRight, BsEyeFill, BsLockFill, BsPersonFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo/logo.png'
const Login = () => {
    const navigator = useNavigate()

    const userSignIn = () => {

    }

    React.useEffect(() => {
        document.title = "connectify-Login"
    }, []);

    return (
        <div className='h-screen bg-gray-50 flex justify-evenly items-center' style={{
            backgroundImage: "url('https://img.freepik.com/free-vector/realistic-style-technology-particle-background_23-2148426704.jpg?size=626&ext=jpg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
        }}>
            <div className="text-white">
                <h1 className="text-4xl mb-3 text-bold">
                    <img src={logo} width={300} alt={"logo"}/>
                </h1>
                <h3 className="text-2xl tracking-wide">
                    Connectify Redefining the Way You Connect <br/>
                    and Share by Offering a Seamless, Intuitive, <br/>
                    and Personalized Environment.
                </h3>

            </div>
            <div className='flex flex-col gap-5 border border-violet-950 p-8 rounded-md  backdrop-blur-sm shadow-md'>

                <div className='flex flex-col gap-5 text-white'>
                    Sign In to account

                </div>

                <Input
                    type="text"
                    placeholder="Enter you username"
                    prefix={<BsPersonFill />}
                // sufix={<BsPersonFill/>}
                />

                <Input
                    type="text"
                    placeholder="Enter you password"
                    prefix={<BsLockFill />}
                    sufix={<BsEyeFill />}
                />

                <div className='flex justify-between items-center'>

                    <span className="text-white">
                        Sign In
                    </span>

                    <button
                        onClick={userSignIn}
                        className='rounded-full bg-violet-600 p-3 text-white text-2x hover:bg-violet-700'>
                        <BsArrowRight />
                    </button>
                </div>

                <p className="text-white"> dont have an account? <span className="text-violet-200 cursor-pointer"
                    onClick={() => {
                        navigator("/register")
                    }}
                >register</span> </p>
            </div>


        </div>
    )
}

export default Login