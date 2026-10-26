import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const ReportItemPage = ({ mode = 'lost' }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: '',
    category: 'Electronics',
    description: '',
    date: '',
    location: '',
    image: '',
    additionalDetails: '',
    type: mode,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to report an item.');
      return;
    }

    try {
      setLoading(true);
      await api.post('/items', { ...form, type: mode });
      alert('Report submitted successfully');
      navigate('/browse');
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="container form-page">
        <div className="page-header">
          <div>
            <p className="eyebrow">{mode === 'lost' ? 'Lost item' : 'Found item'}</p>
            <h1>{mode === 'lost' ? 'Report a lost item' : 'Report a found item'}</h1>
          </div>
          <Link to="/browse" className="btn btn-ghost">Back to browse</Link>
        </div>

        <form onSubmit={handleSubmit} className="card-panel form-grid">
          <input name="title" placeholder="Item name" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <select name="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option>Electronics</option>
            <option>Documents</option>
            <option>Books</option>
            <option>Clothing</option>
            <option>Accessories</option>
            <option>Personal Items</option>
            <option>Bags</option>
            <option>Keys</option>
            <option>Other</option>
          </select>
          <input type="date" name="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          <input
            name="location"
            placeholder={mode === 'lost' ? 'Location lost' : 'Location found'}
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
          <input name="image" placeholder="Image URL (optional)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          <textarea name="description" rows="4" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required></textarea>
          <textarea name="additionalDetails" rows="4" placeholder="Additional identifying details" value={form.additionalDetails} onChange={(e) => setForm({ ...form, additionalDetails: e.target.value })}></textarea>
          <div className="inline-actions">
            <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit report'}</button>
            <button className="btn btn-ghost" type="button" onClick={() => navigate('/browse')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportItemPage;
