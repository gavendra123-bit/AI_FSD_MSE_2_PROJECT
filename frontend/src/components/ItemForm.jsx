import { useEffect, useState } from "react";

const initialState = {
  itemName: "",
  description: "",
  type: "Lost",
  category: "",
  location: "",
  date: "",
  contactInfo: "",
};

function ItemForm({ onSubmit, selectedItem, onCancel, loading }) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        itemName: selectedItem.itemName || "",
        description: selectedItem.description || "",
        type: selectedItem.type || "Lost",
        category: selectedItem.category || "",
        location: selectedItem.location || "",
        date: selectedItem.date ? selectedItem.date.slice(0, 10) : "",
        contactInfo: selectedItem.contactInfo || "",
      });
      return;
    }

    setFormData(initialState);
  }, [selectedItem]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    if (!selectedItem) {
      setFormData(initialState);
    }
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="section-title mb-0">{selectedItem ? "Update Item" : "Add New Item"}</h2>
          {selectedItem ? (
            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onCancel}>
              Cancel
            </button>
          ) : null}
        </div>

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Item Name</label>
            <input
              type="text"
              name="itemName"
              className="form-control"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Category</label>
            <input
              type="text"
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Type</label>
            <select name="type" className="form-select" value={formData.type} onChange={handleChange}>
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Contact Info</label>
            <input
              type="text"
              name="contactInfo"
              className="form-control"
              value={formData.contactInfo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-brand w-100" disabled={loading}>
              {loading ? "Saving..." : selectedItem ? "Update Item" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemForm;
