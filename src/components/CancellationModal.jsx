import React, { useState } from "react";
import axios from "axios";

export default function CancellationModal({ booking, onClose, onSuccess }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reason.trim()) {
      setError("Please provide a reason for cancellation");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/cancellations/request",
        {
          bookingId: booking.id,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setTimeout(() => {
        onSuccess?.(response.data);
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to request cancellation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <h2 className="text-2xl font-bold mb-4">Cancel Booking</h2>

        {success ? (
          <div className="text-center py-6">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <p className="text-lg font-semibold text-gray-800">
              Cancellation request submitted!
            </p>
            <p className="text-gray-600 mt-2">
              We'll review your request and notify you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-3">
                  Booking: <span className="font-semibold">{booking.id}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Hotel: <span className="font-semibold">{booking.hotelName}</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Cancellation *
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please tell us why you want to cancel..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="4"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded-lg text-sm text-blue-700">
                Once approved, your refund will be processed within 5-7 business days.
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Keep Booking
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
              >
                {loading ? "Requesting..." : "Request Cancellation"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
