import React, { useState } from "react";

const CreateTestSeries = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [encryption] = useState("encryption");

  const handleSubmit = () => {
    // Logic to handle course creation can go here
    console.log("Course Created:", { title, price, isFree, encryption });
  };

  return (
    <div className="p-8">
      <div className="text-xl font-bold mb-4">Create Test Series</div>
      <p className="text-gray-500 mb-6">Start creating a new test series</p>

      {/* Title Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Title*</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter test series title"
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
          <span className="ml-2 text-sm text-gray-700">Make it a free test series</span>
        </label>
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

export default CreateTestSeries;
