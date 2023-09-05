import React, { useEffect, useState } from 'react';
import {  useLocation } from 'react-router-dom';
import ProviderItem from './Provideritem';

function Home() {
  const [providers, setProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state as true
  const location = useLocation(); // Access the current location
  const queryParams = new URLSearchParams(location.search);
  const [isSidebarOpen, setIsSidebarOpen] = useState(queryParams.get('sidebarOpen') === 'true');

  useEffect(() => {
    // Fetch the list of providers from https://api.apis.guru/v2/providers.json
    fetch('https://api.apis.guru/v2/providers.json')
      .then((response) => response.json())
      .then((data) => {
        setProviders(data.data);
        setIsLoading(false); // Set loading state to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching providers:', error);
        setIsLoading(false); // Set loading state to false on error
      });


  }, []);

  useEffect(() => {
    document.body.classList.toggle('expanded-body', isSidebarOpen);

    // Toggle the 'darkened-home' class on the home element
    document.querySelector('.home').classList.toggle('darkened-home', isSidebarOpen);
  },[isSidebarOpen])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle('expanded-body', isSidebarOpen);

    // Toggle the 'darkened-home' class on the home element
    document.querySelector('.home').classList.toggle('darkened-home', !isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle('expanded-body', isSidebarOpen);

    // Toggle the 'darkened-home' class on the home element
    document.querySelector('.home').classList.toggle('darkened-home', !isSidebarOpen);
  };

  



  return (
    <div className="home">
      <button className="explore-button" onClick={toggleSidebar}>
        Explore web APIs
      </button>
      <div className={`sidebar ${isSidebarOpen ? 'expanded' : ''}`}>
        <ul className="provider-list">
          <button className="close-button" onClick={closeSidebar}></button>
          <h1>Select Provider</h1>
          {isLoading ? ( // Display a loader while isLoading is true
            <div>Loading providers...</div>
          ) : (
            providers?.map((provider) => (
              <ProviderItem key={provider} provider={provider} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Home;
