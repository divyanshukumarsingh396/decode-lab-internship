import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ItemCard from '../components/ItemCard';

const BrowsePage = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(false);

  const categories = ['Electronics', 'Documents', 'Books', 'Clothing', 'Accessories', 'Personal Items', 'Bags', 'Keys', 'Other'];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/items', {
          params: { q: query, type, category, status },
        });
        setItems(data.items || []);
      } catch (error) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [query, type, category, status]);

  const clearFilters = () => {
    setQuery('');
    setType('all');
    setCategory('all');
    setStatus('all');
  };

  return (
    <div className="page-shell">
      <div className="container">
        <div className="page-header">
          <div>
            <p className="eyebrow">Browse</p>
            <h1>Lost and found across campus</h1>
          </div>
          <Link to="/report-lost" className="btn btn-primary">Report Item</Link>
        </div>

        <div className="filter-panel">
          <input
            type="text"
            placeholder="Search by item name, location, or description"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="claim requested">Claim Requested</option>
            <option value="claimed">Claimed</option>
            <option value="resolved">Resolved</option>
          </select>
          <button type="button" className="btn btn-ghost" onClick={clearFilters}>Clear Filters</button>
        </div>

        <div className="results-summary">
          <strong>{items.length}</strong> results found
        </div>

        {loading ? (
          <div className="loader-block">Loading items...</div>
        ) : (
          <div className="card-grid">
            {items.length ? (
              items.map((item) => <ItemCard key={item._id} item={item} />)
            ) : (
              <div className="empty-state">
                <h3>No items match your search</h3>
                <p>Try changing the filters or reporting a new item.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
