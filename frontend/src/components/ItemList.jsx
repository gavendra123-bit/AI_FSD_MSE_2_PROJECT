function ItemList({ items, currentUserId, onEdit, onDelete }) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="section-title mb-0">Reported Items</h2>
          <span className="badge text-bg-light">{items.length} records</span>
        </div>

        {items.length === 0 ? (
          <p className="text-muted mb-0">No items found.</p>
        ) : (
          <div className="row g-3">
            {items.map((item) => {
              const isOwner = item.user?._id === currentUserId || item.user?.id === currentUserId;

              return (
                <div key={item._id} className="col-md-6">
                  <div className="item-card h-100">
                    <div className="d-flex justify-content-between align-items-start gap-3">
                      <div>
                        <h3 className="item-title">{item.itemName}</h3>
                        <p className={`status-pill ${item.type === "Lost" ? "lost" : "found"}`}>{item.type}</p>
                      </div>
                      <span className="badge text-bg-secondary">{item.category}</span>
                    </div>
                    <p className="item-text">{item.description}</p>
                    <p className="item-meta"><strong>Location:</strong> {item.location}</p>
                    <p className="item-meta"><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                    <p className="item-meta"><strong>Contact:</strong> {item.contactInfo}</p>
                    <p className="item-meta"><strong>Posted By:</strong> {item.user?.name || "Unknown"}</p>

                    {isOwner ? (
                      <div className="d-flex gap-2 mt-3">
                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => onEdit(item)}>
                          Update
                        </button>
                        <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => onDelete(item._id)}>
                          Delete
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemList;
