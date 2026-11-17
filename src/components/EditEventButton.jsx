"use client";

import React, { useState } from "react";
import { toast } from "react-toastify/unstyled";
import { API_BASE } from "@/lib/api";
import { authFetch } from "@/lib/auth-fetch";

export default function EditEventButton({ eventId, onUpdateSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    date: "",
    location: "",
    thumbnail: "",
    description: "",
  });

  const handleOpenModal = async () => {
    setIsOpen(true);
    try {
      const res = await fetch(`${API_BASE}/event/${eventId}`, {
        cache: "no-store", // always edit the latest saved version
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setFormData({
          title: data.title || "",
          type: data.type || "",
          date: data.date || "",
          location: data.location || "",
          thumbnail: data.thumbnail || "",
          description: data.description || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch event details for editing:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authFetch(`${API_BASE}/event/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsOpen(false);
        toast.success("Event updated successfully!");
        
        if (onUpdateSuccess) {
          onUpdateSuccess(eventId, formData);
        }
      } else {
        let message = "Failed to update event";
        try {
          const data = await res.json();
          if (data?.message || data?.error) message = data.message || data.error;
        } catch {
          /* non-JSON error body */
        }
        toast.error(message);
      }
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold py-2.5 rounded-xl transition text-center text-xs border border-emerald-200 flex items-center justify-center"
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl relative animate-fadeIn max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-lg font-bold"
            >
              ✕
            </button>

            <h2 className="text-xl font-extrabold text-gray-900 mb-1">Update Event</h2>
            <p className="text-xs text-gray-500 mb-6">Modify the details for your social service initiative.</p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Event Type</label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Event Date</label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Thumbnail Image URL</label>
                <input
                  type="text"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  className="w-full text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-sm"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
}