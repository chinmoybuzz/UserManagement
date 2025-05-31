import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:3000/api/v1/auth/login", loginData);
      console.log("Login success:", response.data);

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login successful!");

      // Navigate to dashboard or any route after login
      navigate("/choose");
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      alert("Login failed! Please check your credentials and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 col-lg-5">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Log In</h3>
              <form onSubmit={submitLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" id="email" name="email" value={loginData.email} onChange={handleInputChange} className="form-control" placeholder="Enter email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input type="password" id="password" name="password" value={loginData.password} onChange={handleInputChange} className="form-control" placeholder="Enter password" required />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Log In"}
                  </button>
                </div>
              </form>
              <div className="text-center mt-3">
                <small>
                  Don't have an account? <a href="/signup">Sign Up</a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
