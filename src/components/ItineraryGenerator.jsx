import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function ItineraryGenerator({ hotelId, hotelName, checkIn, checkOut }) {
  const [showGenerator, setShowGenerator] = useState(false);
  const [interests, setInterests] = useState([]);
  const [budget, setBudget] = useState("moderate");
  const [travelStyle, setTravelStyle] = useState("balanced");
  const [groupSize, setGroupSize] = useState("couple");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [savedItineraries, setSavedItineraries] = useState([]);

  const interestOptions = [
    "Culture & History",
    "Food & Dining",
    "Nature & Adventure",
    "Shopping",
    "Nightlife",
    "Wellness & Spa",
    "Art & Museums",
    "Beach & Water Sports",
  ];

  const handleInterestToggle = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const generateItinerary = async () => {
    if (interests.length === 0) {
      setError("Please select at least one interest");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/itinerary/generate",
        {
          hotelId,
          checkIn,
          checkOut,
          interests,
          budget,
          travelStyle,
          groupSize,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItinerary(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to generate itinerary"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveItinerary = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `/api/itinerary/${itinerary.id}`,
        { bookmarked: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Itinerary saved!");
    } catch (err) {
      alert("Failed to save itinerary");
    }
  };

  return (
    <div className="w-full">
      {/* Generator Button */}
      <button
        onClick={() => setShowGenerator(!showGenerator)}
        className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 justify-center"
      >
        <span>✈️</span>
        <span>Generate AI Itinerary</span>
      </button>

      {/* Generator Form */}
      {showGenerator && !itinerary && (
        <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Create Your Personalized Itinerary
          </h3>

          {/* Interests Selection */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              What are you interested in? (Select at least one)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    interests.includes(interest)
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-blue-300"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Selection */}
          <div className="mb-8 grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Daily Budget
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="budget">Budget (Under $100)</option>
                <option value="moderate">Moderate ($100-300)</option>
                <option value="upscale">Upscale ($300-500)</option>
                <option value="luxury">Luxury ($500+)</option>
              </select>
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Travel Style
              </label>
              <select
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="relaxed">Relaxed (Take it slow)</option>
                <option value="balanced">Balanced (Mix of activities)</option>
                <option value="adventure">Adventure (Packed schedule)</option>
              </select>
            </div>
          </div>

          {/* Group Size */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Who are you traveling with?
            </label>
            <div className="flex gap-4">
              {["solo", "couple", "family", "group"].map((size) => (
                <button
                  key={size}
                  onClick={() => setGroupSize(size)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all capitalize ${
                    groupSize === size
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={generateItinerary}
              disabled={loading || interests.length === 0}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold transition-all"
            >
              {loading ? "Generating..." : "Generate Itinerary"}
            </button>
            <button
              onClick={() => setShowGenerator(false)}
              className="flex-1 px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Itinerary Display */}
      {itinerary && (
        <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">{itinerary.hotelName}</h2>
            <p className="text-blue-100">
              {new Date(itinerary.checkIn).toLocaleDateString()} -{" "}
              {new Date(itinerary.checkOut).toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="p-8 prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ ...props }) => (
                  <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
                ),
                h2: ({ ...props }) => (
                  <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
                ),
                h3: ({ ...props }) => (
                  <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />
                ),
                p: ({ ...props }) => (
                  <p className="text-gray-700 mb-4 leading-relaxed" {...props} />
                ),
                ul: ({ ...props }) => (
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2" {...props} />
                ),
                li: ({ ...props }) => <li className="ml-4" {...props} />,
              }}
            >
              {itinerary.content}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 p-6 flex gap-4">
            <button
              onClick={handleSaveItinerary}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-all"
            >
              ❤️ Save Itinerary
            </button>
            <button
              onClick={() => {
                setItinerary(null);
                setShowGenerator(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex-1 px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-semibold"
            >
              Generate New
            </button>
            <button
              onClick={() => {
                const element = document.createElement("a");
                const file = new Blob([itinerary.content], {
                  type: "text/plain",
                });
                element.href = URL.createObjectURL(file);
                element.download = `itinerary-${itinerary.id}.txt`;
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
              className="flex-1 px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-semibold"
            >
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
