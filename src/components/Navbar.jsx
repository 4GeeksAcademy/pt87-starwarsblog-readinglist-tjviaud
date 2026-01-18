import { Link } from "react-router-dom";
import { useState } from "react";
import { useFavorites } from "../Context/FavoritesContext"; // :white_check_mark: Correct import
import starwarsicons from "../assets/img/starwarsicons.png";
const starWarsLogoUrl =
  "https://www.freepnglogos.com/uploads/star-wars-logo-3.png";
const decorativeImageUrl = starwarsicons
const Navbar = () => {
  const { favorites, removeFavorite } = useFavorites(); // :white_check_mark: Hook usage
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  if (!favorites) {
    return <div>Loading...</div>;
  }
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/">
          <img src={starWarsLogoUrl} alt="Star Wars Logo" className="logo-img" />
        </Link>
        <img
          src={decorativeImageUrl}
          alt="Decorative Image"
          className="decorative-image"
        />
        <div className="ml-auto">
          <button className="btn btn-primary" onClick={toggleDropdown}>
            Favorites ({favorites.length})
          </button>
          <div className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}>
            {favorites.length > 0 ? (
              <ul>
                {favorites.map((item, index) => (
                  <li key={index}>
                    <Link to={`/${item.type}/${item.id}`}>{item.name}</Link>
                    <button
                      className="remove-btn"
                      onClick={() => removeFavorite(item)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-favorites">No favorites yet</p>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;