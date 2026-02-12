import React from 'react';
import {useFavorites} from '../Context/FavoritesContext';

import '../style/ItemCard.css';

const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='24'%3ENo Image%3C/text%3E%3C/svg%3E";

const ItemCard = ({ item, type, onLearnMore }) => {
  
  const { addFavorite } = useFavorites();

  
  const getImageUrl = () => {
    
    const baseUrl = 'https://starwars-visualguide.com/assets/img';
    
    
    switch(type) {
      
      case 'characters':
        return `${baseUrl}/characters/${item.uid}.jpg`;
     
      case 'planets':
        return `${baseUrl}/planets/${item.uid}.jpg`;
      
      case 'species':
        return `${baseUrl}/species/${item.uid}.jpg`;
      
      case 'starships':
        return `${baseUrl}/starships/${item.uid}.jpg`;
      
      case 'vehicles':
        return `${baseUrl}/vehicles/${item.uid}.jpg`;
      
      default:
        return FALLBACK_IMAGE;
    }
  };

 
  const handleAddFavorite = () => {
   
    const properties = item.properties || item;
    
   
    addFavorite({
      
      ...properties,
      
      url: item.url,
      
      name: item.name,
      
      id: item.uid,
      
      type: type
    });
  };

  
  return (
    <div className="item-card">
      
     
      <div className="card-image-container">
       
        <img
          
          src={getImageUrl()}
          
          alt={item.name}
         
          className="card-image"
          
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
      </div>
      
      
      <div className="card-content">
       
        <h3 className="card-title">{item.name}</h3>
        
       
        <div className="card-actions">
         
          <button 
            
            className="btn btn-learn-more" 
            
            onClick={() => onLearnMore(item)}
            
            title="View detailed information"
          >
            Learn More
          </button>
          
          
          <button 
            
            className="btn btn-favorite" 
            
            onClick={handleAddFavorite}
            
            title="Add to favorites"
          >
            
            ♥
          </button>
        </div>
      </div>
    </div>
  );
};


export default ItemCard;