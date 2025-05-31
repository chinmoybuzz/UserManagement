import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../api/api";

const TreeNode = ({ node }) => {
  return (
    <li className="list-group-item border-0 ps-0">
      <button className={`btn btn-sm mb-1 ${node.role === "admin" ? "btn-danger" : node.role === "subadmin" ? "btn-warning text-dark" : "btn-info"}`}>{node.email}</button>
      {node.children && node.children.length > 0 && (
        <ul className="list-group ps-3">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Tree = () => {
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchTree = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get("/users/tree-view");

        if (response.data && Array.isArray(response.data)) {
          setTreeData(response.data);
        } else {
          setTreeData([]);
          setError("No data found");
        }
      } catch (err) {
        setError("Failed to load data");
        setTreeData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTree();
  }, [loggedInUser.role]);

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;
  return (
    <div className="container mt-4">
      <h3>Role Tree for: {loggedInUser.role}</h3>
      <ul className="list-group ps-0">{treeData.length > 0 ? treeData.map((node) => <TreeNode key={node.id} node={node} />) : <div>No data found</div>}</ul>
    </div>
  );
};

export default Tree;
