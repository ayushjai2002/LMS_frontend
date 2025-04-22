import React, { useState } from "react";

const CreateMockTest = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [encryption, setEncryption] = useState("encryption");
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = () => {
    // Logic to handle course creation can go here
    console.log("Course Created:", { title, price, isFree, encryption });
  };

  return (
    <div className="p-8">
      <div className="text-xl font-bold mb-4">Create Mock Test</div>
      <p className="text-gray-500 mb-6">Start creating a new mock test</p>

      {/* Title Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Title*</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter mock test title"
          className="border border-gray-300 rounded p-2 w-full"
          maxLength={60}
        />
        <p className="text-right text-sm text-gray-400">{title.length}/60</p>
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
          <span className="ml-2 text-sm text-gray-700">Make this a free mock test</span>
        </label>
      </div>

      {/* Content Security Options */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Quiz Type</p>
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
            <span className="ml-2 text-sm">Online Quiz</span>
            {/* <span className="ml-2 text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">Recommended</span> */}
          </label>
          <p className="ml-7 text-sm text-gray-500">
          Create online quiz by using competitive exam template
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
            <span className="ml-2 text-sm">Offline Quiz</span>
          </label>
          <p className="ml-7 text-sm text-gray-500">
          Create offline quiz using essay type questions & digitally evaluate the answers
          </p>
        </div>
      </div>
      <div className="p-3">
      {/* Paragraph */}
      <p className="text-sm font-medium mb-2">
      Select Template
      </p>

      {/* Search Text Field */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="w-80 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
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

export default CreateMockTest;
