"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

const DeleteEventButton = ({ eventId, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/event/${eventId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Event deleted successfully!");
        if (onDeleteSuccess) onDeleteSuccess(eventId);
      } else {
        toast.error(data.message || "Failed to delete event");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2.5 rounded-xl transition text-center text-xs border border-red-200 disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteEventButton;