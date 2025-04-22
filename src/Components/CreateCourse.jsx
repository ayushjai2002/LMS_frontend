import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const CreateCourse = () => {
  const navigate= useNavigate();
  const [name, setName] = useState(""); // Renamed to 'name' for course title
  const [description, setDescription] = useState(""); // Course description
  const [price, setPrice] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [encryption, setEncryption] = useState("encryption");
  const [instructor, setInstructor] = useState(1); // Default instructor is 1
  const base_url= process.env.REACT_APP_API_URL;
  console.warn('base', base_url)
  const handleSubmit = async () => {
    try {
        const token = localStorage.getItem('token')
        toast.success('Course Created')
        navigate('/dashboard/courses')

      if (!token) {
        navigate('sign-in')
        return;
      }

      // Prepare the course creation payload
      const courseData = {
        "name": name,
          "description":description,
          "instructor": instructor
      };

      // Post to course creation API
      const response = await axios.post(
        `${base_url}/courses/`,
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Use the access token
          },
        }
      );

      // if (response.status === 201) {
      //   alert("Course created successfully!");
      // } else {
      //   alert("Failed to create the course.");
      // }
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create the course.");
    }
  };

  return (
    <div className="p-8">
      <div className="text-xl font-bold mb-4">Create Course</div>
      <p className="text-gray-500 mb-6">Start creating a new course</p>

      {/* Name Input (Renamed from Title) */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Name*</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter course name"
          className="border border-gray-300 rounded p-2 w-full"
          maxLength={60}
        />
        <p className="text-right text-sm text-gray-400">{name.length}/60</p>
      </div>

      {/* Description Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter course description"
          className="border border-gray-300 rounded p-2 w-full"
          rows="4"
        />
      </div>

      {/* Instructor Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Instructor</label>
        <select
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        >
          {[...Array(30).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Price Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="₹ Price"
          className="border border-gray-300 rounded p-2 w-full"
          disabled={isFree}
        />
      </div>

      {/* Free Course Checkbox */}
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isFree}
            onChange={() => setIsFree(!isFree)}
            className="form-checkbox h-5 w-5 text-customColor-light"
          />
          <span className="ml-2 text-sm text-gray-700">Make this a free course</span>
        </label>
      </div>

      {/* Content Security Options */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Content Security</p>
        <div className="border rounded-lg p-4 mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="contentSecurity"
              value="encryption"
              checked={encryption === "encryption"}
              onChange={(e) => setEncryption(e.target.value)}
              className="form-radio h-5 w-5 text-customColor-light"
            />
            <span className="ml-2 text-sm">Encryption</span>
            <span className="ml-2 text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">Recommended</span>
          </label>
          <p className="ml-7 text-sm text-gray-500">
            Secure content will be encrypted using DRM system and will be protected against piracy.
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="contentSecurity"
              value="noEncryption"
              checked={encryption === "noEncryption"}
              onChange={(e) => setEncryption(e.target.value)}
              className="form-radio h-5 w-5 text-customColor-light"
            />
            <span className="ml-2 text-sm">No Encryption</span>
          </label>
          <p className="ml-7 text-sm text-gray-500">
            Content will not be encrypted, and users can download and share it.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleSubmit}
          className="bg-customColor-light text-white px-4 py-2 rounded"
        >
          CREATE
        </button>
        <button
          onClick={() => console.log("Canceled")}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default CreateCourse;
