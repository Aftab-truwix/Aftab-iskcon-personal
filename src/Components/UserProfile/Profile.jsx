
import React, { useEffect, useState } from "react";
import BgOne from "../../assets/bg2.webp";
import BgTwo from "../../assets/bg1.webp";
import Navbar from "../Navbar";
import TextField from "@mui/material/TextField";
import { FormControl, MenuItem, Select } from "@mui/material";
import { FormLabel, Radio, RadioGroup, FormControlLabel } from "@mui/material";

const backend = import.meta.env.VITE_BACKEND_URL;

function Profile() {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    whatsappNumber: "",
    dob: "",
    panNumber: "",
    maritalStatus: "",
    citizenType: "Indian",
    gender: "male",
    address: "",
    country: "India",
    state: "",
    pincode: "",
    relationships: [{ relation: "", name: "", mobile: "", dob: "" }],
    occasions: [{ action: "", name: "", date: "" }],
    idProof: {
      aadhaarNumber: "",
      drivingLicense: "",
      voterId: "",
      otherId: "",
    },
  });

  const indiaStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
  ];

  // Fetch user data from the backend
  const fetchUserData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await fetch(`${backend}/secure/decode`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }

      const data = await response.json();
      setUser(data);
      setFormData((prev) => ({
        ...prev,
        name: data?.userData?.name || "",
        email: data?.userData?.email || "",
      }));
    } catch (error) {
      console.error("❌ Error fetching user data:", error);
    }
  };

  const fetchUserProfile = async (email) => {

    try {
      // Make a GET request to the backend API
      const response = await fetch(`${backend}/admin/profile?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
      setProfile(data.profile);
  
      // Return the profile data
      return data.profile;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error; // Re-throw the error for handling in the calling function
    }
  };


  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user?.userData?.email) {
      fetchUserProfile(user.userData.email)
        .then((profile) => {
          console.log("Fetched profile:", profile);
        })
        .catch((error) => {
          console.error("Failed to fetch profile:", error);
        });
    } else {
      console.log("Email is undefined or user data is not available yet.");
    }
  }, [user?.userData?.email]); // Add dependency to re-run when email changes

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle relationship changes
  const handleRelationshipChange = (index, e) => {
    const { name, value } = e.target;
    const newRelationships = [...formData.relationships];
    newRelationships[index][name] = value;
    setFormData((prev) => ({
      ...prev,
      relationships: newRelationships,
    }));
  };

  const handleAddRelationship = () => {
    setFormData((prev) => ({
      ...prev,
      relationships: [
        ...prev.relationships,
        { relation: "", name: "", mobile: "", dob: "" },
      ],
    }));
  };

  const handleDeleteRelationship = (index) => {
    const newRelationships = formData.relationships.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      relationships: newRelationships,
    }));
  };

  // Handle occasion changes
  const handleOccasionChange = (index, e) => {
    const { name, value } = e.target;
    const newOccasions = [...formData.occasions];
    newOccasions[index][name] = value;
    setFormData((prev) => ({
      ...prev,
      occasions: newOccasions,
    }));
  };

  const handleAddOccasion = () => {
    setFormData((prev) => ({
      ...prev,
      occasions: [
        ...prev.occasions,
        { action: "", name: "", date: "" },
      ],
    }));
  };

  const handleDeleteOccasion = (index) => {
    const newOccasions = formData.occasions.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      occasions: newOccasions,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backend}/admin/profile/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert("Profile created successfully!");
    } catch (error) {
      console.error("Error creating profile:", error);
      alert("Failed to create profile. Please try again.");
    }
  };

  return (
    <div
      className="w-full h-auto flex flex-col bg-[#fde3b6]"
      style={{
        backgroundImage: `url(${BgOne})`,
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <div className="px-4 md:px-20 pt-4 pb-10 z-10 relative">
        <Navbar />
      </div>

      <div className="w-full h-auto flex flex-col px-5 md:px-10 lg:px-20 gap-8">
        <div
          className="w-full h-auto flex bg-[#eb852c] p-4 sm:p-6 rounded-xl shadow-lg relative md:h-[140px] lg:h-[160px] xl:h-[180px]"
          style={{
            backgroundImage: `url(${BgTwo})`,
            backgroundPosition: "right",
            backgroundSize: "contain",
          }}
        >
          <div className="w-full h-auto flex flex-col sm:gap-1 md:hidden">
            <span className="font-semibold text-white font-prata sm:text-xl">
              {user?.userData?.name}
            </span>
            <span className="text-gray-200 font-poppins text-sm sm:text-base">
              Manage your Profile Here
            </span>
          </div>
          <div className="w-auto h-auto p-4 absolute -bottom-14 hidden md:flex gap-4 left-20 lg:left-40 xl:gap-6">
            <div className="flex justify-center items-center w-24 h-24 rounded-full border-[5px] border-gray-100 shadow-md lg:w-28 lg:h-28">
              <img
                src=""
                alt=""
                className="bg-gray-300 rounded-full w-full h-full"
              />
            </div>
            <div className="w-auto h-auto flex flex-col pt-1 text-white lg:pt-3">
              <span className="font-semibold font-prata text-xl lg:text-2xl">
                {user?.userData?.name}
              </span>
              <span className="font-poppins font-medium text-base lg:text-lg">
                {user?.userData?.email}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Details Section */}
          <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 md:grid-cols-4 md:mt-10">
            <TextField
              label="Name"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              className="bg-white rounded-md"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              className="bg-white rounded-md"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Mobile"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              className="bg-white rounded-md"
              name="mobile"
              value={formData.mobile || profile.mobile || ""}
              onChange={handleInputChange}
            />
            <TextField
              label="Whatsapp Number"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              className="bg-white rounded-md"
              name="whatsappNumber"
              value={formData.whatsappNumber || profile.whatsappNumber || ""}
              onChange={handleInputChange}
            />
            <TextField
              label="Date of Birth"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              className="bg-white rounded-md h-14"
              name="dob"
              value={formData.dob || profile.dob || ""}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Pan Number"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              className="bg-white rounded-md h-14"
              name="panNumber"
              value={formData.panNumber || profile.panNumber || ""}
              onChange={handleInputChange}
            />
            <FormControl fullWidth>
              <Select
                value={formData.maritalStatus || profile.maritalStatus || ""}
                onChange={handleInputChange}
                className="bg-white rounded-md my-4"
                displayEmpty
                name="maritalStatus"
                renderValue={(selected) => selected || <em>Marital Status</em>}
              >
                <MenuItem value="">
                  <em>Select a Marital Status</em>
                </MenuItem>
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
                <MenuItem value="Widow">Widowed</MenuItem>
                <MenuItem value="Divorced">Divorced</MenuItem>
                <MenuItem value="Separated">Separated</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Citizen Type and Gender Section */}
          <div className="w-full h-auto flex flex-col gap-4 sm:flex-row sm:gap-10 md:gap-20 lg:gap-28 xl:gap-40">
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend" className="text-gray-500">
                Citizen Type
              </FormLabel>
              <RadioGroup
                row
                aria-label="citizenType"
                name="citizenType"
                value={formData.citizenType || profile.citizenType || ""}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="Indian"
                  control={<Radio />}
                  label="Indian"
                />
                <FormControlLabel
                  value="Foreigner"
                  control={<Radio />}
                  label="Foreigner"
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={formData.gender || profile.gender || ""}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </div>

          {/* Address Section */}
          <div className="w-full h-auto flex flex-col">
            <h1 className="text-lg font-semibold font-poppins">Address</h1>
            <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 md:grid-cols-4">
              <TextField
                label="Address"
                type="text"
                variant="outlined"
                fullWidth
                margin="normal"
                className="bg-white rounded-md"
                name="address"
                value={formData.address || profile.address || ""}
                onChange={handleInputChange}
              />
              <FormControl fullWidth>
                <Select
                  value="India"
                  className="bg-white rounded-md mt-4"
                  displayEmpty
                  disabled
                  renderValue={(selected) => selected || <em>Country</em>}
                >
                  <MenuItem value="India">India</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <Select
                  value={formData.state || profile.state || ""}
                  onChange={handleInputChange}
                  className="bg-white rounded-md mt-4"
                  displayEmpty
                  name="state"
                  renderValue={(selected) => selected || <em>State</em>}
                >
                  <MenuItem value="">
                    <em>Select a State</em>
                  </MenuItem>
                  {indiaStates.map((state, index) => (
                    <MenuItem key={index} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Pincode"
                type="text"
                variant="outlined"
                fullWidth
                margin="normal"
                className="bg-white rounded-md"
                name="pincode"
                value={formData.pincode || profile.pincode || ""}
                onChange={(e) => {
                  if (/^\d{0,6}$/.test(e.target.value)) {
                    handleInputChange(e);
                  }
                }}
                inputProps={{
                  maxLength: 6,
                  inputMode: "numeric",
                }}
                helperText={
                  formData.pincode.length === 6
                    ? ""
                    : "Pincode must be exactly 6 digits"
                }
                error={formData.pincode.length !== 6}
              />
            </div>
          </div>

          {/* Relationships Section */}
          <div className="w-full h-auto flex flex-col">
            <div className="w-full h-auto flex gap-4 items-center">
              <h1 className="text-lg font-semibold font-poppins">
                Your Relationship
              </h1>
              <button
                type="button"
                onClick={handleAddRelationship}
                className="bg-[#e7822b] text-sm px-4 py-1 rounded-lg font-nunito text-white"
              >
                Add More
              </button>
            </div>
            {formData.relationships.map((relationship, index) => (
              <div
                key={index}
                className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 md:grid-cols-4"
              >
                <FormControl fullWidth>
                  <Select
                    name="relation"
                    value={relationship.relation }
                    onChange={(e) => handleRelationshipChange(index, e)}
                    className="bg-white rounded-md mt-4"
                    displayEmpty
                    renderValue={(selected) => selected || <em>Relation</em>}
                  >
                    <MenuItem value="">
                      <em>Select a Relation</em>
                    </MenuItem>
                    <MenuItem value="Father">Father</MenuItem>
                    <MenuItem value="Mother">Mother</MenuItem>
                    <MenuItem value="Brother">Brother</MenuItem>
                    <MenuItem value="Cousin">Cousin</MenuItem>
                    <MenuItem value="Aunt">Aunt</MenuItem>
                    <MenuItem value="Sister">Sister</MenuItem>
                    <MenuItem value="Husband">Husband</MenuItem>
                    <MenuItem value="GrandFather">GrandFather</MenuItem>
                    <MenuItem value="GrandSon">GrandSon</MenuItem>
                    <MenuItem value="Daughter">Daughter</MenuItem>
                    <MenuItem value="Nephew">Nephew</MenuItem>
                    <MenuItem value="Niece">Niece</MenuItem>
                    <MenuItem value="Son">Son</MenuItem>
                    <MenuItem value="Uncle">Uncle</MenuItem>
                    <MenuItem value="Wife">Wife</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={relationship.name}
                  name="name"
                  onChange={(e) => handleRelationshipChange(index, e)}
                  className="bg-white rounded-md"
                />
                <TextField
                  label="Mobile"
                  type="number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={relationship.mobile}
                  name="mobile"
                  onChange={(e) => handleRelationshipChange(index, e)}
                  className="bg-white rounded-md"
                />
                <TextField
                  label="Date of Birth"
                  type="date"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={relationship.dob}
                  name="dob"
                  onChange={(e) => handleRelationshipChange(index, e)}
                  className="bg-white rounded-md h-14"
                  InputLabelProps={{ shrink: true }}
                />
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteRelationship(index)}
                    className="bg-red-500 text-white rounded-lg p-2"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Special Occasions Section */}
          <div className="w-full h-auto flex flex-col">
            <div className="w-full h-auto flex gap-4 items-center">
              <h1 className="text-lg font-semibold font-poppins">
                Any Special Occasion
              </h1>
              <button
                type="button"
                onClick={handleAddOccasion}
                className="bg-[#e7822b] text-sm px-4 py-1 rounded-lg font-nunito text-white"
              >
                Add More
              </button>
            </div>
            {formData.occasions.map((occasion, index) => (
              <div
                key={index}
                className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 md:grid-cols-4"
              >
                <FormControl fullWidth>
                  <Select
                    name="action"
                    value={occasion.action}
                    onChange={(e) => handleOccasionChange(index, e)}
                    className="bg-white rounded-md mt-4"
                    displayEmpty
                    renderValue={(selected) =>
                      selected || <em>Occasion Action</em>
                    }
                  >
                    <MenuItem value="">
                      <em>Select an Occasion Action</em>
                    </MenuItem>
                    <MenuItem value="Reminder Call">Reminder Call</MenuItem>
                    <MenuItem value="None">None</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Occasion Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={occasion.name}
                  name="name"
                  onChange={(e) => handleOccasionChange(index, e)}
                  className="bg-white rounded-md md:col-span-2"
                />
                <TextField
                  label="Occasion Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={occasion.date}
                  name="date"
                  onChange={(e) => handleOccasionChange(index, e)}
                  className="bg-white rounded-md h-14"
                  InputLabelProps={{ shrink: true }}
                />
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteOccasion(index)}
                    className="bg-red-500 text-white rounded-lg p-2"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* ID Proof Section */}
          <div className="w-full h-auto flex flex-col">
            <h1 className="text-lg font-semibold font-poppins">ID Proof</h1>
            <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6">
              <TextField
                label="Aadhaar Number"
                type="number"
                variant="outlined"
                margin="normal"
                className="bg-white rounded-md"
                name="aadhaarNumber"
                value={formData.idProof.aadhaarNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    idProof: {
                      ...prev.idProof,
                      aadhaarNumber: e.target.value,
                    },
                  }))
                }
              />
              <TextField
                label="Driving License"
                type="text"
                variant="outlined"
                margin="normal"
                className="bg-white rounded-md"
                name="drivingLicense"
                value={formData.idProof.drivingLicense}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    idProof: {
                      ...prev.idProof,
                      drivingLicense: e.target.value,
                    },
                  }))
                }
              />
              <TextField
                label="Voter ID"
                type="text"
                variant="outlined"
                margin="normal"
                className="bg-white rounded-md"
                name="voterId"
                value={formData.idProof.voterId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    idProof: {
                      ...prev.idProof,
                      voterId: e.target.value,
                    },
                  }))
                }
              />
              <TextField
                label="Other"
                type="text"
                variant="outlined"
                margin="normal"
                className="bg-white rounded-md 2xl:col-span-2"
                name="otherId"
                value={formData.idProof.otherId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    idProof: {
                      ...prev.idProof,
                      otherId: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full h-auto flex justify-center items-center mb-10">
            <button
              type="submit"
              className="px-6 py-2 text-white font-prata bg-[#eb852c] rounded-lg 2xl:px-8 2xl:py-3 sm:w-[200px] md:w-[300px] 2xl:text-lg font-semibold md:hover:bg-[#fc9133]"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
