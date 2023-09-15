import React from 'react'
import Input from '../common/InputFields/Input'
import { BsArrowRight, BsEyeFill, BsLockFill, BsPersonFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const navigator = useNavigate()

    const userSignIn = () => {

    }

    return (
        <div className='h-screen bg-gray-50 flex justify-center items-center' style={{
            backgroundImage: "url('https://img.freepik.com/free-vector/realistic-style-technology-particle-background_23-2148426704.jpg?size=626&ext=jpg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
        }}>
            <div className='flex flex-col gap-5 border border-violet-950 p-8 rounded-md  backdrop-blur-sm shadow-md'>
                <div className='flex flex-col gap-5 text-white'>
                 Create New Connectify Account
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

                <p className="text-white"> dont 0have an account? <span className="text-violet-200 cursor-pointer"
                    onClick={() => {
                        navigator("/register")
                    }}
                >register</span> </p>
            </div>
        </div>
    )
}

export default Register