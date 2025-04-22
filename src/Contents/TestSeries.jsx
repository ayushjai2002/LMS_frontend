import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom"; // Import useHistory
import "react-datepicker/dist/react-datepicker.css";  // Import the CSS for the date picker

const TestSeries = () => {
    const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

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
    navigate("/create-test-series"); // Navigate to the Create Course page
  };

  return (
    <div className="p-8">
      <div className="text-2xl font-bold mb-2">Test Series</div>
      <div className="text-gray-500 mb-4">Welcome to your test series dashboard</div>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by Title (alt+k or cmd+k)"
          className="border border-gray-300 rounded p-2 w-96"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
        <button
          onClick={handleAddFilterClick}
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
            value={filterValue}
            onChange={handleFilterChange}
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
            onClick={navigateToCreateCourse} // Use the navigate function on click
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

      <div className="bg-gray-100 h-64 flex items-center justify-center">
        <p className="text-gray-400">No results found</p>
      </div>
    </div>
  );
};

export default TestSeries;
