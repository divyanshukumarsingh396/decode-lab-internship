import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const typeClass = item.type === 'lost' ? 'status-lost' : 'status-found';

  return (
    <article className="item-card">
      <div className="item-image-wrap">
        <img
          src={item.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'}
          alt={item.title}
          className="item-image"
        />
        <span className={`type-badge ${typeClass}`}>{item.type}</span>
      </div>
      <div className="item-card-body">
        <div className="card-headline">
          <h3>{item.title}</h3>
          <span className="category-pill">{item.category}</span>
        </div>
        <p className="meta-row">📍 {item.location}</p>
        <p className="meta-row">📅 {new Date(item.date).toLocaleDateString()}</p>
        <p className="meta-row">📌 {item.status}</p>
        <Link to={`/items/${item._id}`} className="btn btn-primary btn-block">View Details</Link>
      </div>
    </article>
  );
};

export default ItemCard;
