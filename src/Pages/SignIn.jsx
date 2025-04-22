import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { toast } from 'react-toastify';
import AxiosInstance from "../utils/AxiosInstance";
import axios from "axios";
// import SignUp from "./Signup/SignUp";

const SignIn = () => {
    // const [activeButton, setActiveButton] = useState(null);
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [logindata, setLogindata]=useState({
        email:"",
        password:""
    })

    const handleOnchange=(e)=>{
        setLogindata({...logindata, [e.target.name]:e.target.value})
    }
    const navigate = useNavigate();

    // const handleButtonClick = (index) => {
    //     setActiveButton(index);
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Handle sign-in logic (e.g., API call)
    //     navigate('/dashboard'); // Redirect to the dashboard after successful login
    // };

    const handleSubmit = async(e)=>{
        e.preventDefault()
        console.log('login_data-->',logindata)
        // debugger
        if (logindata) {
          try  { const res = await axios.post('https://lmsback.pythonanywhere.com/api/v1/auth/login/', logindata)
             const response= res.data
             console.warn("login APi's response--> ", res)
             const user={
                'full_name':response?.full_name,
                'email':response?.email
             }
             
             localStorage.setItem('token', response?.access_token)
             localStorage.setItem('refresh_token', response?.refresh_token)
             localStorage.setItem('user',JSON.stringify( user))


              navigate('/dashboard')
             toast.success('login successful')
            }catch(error){
                console.log("api calling error",error)
                toast.error('something went wrong')
            }
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
                        <h2 className="text-black text-4xl font-bold mb-2">Welcome Back</h2>
                        <div className="">Login to manage your account</div>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="p-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                    Email Address
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                                    <FaEnvelope className="ml-2 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        name = "email"
                                        className="p-2 w-full focus:outline-none"
                                        value={logindata.email}
                                        onChange={handleOnchange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="p-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                                    Password
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                                    <FaLock className="ml-2 text-gray-400" />
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        name = "password"
                                        className="p-2 w-full focus:outline-none"
                                        value={logindata.password}
                                        onChange={handleOnchange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="p-3">
                                <button
                                    type="submit"
                                    className="bg-customColor-light text-white font-semibold p-2 w-full hover:bg-customColor-light focus:outline-none focus:ring-2 focus:ring-customColor-light transition duration-300 ease-in-out"
                                >
                                    Login
                                </button>
                            </div>
                        </form>

                        {/* Forgot Password link */}
                        <div className="text-center mt-4">
                            <Link to="/forgot-password" className="text-customColor-light hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Need an account? section */}
                        <div className="text-center mt-4">
                            <span className="text-gray-700">Need an account? </span>
                            <Link to="/sign-up" className="text-customColor-light font-bold hover:underline">
                                Sign Up
                            </Link>
                        </div>
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

export default SignIn;
