import React from 'react';

import '../style/DetailModal.css';

const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='28'%3ENo Image%3C/text%3E%3C/svg%3E";


const DetailModal = ({ isOpen, onClose, item, type }) => {
  
  if (!isOpen || !item) return null;

  
  const getDetailFields = () => {
    
    const properties = item.properties || item;
    
    
    switch(type) {
      
      case 'characters':
        return [
          
          { label: 'Height', value: properties.height },
          { label: 'Mass', value: properties.mass },
          // Life information
          { label: 'Birth Year', value: properties.birth_year },
          // Physical attributes
          { label: 'Gender', value: properties.gender },
          { label: 'Hair Color', value: properties.hair_color },
          { label: 'Skin Color', value: properties.skin_color },
          { label: 'Eye Color', value: properties.eye_color }
        ];
      
      
      case 'planets':
        return [
          // Physical properties
          { label: 'Diameter', value: properties.diameter },
          // Rotation and orbital characteristics
          { label: 'Rotation Period', value: properties.rotation_period },
          { label: 'Orbital Period', value: properties.orbital_period },
          // Environmental conditions
          { label: 'Gravity', value: properties.gravity },
          { label: 'Population', value: properties.population },
          { label: 'Climate', value: properties.climate },
          { label: 'Terrain', value: properties.terrain }
        ];
      
     
      case 'species':
        return [
          // Classification information
          { label: 'Classification', value: properties.classification },
          { label: 'Designation', value: properties.designation },
          // Physical characteristics
          { label: 'Average Height', value: properties.average_height },
          { label: 'Skin Colors', value: properties.skin_colors },
          { label: 'Hair Colors', value: properties.hair_colors },
          { label: 'Eye Colors', value: properties.eye_colors },
          // Communication
          { label: 'Language', value: properties.language }
        ];
      
     
      case 'starships':
        return [
          // Identification
          { label: 'Model', value: properties.model },
          { label: 'Manufacturer', value: properties.manufacturer },
          // Physical characteristics
          { label: 'Length', value: properties.length },
          // Performance specifications
          { label: 'Max Atmosphering Speed', value: properties.max_atmosphering_speed },
          // Capacity information
          { label: 'Crew', value: properties.crew },
          { label: 'Passengers', value: properties.passengers },
          { label: 'Cargo Capacity', value: properties.cargo_capacity },
          // Operational details
          { label: 'Consumables', value: properties.consumables }
        ];
      
    
      case 'vehicles':
        return [
          // Identification
          { label: 'Model', value: properties.model },
          { label: 'Manufacturer', value: properties.manufacturer },
          // Physical characteristics
          { label: 'Length', value: properties.length },
          // Performance specifications
          { label: 'Max Atmosphering Speed', value: properties.max_atmosphering_speed },
          // Capacity information
          { label: 'Crew', value: properties.crew },
          { label: 'Passengers', value: properties.passengers },
          { label: 'Cargo Capacity', value: properties.cargo_capacity },
          // Operational details
          { label: 'Consumables', value: properties.consumables }
        ];
      
     
      default:
        return [];
    }
  };

  
  const getImageUrl = () => {
    
    const baseUrl = 'https://starwars-visualguide.com/assets/img';
    
   
    if (type === 'characters') {
      return `${baseUrl}/characters/${item.uid}.jpg`;
    } else if (type === 'planets') {
      return `${baseUrl}/planets/${item.uid}.jpg`;
    } else if (type === 'species') {
      return `${baseUrl}/species/${item.uid}.jpg`;
    } else if (type === 'starships') {
      return `${baseUrl}/starships/${item.uid}.jpg`;
    } else if (type === 'vehicles') {
      return `${baseUrl}/vehicles/${item.uid}.jpg`;
    }
    
    return FALLBACK_IMAGE;
  };

  
  const fields = getDetailFields();

 
  return (
    
    <div className="modal-overlay" onClick={onClose}>
      
      
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
       
        <button className="modal-close" onClick={onClose}>×</button>
        
       
        <div className="modal-body">
          
         
          <div className="modal-image">
            
            <img
             
              src={getImageUrl()}
              
              alt={item.name}
             
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_IMAGE;
              }}
            />
          </div>
          
         
          <div className="modal-info">
            
            <h2>{item.name}</h2>
            
           
            <div className="modal-details">
              
              {fields.map((field, index) => (
                
                <div key={index} className="detail-row">
                  
                  <span className="detail-label">{field.label}:</span>
                  
                  <span className="detail-value">{field.value || 'N/A'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default DetailModal;