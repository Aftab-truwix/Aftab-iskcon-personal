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
          Authorization: `Bearer ${token}`, // Send token in Authorization header
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

  useEffect(() => {
    fetchUserData();
  }, []);

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState();
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [dob, setDob] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [citizenType, setCitizenType] = useState("Indian");
  const [gender, setGender] = useState("male");

  // Address
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  // Relationships
  const [relationships, setRelationships] = useState([
    { relation: "", name: "", mobile: "", dob: "" },
  ]);

  // Special Occasions
  const [occasions, setOccasions] = useState([
    { action: "", name: "", date: "" },
  ]);

  // ID Proof
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("");
  const [voterId, setVoterId] = useState("");
  const [otherId, setOtherId] = useState("");

  const [formData, setFormData] = useState({});

  // Handle Relationship Changes
  const handleRelationshipChange = (index, event) => {
    const newRelationships = [...relationships];
    newRelationships[index][event.target.name] = event.target.value;
    setRelationships(newRelationships);
  };

  const handleAddRelationship = () => {
    setRelationships([
      ...relationships,
      { relation: "", name: "", mobile: "", dob: "" },
    ]);
  };

  const handleDeleteRelationship = (index) => {
    const newRelationships = [...relationships];
    newRelationships.splice(index, 1);
    setRelationships(newRelationships);
  };

  // Handle Occasion Changes
  const handleOccasionChange = (index, event) => {
    const newOccasions = [...occasions];
    newOccasions[index][event.target.name] = event.target.value;
    setOccasions(newOccasions);
  };

  const handleAddOccasion = () => {
    setOccasions([...occasions, { action: "", name: "", date: "" }]);
  };

  const handleDeleteOccasion = (index) => {
    const newOccasions = [...occasions];
    newOccasions.splice(index, 1);
    setOccasions(newOccasions);
  };

  const handlePincodeChange = (value) => {
    // Allow only numeric input and limit to 6 digits
    if (/^\d{0,6}$/.test(value)) {
      setPincode(value);
    }
  };

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };
  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };
  // Handle Form Submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      personalDetails: {
        name: formData.name,
        email: formData.email,
        mobile,
        whatsappNumber,
        dob,
        panNumber,
        maritalStatus,
        citizenType,
        gender,
      },
      address: { address, country, state, pincode },
      relationships,
      occasions,
      idProof: { aadhaarNumber, drivingLicense, voterId, otherId },
    };

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
            // backgroundRepeat: 'no-repeat',
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
              value={formData.name}
              onChange={handleNameChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              className="bg-white rounded-md"
              value={formData.email}
              onChange={handleEmailChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Mobile"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              className="bg-white rounded-md"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <TextField
              label="Whatsapp Number"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              className="bg-white rounded-md"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
            />
            <TextField
              label="Date of Birth"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              className="bg-white rounded-md h-14"
              InputLabelProps={{ shrink: true }}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <TextField
              label="Pan Number"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              className="bg-white rounded-md h-14"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value)}
            />
            <FormControl fullWidth>
              <Select
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
                className="bg-white rounded-md my-4"
                displayEmpty
                renderValue={(selected) => selected || <em>Martial Status</em>}
              >
                <MenuItem value="">
                  <em>Select a Martial Status</em>
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
                value={citizenType}
                onChange={(e) => setCitizenType(e.target.value)}
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
                value={gender}
                onChange={(e) => setGender(e.target.value)}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="bg-white rounded-md mt-4"
                  displayEmpty
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
                value={pincode}
                onChange={(e) => handlePincodeChange(e.target.value)}
                inputProps={{
                  maxLength: 6, 
                  inputMode: "numeric", 
                }}
                helperText={
                  pincode.length === 6 ? "" : "Pincode must be exactly 6 digits"
                } 
                error={pincode.length !== 6} 
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
            {relationships.map((relationship, index) => (
              <div
                key={index}
                className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 md:grid-cols-4"
              >
                <FormControl fullWidth>
                  <Select
                    name="relation"
                    value={relationship.relation}
                    onChange={(event) => handleRelationshipChange(index, event)}
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
                  onChange={(event) => handleRelationshipChange(index, event)}
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
                  onChange={(event) => handleRelationshipChange(index, event)}
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
                  onChange={(event) => handleRelationshipChange(index, event)}
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
            {occasions.map((occasion, index) => (
              <div
                key={index}
                className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 md:grid-cols-4"
              >
                <FormControl fullWidth>
                  <Select
                    name="action"
                    value={occasion.action}
                    onChange={(event) => handleOccasionChange(index, event)}
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
                  onChange={(event) => handleOccasionChange(index, event)}
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
                  onChange={(event) => handleOccasionChange(index, event)}
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
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
              />
              <TextField
                label="Driving License"
                type="text"
                variant="outlined"
                margin="normal"
                className="bg-white rounded-md"
                value={drivingLicense}
                onChange={(e) => setDrivingLicense(e.target.value)}
              />
              <TextField
                label="Voter ID"
                type="text"
                variant="outlined"
                margin="normal"
                className="bg-white rounded-md"
                value={voterId}
                onChange={(e) => setVoterId(e.target.value)}
              />
              <TextField
                label="Other"
                type="text"
                variant="outlined"
                margin="normal"
                className="bg-white rounded-md 2xl:col-span-2"
                value={otherId}
                onChange={(e) => setOtherId(e.target.value)}
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
