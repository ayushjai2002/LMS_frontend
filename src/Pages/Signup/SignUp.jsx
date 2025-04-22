import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate();
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [email, setEmail] = useState('');
    // const [contact, setContact] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        contact: '',
        password: '',
        password2: '',
      });
    const [agree, setAgree] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agree) {
            alert("You must agree to the terms and conditions.");
            return;
        }
        // if (password !== password2) {
        //     toast.error("Passwords do not match.");
        //     return;
        // }

        try {
            const response = await axios.post('https://lmsbackend.satyajitgiram.com/api/v1/auth/register/', formData);
            // Show success 
            console.log(response.data)
            toast.success('Registration successful!');
            const result=response.data
       if (response.status === 201) {
          navigate("/otp-button")
          toast.success(result.message)
       }
          } catch (error) {
            // Show error toast
            toast.error('Registration failed. Please try again.');
          }
    };

    return (
        <div className="h-screen flex flex-col md:flex-row">
            <div className="bg-white-500 flex-1 p-4">
                <h1 className="text-black text-xl font-bold md:text-2xl pt-4 pb-1">Get Started with LMS</h1>
                <div className="text-customColor text-xs font-light">Already have an account?
                    <Link to="/sign-in" className="text-customColor-light font-bold pl-1">Login</Link>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 w-full max-w-sm">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">First Name</label>
                        <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                            <FaUser className="ml-2 text-gray-400" />
                            <input
                                type="text"
                                name="first_name"
                                placeholder="Enter your first name"
                                className="p-2 w-full focus:outline-none"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">Last Name</label>
                        <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                            <FaUser className="ml-2 text-gray-400" />
                            <input
                                type="text"
                                name="last_name"
                                placeholder="Enter your last name"
                                className="p-2 w-full focus:outline-none"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
                        <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                            <FaEnvelope className="ml-2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="p-2 w-full focus:outline-none"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contact">Contact Number</label>
                        <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                            <input
                                type="tel"
                                name="contact"
                                placeholder="Enter your number"
                                className="p-2 w-full focus:outline-none"
                                value={formData.contact}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Create Password</label>
                        <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                            <FaLock className="ml-2 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                className="p-2 w-full focus:outline-none"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">Confirm Password</label>
                        <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                            <FaLock className="ml-2 text-gray-400" />
                            <input
                                type="password"
                                name="password2"
                                placeholder="Confirm your password"
                                className="p-2 w-full focus:outline-none"
                                value={formData.password2}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="agree"
                            checked={agree}
                            onChange={() => setAgree(!agree)}
                            className="mr-2"
                        />
                        <label htmlFor="agree" className="text-sm text-gray-700">
                            I agree to the <a href="/terms" className="text-customColor-light">terms and conditions</a>.
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="bg-customColor-light text-white font-semibold p-2 w-40 hover:bg-customColor-light focus:outline-none focus:ring-2 focus:ring-customColor-light transition duration-300 ease-in-out"
                    >
                        Get Started
                    </button>
                </form>
            </div>

            <div className="bg-customColor-light flex-1 p-4">
                <h1 className="text-white text-xl md:text-2xl">Right Side</h1>
                <p className="text-white">This is the right content.</p>
            </div>
        </div>
    );
}

export default SignUp;
