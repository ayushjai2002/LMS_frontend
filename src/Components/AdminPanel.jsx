import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle, FaCog, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

const AdminPanel= () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [username, setUsername] = useState("User");
  const navigate = useNavigate(); // Use navigate to handle routing

  useEffect(() => {
    // Example: Fetching username from an API
    const fetchUsername = async () => {
      const response = await fetch("/api/profile"); // Replace with actual API
      const data = await response.json();
      setUsername(data.username); // Assuming the API returns { username: "John Doe" }
    };

    fetchUsername();
  }, []);

  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSubMenu = () => setIsSubMenuOpen(!isSubMenuOpen);

  const SidebarItem = ({ icon, label, hasSubmenu = false, submenuItems }) => {
    const handleItemClick = (item) => {
      switch(item) {
        case 'Dashboard':
          navigate('/dashboard');
          break;
        case 'Courses':
          navigate('/dashboard/courses');
          break;
        case 'Live Classes':
          navigate('/dashboard/live-classes');
          break;
        case 'Mock Test':
          navigate('/dashboard/mock-test');
          break;
        case 'Test Series':
          navigate('/dashboard/test-series');
          break;
        case 'Bundles':
          navigate('/dashboard/bundles');
          break;
        case 'Batch':
          navigate('/dashboard/batch');
          break;
        case 'Ebooks':
          navigate('/dashboard/ebooks');
          break;
        case 'Podcasts':
          navigate('/dashboard/podcasts');
          break;
        case 'Webinar':
          navigate('/dashboard/webinar');
          break;
        case 'Digital Products':
          navigate('/dashboard/digital-products');
          break;
        case 'Websites & Apps':
          navigate('/dashboard/websites');
          break;
        case 'Marketing':
          navigate('/dashboard/marketing');
          break;
        case 'Users':
          navigate('/dashboard/users');
          break;
        case 'Reports':
          navigate('/dashboard/reports');
          break;
        case 'Manage':
          navigate('/dashboard/manage');
          break;
        case 'Add-Ons':
          navigate('/dashboard/add-ons');
          break;
        case 'Piracy Monitor':
          navigate('/dashboard/piracy-monitor');
          break;
        case 'Sub-Schools':
          navigate('/dashboard/sub-schools');
          break;
        case 'Settings':
          navigate('/dashboard/settings');
          break;
        default:
          break;
      }
    };

    return (
      <>
        <li
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center"
          onClick={hasSubmenu ? toggleSubMenu : () => handleItemClick(label)}
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
      </div>
    </div>
  );
};

export default AdminPanel;
