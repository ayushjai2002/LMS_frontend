import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle, FaCog, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { toast } from 'react-toastify';
import AxiosInstance from "../utils/AxiosInstance";
import axios from "axios";

const Dashboard = () => {
  // const jwt = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [activeButton, setActiveButton] = useState('Sales');
  const navigate = useNavigate();

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === 'Sales') {
      navigate('/dashboard/sales');
    } else if (buttonName === 'Learners') {
      navigate('/dashboard/learners');
    } else if (buttonName === 'Orders') {
      navigate('/dashboard/orders');
    } else if (buttonName === 'Apps') {
      navigate('/dashboard/apps');
    }
  };

  // useEffect(() => {
  //   // Ensure the token and user data are available
  //   if (!jwt || !user) {
  //     navigate('/sign-in');
  //     handleLogout()
  //   } else {
  //     // Set username based on user object or default to "User"
  //     setUsername(user?.first_name || "User");
  //     const getSomeData =async ()=>{
  //        try {const res =await AxiosInstance.get('auth/get-something/')
  //         console.log(res.data)}
  //         catch(error){
  //           console.log('error',error)
  //         }
  //     }
  // getSomeData();
  //   }
  // }, [jwt, user]);

  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSubMenu = () => setIsSubMenuOpen(!isSubMenuOpen);


// const refresh=localStorage.getItem('refresh_token');

//   const handleLogout = async ()=>{
//     const res = await AxiosInstance.post('auth/logout/', {'refresh_token':refresh})
//     if (res.status === 204) {
//          localStorage.removeItem('token')
//          localStorage.removeItem('refresh_token')
//          localStorage.removeItem('user')
//          navigate('/sign-in')
//          toast.warn("logout successful")
//     }
//   }

  const SidebarItem = ({ icon, label, hasSubmenu = false, submenuItems }) => {
    const handleItemClick = (item) => {
      if (item === 'Courses') {
        navigate('/dashboard/courses'); // Redirect to Courses page when clicked
      }
      if (item === 'Live Classes') {
        navigate('/dashboard/live-classes'); // Redirect to Courses page when clicked
      }
      if (item === 'Mock Test') {
        navigate('/dashboard/mock-test'); // Redirect to Courses page when clicked
      }
      if (item === 'Test Series') {
        navigate('/dashboard/test-series'); // Redirect to Courses page when clicked
      }
      // Handle other submenu items similarly
    };

    return (
      <>
        <li
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center"
          onClick={hasSubmenu ? toggleSubMenu : null}
        >
          <span className="material-icons">{icon}</span>
          <span className={`${!isSidebarOpen && 'hidden'} ml-2`}>{label}</span>
        </li>
        {hasSubmenu && isSubMenuOpen && (
          <ul className="pl-8">
            {submenuItems.map((item) => (
              <li
                key={item}
                className="text-gray-600 text-sm p-2 hover:bg-gray-200 rounded-md cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-lg font-bold text-gray-800">{username}</div>
        <div className="flex items-center space-x-6">
          <button className="bg-customColor-light text-white font-semibold p-2 w-20 rounded-md hover:bg-customColor-light transition duration-300 ease-in-out">
            Upgrade
          </button>
          <button className="bg-gray-100 text-black font-semibold p-2 w-30 rounded-md hover:bg-white transition duration-300 ease-in-out">
            View as Learner
          </button>
          <button className="text-gray-700 hover:text-customColor-light border border-gray-500 p-1 rounded-md">
            Help
          </button>
          <button className="relative">
            <FaBell className="text-gray-700 hover:text-customColor-light text-xl" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
          </button>
          <div className="relative">
            <button onClick={toggleProfileMenu} className="flex items-center space-x-2 text-gray-700 hover:text-customColor-light">
              <FaUserCircle className="text-2xl" />
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <FaCog className="inline mr-2" /> Settings
                </button>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <FaQuestionCircle className="inline mr-2" /> Support
                </button>
                {/* onClick={handleLogout} (Add when we will use useEffect) */}
                <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                  <FaSignOutAlt className="inline mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="flex">
        <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-100 h-screen p-5 pt-8 relative duration-300`}>
          <button className="absolute -right-3 top-9 w-7 border-dark-purple border-2 rounded-full bg-white" onClick={toggleSidebar}>
            {isSidebarOpen ? '<' : '>'}
          </button>
          <nav className="mt-4">
            <ul className="space-y-2">
              <SidebarItem icon="dashboard" label="Dashboard" />
              <SidebarItem
                icon="grid_view"
                label="Contents"
                hasSubmenu
                submenuItems={['Courses', 'Live Classes', 'Mock Test', 'Test Series', 'Bundles', 'Batch', 'Ebooks', 'Podcasts', 'Webinar', 'Digital Products']}
              />
              <SidebarItem icon="language" label="Websites & Apps" />
              <SidebarItem icon="campaign" label="Marketing" />
              <SidebarItem icon="person" label="Users" />
              <SidebarItem icon="bar_chart" label="Reports" />
              <SidebarItem icon="widgets" label="Manage" />
              <SidebarItem icon="add_box" label="Add-Ons" />
              <SidebarItem icon="visibility" label="Piracy Monitor" />
              <SidebarItem icon="school" label="Sub-Schools" />
              <SidebarItem icon="settings" label="Settings" />
            </ul>
          </nav>
        </div>

        {/* Content Area */}
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {username}</h1>
          <div className="grid grid-cols-4 gap-6">
            {/* Left Side - Total Sales, Products, Learners */}
            <div className="border col-span-3 grid grid-cols-3 gap-6">
              <div className="rounded-lg p-6">
                <h4 className="text-gray-500">Total Sales</h4>
                <p className="text-2xl font-bold">₹0</p>
              </div>
              <div className="rounded-lg p-6">
                <h4 className="text-gray-500">Products</h4>
                <p className="text-2xl font-bold">1</p>
              </div>
              <div className="rounded-lg p-6">
                <h4 className="text-gray-500">Learners</h4>
                <p className="text-2xl font-bold">N/A</p>
              </div>
            </div>

            {/* Right Side - Scheduled Events */}
            <div className="border col-span-1 rounded-lg p-6 flex flex-col h-full">
              <h4 className="flex justify-between">
                <span className="font-bold mr-2">Scheduled Events</span>
                <span className="text-gray-400">00</span>
              </h4>
              <p className="mt-4 text-gray-500">No Scheduled Events</p>
              {/* Optional: Add any additional information here */}
            </div>

            {/* Navigation Section */}
            <div className="border col-span-3 grid grid-cols-4 gap-6">
      <nav className="flex space-x-6 px-4 py-2">
        <button
          className={`pb-3 ${activeButton === 'Sales' ? 'text-black border-b-2 border-customColor-light font-bold' : 'text-gray-500'}`}
          onClick={() => handleButtonClick('Sales')}
        >
          Sales
        </button>
        <button
          className={`pb-3 ${activeButton === 'Learners' ? 'text-black border-b-2 border-customColor-light font-bold' : 'text-gray-500'}`}
          onClick={() => handleButtonClick('Learners')}
        >
          Learners
        </button>
        <button
          className={`pb-3 ${activeButton === 'Orders' ? 'text-black border-b-2 border-customColor-light font-bold' : 'text-gray-500'}`}
          onClick={() => handleButtonClick('Orders')}
        >
          Orders
        </button>
        <button
          className={`pb-3 ${activeButton === 'Apps' ? 'text-black border-b-2 border-customColor-light font-bold' : 'text-gray-500'}`}
          onClick={() => handleButtonClick('Apps')}
        >
          Apps
        </button>
      </nav>
    </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Dashboard;
