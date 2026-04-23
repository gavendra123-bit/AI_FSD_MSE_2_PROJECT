import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import AuthCard from "../components/AuthCard";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/register", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (err) {
      if (!err.response) {
        setError("Cannot connect to the backend server. Make sure the backend is running and the API URL is correct.");
      } else {
        setError(err.response?.data?.message || "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Create Account" subtitle="Register to report lost and found items on campus.">
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <form onSubmit={handleSubmit} className="d-grid gap-3">
        <div>
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-brand" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="mt-4 mb-0 text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </AuthCard>
  );
}

export default RegisterPage;
