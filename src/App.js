import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Pages/Signup/SignUp';
import SignIn from './Pages/SignIn';
import Dashboard from './Pages/Dashboard';
import OtpButton from './Pages/OtpButton';
import Courses from './Contents/Courses';
import CreateCourse from './Components/CreateCourse';
import ForgotPassword from './Pages/ForgotPassword'; // Import the Forgot Password page
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LiveClasses from './Contents/LiveClasses';
import MockTest from './Contents/MockTest';
import CreateMockTest from './Components/CreateMockTest';
import TestSeries from './Contents/TestSeries';
import CreateTestSeries from './Components/CreateTestSeries';
import ResetButton from './Pages/ResetButton';


function App() {
    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<SignIn />} /> {/* Default route can be to SignIn */}
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/otp-button" element={<OtpButton />} />
                <Route path="/forgot-password/reset-button" element={<ResetButton />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/courses" element={<Courses />} />
                <Route path="/dashboard/live-classes" element={<LiveClasses />} />
                <Route path="/dashboard/mock-test" element={<MockTest />} />
                <Route path="/dashboard/test-series" element={<TestSeries />} />
                <Route path="/create-course" element={<CreateCourse />} />
                <Route path="/create-mock-test" element={<CreateMockTest />} />
                <Route path="/create-test-series" element={<CreateTestSeries />} />
            </Routes>
        </Router>
    );
}

export default App;
