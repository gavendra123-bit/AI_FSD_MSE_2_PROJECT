function SearchBar({ searchName, searchCategory, onNameChange, onCategoryChange, onSearch, onReset }) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h2 className="section-title">Search Items</h2>
        <div className="row g-3 align-items-end">
          <div className="col-md-5">
            <label className="form-label">Search by Name</label>
            <input type="text" className="form-control" value={searchName} onChange={onNameChange} />
          </div>
          <div className="col-md-5">
            <label className="form-label">Search by Category</label>
            <input type="text" className="form-control" value={searchCategory} onChange={onCategoryChange} />
          </div>
          <div className="col-md-2 d-grid gap-2">
            <button type="button" className="btn btn-brand" onClick={onSearch}>
              Search
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={onReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
