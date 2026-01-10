import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand">Star Wars Blog</span>

      <div className="dropdown">
        <button className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown">
          Favorites ({store.favorites.length})
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          {store.favorites.map((fav, index) => (
            <li key={index} className="dropdown-item d-flex justify-content-between">
              {fav}
              <button
                className="btn btn-sm btn-danger"
                onClick={() => actions.removeFavorite(fav)}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};