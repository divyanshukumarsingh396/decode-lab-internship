import { useEffect, useState } from 'react';
import api from '../services/api';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalReports: 0,
    activeUsers: 0,
    pendingClaims: 0,
    resolvedReports: 0,
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get('/admin/dashboard')
      .then(({ data }) => setStats(data.stats))
      .catch(() => setStats({ totalReports: 0, activeUsers: 0, pendingClaims: 0, resolvedReports: 0 }));

    api
      .get('/admin/items')
      .then(({ data }) => setItems(data.items || []))
      .catch(() => setItems([]));
  }, []);

  return (
    <div className="page-shell">
      <div className="container">
        <div className="page-header">
          <div>
            <p className="eyebrow">Admin panel</p>
            <h1>CampusFind administration</h1>
          </div>
        </div>

        <div className="stats-grid dashboard-stats">
          <div className="stat-card"><span>Total reports</span><strong>{stats.totalReports}</strong></div>
          <div className="stat-card"><span>Active users</span><strong>{stats.activeUsers}</strong></div>
          <div className="stat-card"><span>Pending claims</span><strong>{stats.pendingClaims}</strong></div>
          <div className="stat-card"><span>Resolved reports</span><strong>{stats.resolvedReports}</strong></div>
        </div>

        <div className="card-panel">
          <h3>Reports overview</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {items.length ? (
                  items.map((item) => (
                    <tr key={item._id}>
                      <td>{item.title}</td>
                      <td>{item.type}</td>
                      <td>{item.category}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No reports found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
