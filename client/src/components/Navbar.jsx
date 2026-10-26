import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand" aria-label="CampusFind home">
          <span className="brand-mark">CF</span>
          <div>
            <strong>CampusFind</strong>
            <small>Lost Today. Found Tomorrow.</small>
          </div>
        </Link>

        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/browse">Browse Items</Link>
          <Link to="/report-lost">Lost Items</Link>
          <Link to="/report-found">Found Items</Link>
          <Link to="/dashboard">Dashboard</Link>
          {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
        </nav>

        <div className="nav-actions">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          ) : (
            <>
              <span className="welcome-badge">Hi, {user.name?.split(' ')[0]}</span>
              <button type="button" onClick={logout} className="btn btn-ghost">Logout</button>
            </>
          )}
          <Link to="/report-lost" className="btn btn-primary">Report Item</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
