import React, { useState } from "react";
import { FaEnvelope} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { toast } from 'react-toastify';
import AxiosInstance from '../utils/AxiosInstance';

const ResetButton = () => {
    const navigate = useNavigate();
    const [newpasswords, setNewPassword]=useState({
        password:"",
        confirm_password:"",
      })
      const {uid, token}=useParams()
    const {password, confirm_password}=newpasswords


    // const handleButtonClick = (index) => {
    //     setActiveButton(index);
    // };

    const handleChange=(e)=>{
        setNewPassword({...newpasswords, [e.target.name]:e.target.value})
    }

    const data={
        "password":password,
        "confirm_password":confirm_password,
        "uidb64":uid,
        "token": token,
      }

    const handleSubmit =async (e)=>{
        e.preventDefault()
        if (data) {
          const res = await AxiosInstance.patch('auth/set-new-password/', data)
          const response = res.data
          if (res.status === 200) {
               navigate('/login')
               toast.success(response.message)
          }
          console.log(response)
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
                        <h2 className="text-black text-4xl font-bold mb-2 text-center">Reset Address</h2>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="p-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                                    New Password
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                                    <FaEnvelope className="ml-2 text-gray-400" />
                                    <input
                                        type="text"
                                        name = "password"
                                        placeholder="New Password"
                                        className="p-2 w-full focus:outline-none"
                                        value={password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="p-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                                    Retype New Password
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                                    
                                    <input
                                        type="text"
                                        name = "confirm_password"
                                        placeholder="Retype New Password"
                                        className="p-2 w-full focus:outline-none"
                                        value={confirm_password}
                                        onChange={handleChange}
                                        required
                                    />
        
                                </div>
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

export default ResetButton;
