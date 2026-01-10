import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useContext, useEffect } from "react";

export const Home = () => {

  const {store, dispatch, actions} =useGlobalReducer()
 
  
 
  useEffect(() => {
    actions.loadData();
  }, []);

  return (
    <div className="container">
      <h2>Characters</h2>
      <div className="d-flex overflow-auto">
        {store.people.map(item => (
          <Card key={item.uid} item={item} type="characters" />
        ))}
      </div>

      <h2>Vehicles</h2>
      <div className="d-flex overflow-auto">
        {store.vehicles.map(item => (
          <Card key={item.uid} item={item} type="vehicles" />
        ))}
      </div>

      <h2>Planets</h2>
      <div className="d-flex overflow-auto">
        {store.planets.map(item => (
          <Card key={item.uid} item={item} type="planets" />
        ))}
      </div>
    </div>
  );
};

  

	