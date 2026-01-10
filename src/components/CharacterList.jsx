import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

const CharacterList = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.people.length === 0) {
      actions.loadData();
    }
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Characters</h1>

      <div className="d-flex flex-row overflow-auto">
        {store.people.map((character) => (
          <div
            key={character.uid}
            className="card me-3"
            style={{ minWidth: "18rem" }}
          >
            <img
              src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
              className="card-img-top"
              alt={character.name}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/300x400")
              }
            />

            <div className="card-body">
              <h5 className="card-title">{character.name}</h5>

              <div className="d-flex justify-content-between">
                <Link
                  to={`/details/people/${character.uid}`}
                  className="btn btn-primary"
                >
                  Learn more!
                </Link>

                <button
                  className="btn btn-outline-warning"
                  onClick={() => actions.addFavorite(character.name)}
                >
                  ❤️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
