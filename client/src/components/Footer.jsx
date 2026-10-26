import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h4>CampusFind</h4>
          <p>A trusted university lost & found system for students, staff, and campus support.</p>
        </div>
        <div>
          <h5>Links</h5>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/browse">Browse Items</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/report-lost">Report Lost</Link></li>
          </ul>
        </div>
        <div>
          <h5>University</h5>
          <ul>
            <li>TMU, Moradabad</li>
            <li>Campus Security</li>
            <li>Lost & Found Desk</li>
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul>
            <li>help@campusfind.edu</li>
            <li>+91 98765 43210</li>
            <li>Campus Safety Office</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 CampusFind. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
