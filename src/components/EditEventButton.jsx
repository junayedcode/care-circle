"use client";

import React, { useState } from "react";
import { toast } from "react-toastify/unstyled";
import { API_BASE, normalizeThumbnailUrl } from "@/lib/api";
import { authFetch } from "@/lib/auth-fetch";
import {
  containsBengaliScript,
  containsLatinLetters,
} from "@/lib/eventLanguage";

const initialFormData = {
  title: "",
  titleBn: "",
  type: "",
  typeBn: "",
  date: "",
  location: "",
  locationBn: "",
  thumbnail: "",
  description: "",
  descriptionBn: "",
};

const inputClass =
  "w-full min-w-0 max-w-full text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-500";

const labelClass = "block text-xs font-semibold text-gray-700 mb-1";

export default function EditEventButton({ eventId, onUpdateSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleOpenModal = async () => {
    setIsOpen(true);
    try {
      const res = await fetch(`${API_BASE}/event/${eventId}`, {
        cache: "no-store", // always edit the latest saved version
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();

        // Legacy records stored Bengali text in the English fields. Move that
        // real content into the Bengali fields so nothing is lost and English
        // mode no longer shows Bengali text as English.
        const migrate = (canonical, localized) => {
          const english = data[canonical] || "";
          const bengali = data[localized] || "";
          if (!bengali && containsBengaliScript(english)) {
            return { english: "", bengali: english };
          }
          return { english, bengali };
        };

        const title = migrate("title", "titleBn");
        const description = migrate("description", "descriptionBn");
        const location = migrate("location", "locationBn");
        const type = migrate("type", "typeBn");

        setFormData({
          title: title.english,
          titleBn: title.bengali,
          description: description.english,
          descriptionBn: description.bengali,
          location: location.english,
          locationBn: location.bengali,
          type: type.english || "Donation",
          typeBn: type.bengali || "দান",
          date: data.date || "",
          thumbnail: data.thumbnail || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch event details for editing:", error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const pairs = [
      ["title", "titleBn", "Title"],
      ["description", "descriptionBn", "Description"],
      ["location", "locationBn", "Location"],
    ];

    for (const [enField, bnField, label] of pairs) {
      if (!formData[enField]?.trim() || !formData[bnField]?.trim()) {
        toast.error(`${label} is required in both English and Bengali.`);
        return false;
      }
      if (containsBengaliScript(formData[enField])) {
        toast.error(
          "English fields must contain English text. Use the Bengali fields for Bengali content."
        );
        return false;
      }
      if (!containsBengaliScript(formData[bnField])) {
        toast.error(
          "Bengali fields must contain Bengali text. Use the English fields for English content."
        );
        return false;
      }
    }

    if (formData.type && containsBengaliScript(formData.type)) {
      toast.error(
        "English fields must contain English text. Use the Bengali fields for Bengali content."
      );
      return false;
    }
    if (formData.typeBn && containsLatinLetters(formData.typeBn)) {
      toast.error(
        "Bengali fields must contain Bengali text. Use the English fields for English content."
      );
      return false;
    }

    if (formData.thumbnail?.trim() && !normalizeThumbnailUrl(formData.thumbnail)) {
      toast.error("Please enter a valid image URL.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        thumbnail: normalizeThumbnailUrl(formData.thumbnail),
      };
      const res = await authFetch(`${API_BASE}/event/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsOpen(false);
        toast.success("Event updated successfully!");

        if (onUpdateSuccess) {
          onUpdateSuccess(eventId, payload);
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
        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold py-2.5 rounded-xl transition text-center text-xs border border-emerald-200 flex items-center justify-center w-full"
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-xl relative animate-fadeIn max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-lg font-bold"
            >
              ✕
            </button>

            <h2 className="text-xl font-extrabold text-gray-900 mb-1">
              Update Event
            </h2>
            <p className="text-xs text-gray-500 mb-6 break-words">
              Modify the English and Bengali details for your social service
              initiative.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* English content */}
              <div className="space-y-4">
                <h3 className="text-xs font-extrabold text-green-800 border-b border-green-100 pb-1">
                  English Content
                </h3>

                <div>
                  <label className={labelClass}>Title (English)</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Event Type (English)</label>
                    <input
                      type="text"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Event Date</label>
                    <input
                      type="text"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      placeholder="YYYY-MM-DD"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Location (English)</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Description (English)</label>
                  <textarea
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  ></textarea>
                </div>
              </div>

              {/* Bengali content */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-extrabold text-green-800 border-b border-green-100 pb-1">
                  বাংলা বিষয়বস্তু (Bengali Content)
                </h3>

                <div>
                  <label className={labelClass}>শিরোনাম (বাংলা)</label>
                  <input
                    type="text"
                    name="titleBn"
                    value={formData.titleBn}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>ধরণ (বাংলা)</label>
                  <input
                    type="text"
                    name="typeBn"
                    value={formData.typeBn}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>অবস্থান (বাংলা)</label>
                  <input
                    type="text"
                    name="locationBn"
                    value={formData.locationBn}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>বিবরণ (বাংলা)</label>
                  <textarea
                    name="descriptionBn"
                    rows="3"
                    value={formData.descriptionBn}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  ></textarea>
                </div>
              </div>

              {/* Shared image */}
              <div className="pt-2">
                <label className={labelClass}>Thumbnail Image URL</label>
                <input
                  type="url"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-gray-100">
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
