import React, { useState } from "react";
import { FaEnvelope} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify'
import AxiosInstance from '../utils/AxiosInstance'
import Navbar from "../Components/Navbar";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // const handleButtonClick = (index) => {
    //     setActiveButton(index);
    // };

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if (email) {
          const res = await AxiosInstance.post('auth/password-reset/', {'email':email})
           if (res.status === 200) {
            navigate('/forgot-password/reset-button')
            console.log(res.data)
            toast.success('a link to reset your password has be sent to your email')
            
           } 
           setEmail("")
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top container */}
            <div className="bg-white text-black flex-1 p-6">
                {/* Logo, Navbar, and Right-side Buttons */}
                <Navbar/>

                <div className="h-screen-10 flex flex-col items-center justify-center bg-white-100">
                    <div className="bg-white rounded-lg w-full max-w-md mt-10 p-0">
                        <h2 className="text-black text-4xl font-bold mb-2 text-center">Password Recovery</h2>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="p-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                    Email Address
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                                    <FaEnvelope className="ml-2 text-gray-400" />
                                    <input
                                        type="email"
                                        name = "email"
                                        placeholder="Email Address"
                                        className="p-2 w-full focus:outline-none"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="p-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="domain">
                                    Learnyst Domain
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                                    
                                    <input
                                        type="domain"
                                        placeholder="Enter Learnyst Domain"
                                        className="p-2 w-full focus:outline-none"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span className="text-black-500 mr-2">.learnyst.com</span>
                                </div>
                            </div>

                            <div className="text-center mt-4">
                            <Link to="/forgot-password/reset-button" className="text-customColor-light hover:underline">
                                Reset Password
                            </Link>
                        </div>

                            <div className="p-3">
                                <button
                                    type="submit"
                                    className="bg-customColor-light text-white font-semibold p-2 w-50 hover:bg-customColor-light focus:outline-none focus:ring-2 focus:ring-customColor-light transition duration-300 ease-in-out"
                                >
                                    Send Recovery Email
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

            {/* Bottom container */}
            <div className="bg-customColor-light text-white flex-1 p-6">
                <h2 className="text-xl font-bold">Bottom Container</h2>
                <p>This is the bottom container. It will take up the other half of the page height.</p>
            </div>
        </div>
    );
};

export default ForgotPassword;
