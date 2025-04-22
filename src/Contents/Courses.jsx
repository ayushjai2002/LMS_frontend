import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker
import { TrashIcon } from "@heroicons/react/solid";

const Courses = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]); // State for filtered courses
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editCourseData, setEditCourseData] = useState({
    name: "",
    description: "",
    instructor: "" // Added instructor field
  });

  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     // try {
  //     //   // Set loading state to true at the start
  //     //   setLoading(true);

  //     //   // Ensure token is present before making the request
  //     //   // if (!token) {
  //     //   //   throw new Error("Token is not provided");
  //     //   // }

  //     //   // const config = {
  //     //   //   headers: {
  //     //   //     Authorization: `Bearer ${token}`,
  //     //   //   },
  //     //   // };

  //     //   // API call to get all courses with authentication
  //     //   // const response = await axios.get(
  //     //   //   `${process.env.REACT_APP_API_URL}/courses/`,
  //     //   //   config
  //     //   // );

  //     //   console.log("Courses fetched:", response.data);

  //     //   // Update state with fetched data
  //     //   setCourses(response.data);
  //     //   setFilteredCourses(response.data);
  //     // } catch (err) {
  //     //   // Handle and log errors
  //     //   console.error(
  //     //     "Error fetching courses:",
  //     //     err.response ? err.response.data : err.message
  //     //   );
  //     //   setError("Error fetching courses");
  //     // } finally {
  //     //   // Ensure loading is false regardless of success or error
  //     //   setLoading(false);
  //     // }
  //   };

  //   fetchCourses();
  // }, [token]);

  const startEditCourse = (course) => {
    setEditMode(course.id); // Set the course ID in edit mode
    setEditCourseData({
      name: course.name,
      description: course.description,
      instructor: course.instructor || "" // Initialize instructor field
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCourseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateCourse = async (courseId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/courses/${courseId}/`,
        editCourseData, // Send updated course data including instructor
        config
      );

      // Update the local state after updating course successfully
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === courseId ? { ...course, ...editCourseData } : course
        )
      );
      setEditMode(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // API call to delete the course by ID
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/courses/${courseId}/`,
        config
      );

      // Remove the deleted course from the state
      setCourses(courses.filter((course) => course.id !== courseId));
      setFilteredCourses(filteredCourses.filter((course) => course.id !== courseId)); // Update filteredCourses too
      console.log(`Course with ID ${courseId} deleted successfully`);
    } catch (err) {
      console.error(
        "Error deleting course:",
        err.response ? err.response.data : err.message
      );
    }
  };
  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (searchTerm.trim() === "") {
      // If search is empty, reset the filtered courses
      setFilteredCourses(courses);
    } else {
      // Filter courses based on search term (case-insensitive)
      const filtered = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  const handleAddFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const applyFilter = () => {
    console.log("Filter applied with value: ", filterValue);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
    console.log("Selected Date: ", date);
  };

  const navigateToCreateCourse = () => {
    navigate("/create-course"); // Navigate to the Create Course page
  };

  return (
    <div className="p-8">
      <div className="text-2xl font-bold mb-2">Courses</div>
      <div className="text-gray-500 mb-4">Welcome to your course dashboard</div>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          // value={searchTerm}
          // onChange={handleSearchChange} // Handle search input
          placeholder="Search by Title (alt+k or cmd+k)"
          className="border border-gray-300 rounded p-2 w-96"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          // onClick={handleSearchClick} // Handle search click
        >
          Search
        </button>
        <button
          // onClick={handleAddFilterClick}
          className="border border-blue-500 text-blue-500 px-4 py-2 rounded flex items-center space-x-1"
        >
          <span>Add Filter</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 00-.832.445L5.055 8.938a1 1 0 00-.055 1.062l4 7A1 1 0 0010 17h.01a1 1 0 00.832-.445L14.945 12.06a1 1 0 00.055-1.062l-4-7A1 1 0 0010 3zm0 2.276L13.445 10l-3.557 6.224L6.555 10 10 5.276z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {showFilter && (
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Enter filter"
            // value={filterValue}
            // onChange={handleFilterChange}
            className="border border-gray-300 rounded p-2 w-96"
          />
          <button
            onClick={applyFilter}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Apply Filter
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <div></div>
        <div className="flex space-x-4">
          <button
            className="border border-gray-300 text-gray-500 px-4 py-2 rounded"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            Filter by Published Date
          </button>
          <button
            onClick={navigateToCreateCourse}
            className="bg-customColor-light text-white px-4 py-2 rounded"
          >
            + CREATE
          </button>
        </div>
      </div>

      {showDatePicker && (
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className="border border-gray-300 rounded p-2"
          placeholderText="Select a date"
          showYearDropdown
          scrollableYearDropdown
        />
      )}

      
    </div>
  );
};

export default Courses;
