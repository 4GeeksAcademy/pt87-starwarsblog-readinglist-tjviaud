import React, { useEffect, useState } from 'react';

import ItemCard from '../components/ItemCard';

import DetailModal from '../components/DetailModal';

import '../style/home.css';


const Home = () => {
  
  
  
  const [characters, setCharacters] = useState([]);
  
  const [planets, setPlanets] = useState([]);
  
  const [species, setSpecies] = useState([]);
  
  const [starships, setStarships] = useState([]);
  
  const [vehicles, setVehicles] = useState([]);
  
  const [loading, setLoading] = useState(true);

  
  const [selectedItem, setSelectedItem] = useState(null);
  
  const [selectedType, setSelectedType] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  useEffect(() => {
    
    const fetchAllData = async () => {
      try {
        
        setLoading(true);
        
        
        const baseURL = 'https://www.swapi.tech/api';

        
        const [charRes, planRes, specRes, shipRes, vehRes] = await Promise.all([
          
          fetch(`${baseURL}/people/`),
          
          fetch(`${baseURL}/planets/`),
          
          fetch(`${baseURL}/species/`),
          
          fetch(`${baseURL}/starships/`),
          
          fetch(`${baseURL}/vehicles/`)
        ]);

        
        const charData = await charRes.json();
        const planData = await planRes.json();
        const specData = await specRes.json();
        const shipData = await shipRes.json();
        const vehData = await vehRes.json();

        
        setCharacters(charData.results || []);
        setPlanets(planData.results || []);
        setSpecies(specData.results || []);
        setStarships(shipData.results || []);
        setVehicles(vehData.results || []);

        
        setLoading(false);
      } catch (error) {
        
        console.error('Error fetching data:', error);
        
        setLoading(false);
      }
    };

    
    fetchAllData();
  }, []); 
  const handleLearnMore = async (item, type) => {
    try {
      // Fetch detailed data from the item's URL
      const response = await fetch(item.url);
      const data = await response.json();
      
      // Extract the result which contains properties
      const detailedItem = data.result;
      
      // Set the detailed item with properties
      setSelectedItem(detailedItem);
      setSelectedType(type);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching item details:', error);
      // Fallback to basic item if fetch fails
      setSelectedItem(item);
      setSelectedType(type);
      setIsModalOpen(true);
    }
  };

  
  const handleCloseModal = () => {
    
    setIsModalOpen(false);
    
    setSelectedItem(null);
    
    setSelectedType(null);
  };

  
  useEffect(() => {
    
    const canvas = document.getElementById('starfield');
    
    if (!canvas) return;

    
    const ctx = canvas.getContext('2d');

    
    function resizeCanvas() {
      
      canvas.width = window.innerWidth;
      
      canvas.height = window.innerHeight;
    }

    
    resizeCanvas();

    
    const stars = Array.from({ length: 200 }, () => ({
      
      x: Math.random() * canvas.width,
      
      y: Math.random() * canvas.height,
      
      radius: Math.random() * 1.5,
      
      speed: Math.random() * 0.5 + 0.1
    }));

    
    function animate() {
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'white';

      
      stars.forEach(star => {
        
        star.y += star.speed;
        
        if (star.y > canvas.height) {
          
          star.y = 0;
          
          star.x = Math.random() * canvas.width;
        }
        
        ctx.beginPath();
        
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        ctx.fill();
        
      });

      
      requestAnimationFrame(animate);
    }

    
    animate();

    
    window.addEventListener('resize', resizeCanvas);
    
    
    return () => {
      
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []); 
  if (loading) {
    
    return (
      <div className="home">
        {/* Starfield canvas background */}
        <canvas id="starfield" className="starfield-canvas" />
        {/* Loading message container */}
        <div className="loading-container">
          <h2>Loading the galaxy...</h2>
        </div>
      </div>
    );
  }

  
  
  return (
    <div className="home">
      
      <canvas id="starfield" className="starfield-canvas" />

      
      <div className="content-wrapper">
        
        <header className="home-header">
          
          <h1 className="star-wars-title">STAR WARS</h1>
          
          <h2 className="subtitle">Explore the Galaxy</h2>
        </header>

        
        <main className="home-main">
          
          
          <section className="items-section" style={{ '--section-color': '#E91E63' }}>
            
            <h2>CHARACTERS</h2>
            
            <div className="items-scroll-container">
              
              <div className="items-grid">
                
                {characters.slice(0, 8).map((character) => (
                  
                  <ItemCard
                    key={character.uid} 
                    item={character} 
                    type="characters" 
                    onLearnMore={() => handleLearnMore(character, 'characters')} 
                  />
                ))}
              </div>
            </div>
          </section>

          
          <section className="items-section" style={{ '--section-color': '#4A90E2' }}>
            
            <h2>PLANETS</h2>
            
            <div className="items-scroll-container">
              
              <div className="items-grid">
                
                {planets.slice(0, 8).map((planet) => (
                  
                  <ItemCard
                    key={planet.uid} 
                    item={planet} 
                    type="planets" 
                    onLearnMore={() => handleLearnMore(planet, 'planets')} 
                  />
                ))}
              </div>
            </div>
          </section>

         
          <section className="items-section" style={{ '--section-color': '#8BC34A' }}>
            
            <h2>SPECIES</h2>
            
            <div className="items-scroll-container">
              
              <div className="items-grid">
                
                {species.slice(0, 8).map((specie) => (
                 
                  <ItemCard
                    key={specie.uid} 
                    item={specie} 
                    type="species"
                    onLearnMore={() => handleLearnMore(specie, 'species')} 
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="items-section" style={{ '--section-color': '#FF9800' }}>
            
            <h2>STARSHIPS</h2>
            
            <div className="items-scroll-container">
             
              <div className="items-grid">
               
                {starships.slice(0, 8).map((starship) => (
                  
                  <ItemCard
                    key={starship.uid} 
                    item={starship} 
                    type="starships" 
                    onLearnMore={() => handleLearnMore(starship, 'starships')} 
                  />
                ))}
              </div>
            </div>
          </section>

          
          <section className="items-section" style={{ '--section-color': '#9C27B0' }}>
            
            <h2>VEHICLES</h2>
            
            <div className="items-scroll-container">
              
              <div className="items-grid">
               
                {vehicles.slice(0, 8).map((vehicle) => (
                  
                  <ItemCard
                    key={vehicle.uid} 
                    item={vehicle} 
                    type="vehicles" 
                    onLearnMore={() => handleLearnMore(vehicle, 'vehicles')} 
                  />
                ))}
              </div>
            </div>
          </section>

        </main>
      </div>

    
      
     
      <DetailModal
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        item={selectedItem} 
        type={selectedType} 
      />
    </div>
  );
};


export default Home;
  

	