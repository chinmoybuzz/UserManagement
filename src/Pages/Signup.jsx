import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/api";
const Signup = ({ role }) => {
  const [userData, setUserData] = useState({});
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let dropdownLabel = "";
  let dropdownName = "";
  let apiRoleParam = "";
  if (role === "user") {
    dropdownLabel = "Select SubAdmin";
    dropdownName = "parentId";
    apiRoleParam = "subadmin";
  } else if (role === "subadmin") {
    dropdownLabel = "Select Admin";
    dropdownName = "parentId";
    apiRoleParam = "admin";
  }
  // Fetch dropdown options based on role
  useEffect(() => {
    const fetchDropdownOptions = async () => {
      if (!apiRoleParam) return; // If no dropdown needed, skip

      setLoading(true);
      try {
        const response = await axiosInstance.get(`/users/list?role=${apiRoleParam}`);

        setDropdownOptions(response.data.result || []);
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
        setDropdownOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDropdownOptions();
  }, [apiRoleParam]);
  const submitData = async (e) => {
    e.preventDefault();

    const payload = {
      ...userData,
      role,
    };

    try {
      const response = await axiosInstance.post("/auth/signup", payload);
      console.log("Signup success:", response.result);

      alert("Signup successful!");
    } catch (error) {
      console.error("Signup error:", error.response ? error.response.data : error.message);
      alert("Signup failed! Please check your inputs or try again later.");
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 col-lg-5">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">
                {role === "admin" && "Admin "}
                {role === "subAdmin" && "Sub-Admin "}
                {role === "user" && "User "}Sign Up
              </h3>
              <form onSubmit={submitData}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" name="email" value={userData.email || ""} onChange={handleInputChange} className="form-control" id="email" placeholder="Enter email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input type="password" name="password" value={userData.password || ""} onChange={handleInputChange} className="form-control" id="password" placeholder="Enter password" />
                </div>

                {/* Conditionally render dropdown */}
                {dropdownLabel && (
                  <div className="mb-3">
                    <label htmlFor="parentSelect" className="form-label">
                      {dropdownLabel}
                    </label>
                    <select className="form-select" id="parentSelect" name={dropdownName} value={userData[dropdownName] || ""} onChange={handleInputChange} disabled={loading}>
                      <option value="" disabled>
                        {loading ? "Loading..." : dropdownLabel}
                      </option>
                      {dropdownOptions.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.email}
                        </option>
                      ))}
                    </select>
                    <small className="text-muted">{`Please select your ${dropdownLabel.toLowerCase()}.`}</small>
                  </div>
                )}

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="text-center mt-3">
                <small>
                  Already have an account? <a href="#">Log In</a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
