import React, { useState } from "react";
import axios from "axios";
import symptoms from "../symptoms.json";
import ReactMarkdown from "react-markdown";

const Symptoms = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const filteredSymptoms = symptoms
    .filter(
      (symptom) =>
        symptom.English.toLowerCase().includes(searchTerm.toLowerCase()) ||
        symptom.Hindi.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 20);

  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom.English)) {
      setSelectedSymptoms(
        selectedSymptoms.filter((s) => s !== symptom.English)
      );
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom.English]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8008/predict-via-symptoms",
        { symptoms: selectedSymptoms }
      );
      setResponse(response.data[0]);
    } catch (error) {
      setResponse(
        "No diseases found matching all given symptoms in our database."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setResponse(null);
    setSelectedSymptoms([]);
    setSearchTerm("");
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-3xl font-semibold mb-4 text-center">
        {response ? "Your Result" : "Select Your Symptoms"}
      </h2>

      {!response ? (
        <>
          <input
            type="text"
            placeholder="Search symptoms..."
            className="border px-4 py-2 rounded-full mb-4 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex flex-wrap gap-2 mb-4">
            {selectedSymptoms.map((symptom, index) => (
              <span
                key={index}
                className="bg-blue-600 text-white px-4 py-2 rounded-full cursor-pointer"
                onClick={() => toggleSymptom({ English: symptom })}
              >
                {symptom} ✕
              </span>
            ))}
          </div>

          <h3 className="text-lg font-medium mb-2">Popular Symptoms</h3>
          <div className="flex flex-wrap gap-2">
            {filteredSymptoms.map((symptom, index) => (
              <button
                key={index}
                className={`border px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 ${
                  selectedSymptoms.includes(symptom.English)
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                onClick={() => toggleSymptom(symptom)}
              >
                {symptom.English} ({symptom.Hindi}) +
              </button>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-6 py-3 rounded-lg w-full hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Symptoms"}
            </button>
          </div>
        </>
      ) : (
        <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
          {response?.disease && (
            <h3 className="text-lg font-semibold">Predicted Disease:</h3>
          )}
          <p className="font-medium text-blue-600">
            {response?.disease ? response?.disease : null}
          </p>

          {response?.formatted_response && (
            <div className="mt-2">
              <h3 className="text-lg font-semibold">Details:</h3>
              <ReactMarkdown className="prose">
                {response.formatted_response}
              </ReactMarkdown>
            </div>
          )}

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
