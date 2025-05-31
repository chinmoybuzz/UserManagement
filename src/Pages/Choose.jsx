import React, { useEffect, useState } from "react";
import "./ChoosePage.css";
import { Link } from "react-router";
import axios from "axios";
import axiosInstance from "../api/api";

const Choose = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedParentId, setSelectedParentId] = useState("");

  const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUserId = loggedInUser.id; // Replace with actual user ID from props or context

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        let roleQuery = "";

        switch (loggedInUser.role) {
          case "admin":
            roleQuery = "user,subadmin";
            break;
          case "subadmin":
            roleQuery = "admin";
            break;
          case "user":
            roleQuery = "subadmin";
            break;
          default:
            roleQuery = "user";
        }

        const response = await axiosInstance.get("/users/list", {
          params: { role: roleQuery },
        });
        setUsers(response.data.result || []);
      } catch (err) {
        setError("Failed to fetch users.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateParent = async () => {
    if (!selectedParentId) {
      alert("Please select a new parent.");
      return;
    }

    try {
      await axiosInstance.patch(`/users/update-parent/parent`, {
        parentId: selectedParentId,
      });
      alert("Parent updated successfully!");
    } catch (err) {
      console.error("Failed to update parent:", err);
      alert("Failed to update parent.");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Change Parent</h5>
        </div>
        <div className="card-body">
          {/* User Info */}
          <div className="mb-3">
            <label className="form-label">User ID</label>
            <input type="text" className="form-control" value={loggedInUser.email} disabled />
          </div>

          {/* Dropdown */}
          <div className="mb-3">
            <label className="form-label">Select New Parent</label>
            <select className="form-select" value={selectedParentId} onChange={(e) => setSelectedParentId(e.target.value)}>
              <option value="">-- Select Parent --</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.email} ({user.role})
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-end">
            <button className="btn btn-secondary me-2">Cancel</button>
            <button className="btn btn-success" onClick={handleUpdateParent}>
              Update Parent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;
