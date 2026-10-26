import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ItemCard from '../components/ItemCard';

const HomePage = () => {
  const [recentItems, setRecentItems] = useState([]);
  const categories = ['Electronics', 'Documents', 'Books', 'Clothing', 'Accessories', 'Personal Items', 'Other'];

  useEffect(() => {
    api
      .get('/items?limit=4')
      .then(({ data }) => setRecentItems(data.items || []))
      .catch(() => setRecentItems([]));
  }, []);

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">TMU, Moradabad</span>
            <h1>Lost Something? Let&apos;s Bring It Home.</h1>
            <p>
              CampusFind helps students and staff report, search, and recover lost or found belongings across the
              university with trust, speed, and clarity.
            </p>
            <div className="hero-actions">
              <Link to="/browse" className="btn btn-primary">Browse Items</Link>
              <Link to="/report-lost" className="btn btn-secondary">Report Lost Item</Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="floating-card card-one">
              <span className="card-label">Recovered</span>
              <strong>42 items</strong>
            </div>
            <div className="floating-card card-two">
              <span className="card-label">Recent report</span>
              <strong>Blue laptop bag</strong>
            </div>
            <div className="hero-graphic">
              <div className="graphic-lens" />
              <div className="graphic-item item-bag" />
              <div className="graphic-item item-key" />
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-card">
            <span>Total reports</span>
            <strong>128</strong>
          </div>
          <div className="stat-card">
            <span>Lost items</span>
            <strong>62</strong>
          </div>
          <div className="stat-card">
            <span>Found items</span>
            <strong>54</strong>
          </div>
          <div className="stat-card">
            <span>Recovered</span>
            <strong>31</strong>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="section-head">
            <p>Recently reported</p>
            <h2>Newest campus items</h2>
          </div>
          <div className="card-grid">
            {recentItems.length ? (
              recentItems.map((item) => <ItemCard key={item._id} item={item} />)
            ) : (
              <div className="empty-state">
                <h3>No recent items yet</h3>
                <p>Be the first to report a lost or found item.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-block alt-block">
        <div className="container">
          <div className="section-head center">
            <p>How it works</p>
            <h2>Simple steps to recovery</h2>
          </div>
          <div className="steps-grid">
            {[
              'Report an item',
              'Browse and search',
              'Contact the owner or finder',
              'Recover your belongings',
            ].map((step, index) => (
              <div key={step} className="step-card">
                <span className="step-number">0{index + 1}</span>
                <h3>{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="section-head center">
            <p>Categories</p>
            <h2>Common types reported on campus</h2>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <div key={category} className="category-card">
                <span>{category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-box">
          <div>
            <p className="eyebrow light">Be proactive</p>
            <h2>Help your campus community recover what matters.</h2>
          </div>
          <Link to="/report-found" className="btn btn-primary light-bg">Report Item</Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
