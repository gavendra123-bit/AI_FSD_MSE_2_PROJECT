import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import ItemForm from "../components/ItemForm";
import ItemList from "../components/ItemList";
import SearchBar from "../components/SearchBar";

function DashboardPage() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadDashboard = async () => {
    try {
      await api.get("/dashboard");
      const response = await api.get("/items");
      setItems(response.data);
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleSubmit = async (formData) => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (selectedItem) {
        await api.put(`/items/${selectedItem._id}`, formData);
        setMessage("Item updated successfully.");
      } else {
        await api.post("/items", formData);
        setMessage("Item added successfully.");
      }

      setSelectedItem(null);
      await loadDashboard();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save item.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    setError("");
    setMessage("");

    try {
      await api.delete(`/items/${itemId}`);
      setMessage("Item deleted successfully.");
      await loadDashboard();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete item.");
    }
  };

  const handleSearch = async () => {
    setError("");
    setMessage("");

    try {
      const response = await api.get("/items/search", {
        params: {
          name: searchName,
          category: searchCategory,
        },
      });
      setItems(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Search failed.");
    }
  };

  const handleReset = async () => {
    setSearchName("");
    setSearchCategory("");
    setSelectedItem(null);
    setMessage("");
    setError("");
    await loadDashboard();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-shell">
      <div className="container py-5">
        <div className="hero-panel shadow-lg">
          <div>
            <p className="hero-kicker">Campus Lost & Found</p>
            <h1 className="hero-title">Manage lost and found reports in one secure dashboard.</h1>
            <p className="hero-copy mb-0">
              Welcome {storedUser?.name || "Student"}. Add new reports, search existing items, and update only the entries you own.
            </p>
          </div>
          <button type="button" className="btn btn-dark" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {message ? <div className="alert alert-success mt-4">{message}</div> : null}
        {error ? <div className="alert alert-danger mt-4">{error}</div> : null}

        <div className="row g-4 mt-1">
          <div className="col-lg-5">
            <ItemForm onSubmit={handleSubmit} selectedItem={selectedItem} onCancel={() => setSelectedItem(null)} loading={loading} />
          </div>
          <div className="col-lg-7 d-grid gap-4">
            <SearchBar
              searchName={searchName}
              searchCategory={searchCategory}
              onNameChange={(event) => setSearchName(event.target.value)}
              onCategoryChange={(event) => setSearchCategory(event.target.value)}
              onSearch={handleSearch}
              onReset={handleReset}
            />
            <ItemList items={items} currentUserId={storedUser?.id} onEdit={setSelectedItem} onDelete={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
