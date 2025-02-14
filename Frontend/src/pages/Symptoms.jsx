import React, { useState } from "react";
import axios from "axios";
import symptoms from "../symptoms.json";

const Symptoms = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]); // Stores only English names
  const [searchTerm, setSearchTerm] = useState("");
  const [response, setResponse] = useState(null); // State to store the server response
  const [loading, setLoading] = useState(false); // Loading state for the POST request

  // Filter the symptoms based on the search term
  const filteredSymptoms = symptoms
    .filter(
      (symptom) =>
        symptom.English.toLowerCase().includes(searchTerm.toLowerCase()) ||
        symptom.Hindi.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 20); // Limit to top 20 symptoms

  const toggleSymptom = (symptom) => {
    // Check if the symptom is already selected
    if (selectedSymptoms.includes(symptom.English)) {
      // If already selected, remove it
      setSelectedSymptoms(
        selectedSymptoms.filter((s) => s !== symptom.English)
      );
    } else {
      // If not selected, add it
      setSelectedSymptoms([...selectedSymptoms, symptom.English]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send only the English names of the selected symptoms
      const response = await axios.post(
        "http://localhost:8008/predict-via-symptoms",
        { symptoms: selectedSymptoms }
      );
      setResponse(response.data[0]); // Store the response from the backend
    } catch (error) {
      setResponse(
        "No diseases found matching all given symptoms in our database."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle "Try Again" button click
  const handleTryAgain = () => {
    setResponse(null); // Clear the response
    setSelectedSymptoms([]); // Clear the selected symptoms
    setSearchTerm(""); // Clear the search term
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-3xl font-semibold mb-4 text-center">
        {response ? "Your Result" : "Select Your Symptoms"}
      </h2>

      {/* If response is null (no prediction yet), show symptom selection */}
      {!response ? (
        <>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search symptoms..."
            className="border px-4 py-2 rounded-full mb-4 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Selected Symptoms Display */}
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedSymptoms.map((symptom, index) => (
              <span
                key={index}
                className="bg-[#01C38E] text-white px-4 py-2 rounded-full cursor-pointer"
                onClick={() => toggleSymptom({ English: symptom })}
              >
                {symptom} ✕
              </span>
            ))}
          </div>

          {/* Symptoms Selection List */}
          <h3 className="text-lg font-medium mb-2">Popular Symptoms</h3>
          <div className="flex flex-wrap gap-2">
            {filteredSymptoms.map((symptom, index) => (
              <button
                key={index}
                className={`border px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 ${
                  selectedSymptoms.includes(symptom.English)
                    ? "bg-[#01C38E] text-white"
                    : ""
                }`}
                onClick={() => toggleSymptom(symptom)}
              >
                {symptom.English} ({symptom.Hindi}) +
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="bg-[#024E56] text-white px-6 py-3 rounded-lg w-full hover:bg-[#132D46]"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Symptoms"}
            </button>
          </div>
        </>
      ) : (
        // Show the response once the symptoms are submitted
        <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
          {response?.disease && (
            <h3 className="text-lg font-semibold">Predicted Disease:</h3>
          )}
          <p className="font-medium text-blue-600">
            {response?.disease ? response?.disease : null}
          </p>
          {response.formatted_response && (
            <h3 className="text-lg font-semibold mt-2">Details:</h3>
          )}
          <p
            className={`${
              !response.formatted_response
                ? "text-center font-bold text-xl"
                : ""
            }`}
          >
            {response?.formatted_response
              ? response.formatted_response
              : response}
          </p>

          {/* "Try Again" button */}
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleTryAgain}
              className="bg-green-500 text-white px-6 py-3 rounded-lg w-full hover:bg-gray-600"
            >
              Go Back
            </button>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-gray-600">
              Print
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Symptoms;
