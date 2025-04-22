import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";

const OtpButton = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    // const handleChange = (e) => {
    //     const inputOtp = e.target.value;
    //     // Only allow input of up to 6 digits
    //     if (/^\d{0,4}$/.test(inputOtp)) {
    //         setOtp(inputOtp);
    //     }
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Ensure OTP is 6 digits before proceeding
    //     if (otp.length === 4) {
    //         navigate('/dashboard'); // Redirect to the dashboard page
    //     }
    // };

    const handleOtpSubmit = async(e)=>{
        e.preventDefault()
        if (otp) {
            const res = await axios.post('https://lmsbackend.satyajitgiram.com/api/v1/auth/verify-email/', {'otp':otp})
            const resp = res.data
            if (res.status === 200) {
                navigate('/dashboard')
                toast.success(resp.message)
            }
            
        }
        
}

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>

                {/* OTP Form */}
                <form onSubmit={handleOtpSubmit}>
                    {/* OTP Input */}
                    <input
                        type="text"
                        maxLength={4}
                        value={otp}
                        name = "otp"
                        onChange={(e)=>setOtp(e.target.value)}
                        placeholder="Enter 4-digit OTP"
                        className="text-center text-lg font-semibold border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-customColor-light focus:outline-none mb-4"
                        required
                    />

                    {/* Proceed Button (disabled if OTP is not 6 digits) */}
                    <button
                        type="submit"
                        disabled={otp.length !== 4}
                        className={`p-3 w-full rounded-lg font-semibold transition duration-300 
                            ${otp.length === 4 
                                ? 'bg-customColor-light text-white hover:bg-customColor-light' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OtpButton;
