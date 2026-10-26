import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const ItemDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [item, setItem] = useState(null);
  const [claimForm, setClaimForm] = useState({
    name: '',
    email: '',
    studentId: '',
    reason: '',
    identificationDetails: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get(`/items/${id}`).then(({ data }) => setItem(data.item)).catch(() => setItem(null));
  }, [id]);

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to submit a claim request.');
      return;
    }

    try {
      setSubmitting(true);
      await api.post('/claims', { itemId: id, ...claimForm });
      alert('Claim request submitted successfully');
      setClaimForm({
        name: '',
        email: '',
        studentId: '',
        reason: '',
        identificationDetails: '',
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to submit claim request');
    } finally {
      setSubmitting(false);
    }
  };

  if (!item) {
    return <div className="container loader-block">Loading item details...</div>;
  }

  return (
    <div className="page-shell">
      <div className="container detail-layout">
        <div className="detail-image-block">
          <img
            src={item.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'}
            alt={item.title}
          />
        </div>

        <div className="detail-copy">
          <Link to="/browse" className="link-back">← Back to Browse</Link>
          <div className="detail-header">
            <h1>{item.title}</h1>
            <span className={`type-badge ${item.type === 'lost' ? 'status-lost' : 'status-found'}`}>{item.type}</span>
          </div>

          <div className="stat-list">
            <span><strong>Category:</strong> {item.category}</span>
            <span><strong>Location:</strong> {item.location}</span>
            <span><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</span>
            <span><strong>Status:</strong> {item.status}</span>
            <span><strong>Reported by:</strong> {item.reportedBy?.name || 'CampusFind'}</span>
            <span><strong>Report ID:</strong> {item._id}</span>
          </div>

          <p>{item.description}</p>

          <div className="detail-actions">
            <button type="button" className="btn btn-primary">Contact {item.type === 'lost' ? 'Owner' : 'Finder'}</button>
            <button type="button" className="btn btn-secondary" disabled={!user}>Request Claim</button>
            <Link className="btn btn-ghost" to="/report-lost">Report Similar Item</Link>
          </div>

          <div className="claim-box">
            <h3>Claim Request</h3>
            <form onSubmit={handleClaimSubmit} className="form-grid">
              <input
                type="text"
                placeholder="Full name"
                value={claimForm.name}
                onChange={(e) => setClaimForm({ ...claimForm, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="University email"
                value={claimForm.email}
                onChange={(e) => setClaimForm({ ...claimForm, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Student ID"
                value={claimForm.studentId}
                onChange={(e) => setClaimForm({ ...claimForm, studentId: e.target.value })}
              />
              <textarea
                rows="4"
                placeholder="Reason for claim"
                value={claimForm.reason}
                onChange={(e) => setClaimForm({ ...claimForm, reason: e.target.value })}
              ></textarea>
              <textarea
                rows="4"
                placeholder="Identification details"
                value={claimForm.identificationDetails}
                onChange={(e) => setClaimForm({ ...claimForm, identificationDetails: e.target.value })}
              ></textarea>
              <button className="btn btn-primary" type="submit" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Claim'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
