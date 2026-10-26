import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user) return;

    api
      .get('/users/profile')
      .then(({ data }) => setItems(data.items || []))
      .catch(() => setItems([]));
  }, [user]);

  return (
    <div className="page-shell">
      <div className="container">
        <div className="page-header">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1>Welcome, {user?.name}</h1>
          </div>
          <button type="button" className="btn btn-ghost" onClick={logout}>Logout</button>
        </div>

        <div className="stats-grid dashboard-stats">
          <div className="stat-card">
            <span>Total reports</span>
            <strong>{items.length}</strong>
          </div>
          <div className="stat-card">
            <span>Lost reports</span>
            <strong>{items.filter((item) => item.type === 'lost').length}</strong>
          </div>
          <div className="stat-card">
            <span>Found reports</span>
            <strong>{items.filter((item) => item.type === 'found').length}</strong>
          </div>
          <div className="stat-card">
            <span>Open reports</span>
            <strong>{items.filter((item) => item.status === 'open').length}</strong>
          </div>
        </div>

        <div className="dashboard-layout">
          <aside className="card-panel sidebar-panel">
            <h3>Profile</h3>
            <p>{user?.email}</p>
            <p>{user?.studentId}</p>
            <p>{user?.role}</p>
          </aside>

          <div className="content-panel">
            <h3>My reports</h3>
            {items.length ? (
              <div className="list-stack">
                {items.map((item) => (
                  <div key={item._id} className="row-card">
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.type} • {item.category}</p>
                    </div>
                    <span>{item.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No reports yet</h3>
                <p>Start by reporting a missing or found item.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
