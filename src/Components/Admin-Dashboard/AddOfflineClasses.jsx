import React, { useState } from "react";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

const AddOfflineClasses = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    timings: "",
    location: "",
    classesDays: "",
  });

  const [errors, setErrors] = useState({}); // Object to hold validation errors

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when the user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.classesDays)
      newErrors.classesDays = "Class days are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    // Combine startTime and endTime into a single string
    const timings = `${formData.startTime} - ${formData.endTime}`;

    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("description", formData.description);
    formPayload.append("timings", timings);
    formPayload.append("location", formData.location);
    formPayload.append("classesDays", formData.classesDays);

    try {
      const response = await axios.post(
        `${backend}/admin/offlineClasses/create`,
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Offline class details created successfully!");

      setFormData({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        timings: "",
        location: "",
        classesDays: "",
      });
      setErrors({}); // Clear errors
    } catch (error) {
      console.error("Error submitting Offline Class:", error);
      alert("Failed to submit the offline class. Please try again.");
    }
  };

  return (
    <div className="w-full h-auto flex flex-col justify-start items-center bg-[#fff4dc]">
      <div className="w-full h-auto rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-6">
          {/* Left Section */}
          <div className="w-full flex justify-between items-center">
            <h2 className="text-2xl font-semibold mb-2">Add Offline Class</h2>
            <div className="flex justify-end gap-2 mb-4">
              <button
                onClick={handleSubmit}
                className="bg-orange-500 text-white px-4 py-1 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>

          <div>
            <div className="w-full">
              <div className="rounded-xl p-4">
                {/* Buttons */}

                {/* Form Fields */}
                <form className="space-y-4">
                  <div className="flex gap-4">
                    <label className="block w-[15%] text-black font-bold">
                      Class Title
                    </label>
                    <div className="w-full">
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full border border-orange-300 rounded-lg p-2"
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.title}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <label className="block w-[15%] text-black font-bold">
                      Description
                    </label>
                    <div className="w-full">
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-2 h-24 resize-none"
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex gap-4">
                      <label className="block w-[15%] text-black font-bold">
                        Timings
                      </label>
                      <div className="w-full flex gap-4">
                        {/* Start Time Input */}
                        <div className="w-1/2">
                          <input
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg p-2"
                          />
                          {errors.startTime && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.startTime}
                            </p>
                          )}
                        </div>

                        {/* End Time Input */}
                        <div className="w-1/2">
                          <input
                            type="time"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg p-2"
                          />
                          {errors.endTime && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.endTime}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <label className="block w-[15%] text-black font-bold">
                        Location
                      </label>
                      <div className="w-full">
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg p-2"
                        />
                        {errors.location && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <label className="block w-[15%] text-black font-bold">
                      Class Days
                    </label>
                    <div className="w-full">
                      <input
                        type="text"
                        name="classesDays"
                        value={formData.classesDays}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-2"
                      />
                      {errors.classesDays && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.classesDays}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOfflineClasses;