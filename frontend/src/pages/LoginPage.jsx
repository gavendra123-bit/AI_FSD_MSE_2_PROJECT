import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import AuthCard from "../components/AuthCard";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      const response = await api.post("/login", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (err) {
      if (!err.response) {
        setError("Cannot connect to the backend server. Make sure the backend is running and the API URL is correct.");
      } else {
        setError(err.response?.data?.message || "Login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Welcome Back" subtitle="Login securely to manage your lost and found reports.">
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <form onSubmit={handleSubmit} className="d-grid gap-3">
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="mt-4 mb-0 text-center">
        New user? <Link to="/register">Create an account</Link>
      </p>
    </AuthCard>
  );
}

export default LoginPage;
