import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ApiDetail() {
  const { providerName } = useParams();
  const [apiDetails, setApiDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state as true

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.apis.guru/v2/${providerName}.json`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Check if the provider exists in the data
        if (data.apis && data.apis[providerName]) {
          setApiDetails(data.apis[providerName].info);
        } else {
          console.error(`Provider "${providerName}" not found in API response.`);
        }

        // Set loading state to false when data is fetched
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching API data:', error);
        // Set loading state to false on error
        setIsLoading(false);
      }
    };

    fetchData();
  }, [providerName]);

  const handleExploreMoreClick = () => {
    // Redirect to the first page with the sidebar open using window.location
    window.location.href = '/?sidebarOpen=true';
  };

  console.log('data', apiDetails);
  console.log('providerName', providerName);

  return (
    <div className="api-detail">
      <header>
        {isLoading ? (
          // Display a loader when isLoading is true
          <div>Loading...</div>
        ) : (
          apiDetails && (
            <div className="head">
              <img src={apiDetails['x-logo']?.url} alt={apiDetails.title} />
              <h1 style={{ marginLeft: '13px' }}>{apiDetails.title}</h1>
            </div>
          )
        )}
      </header>
      <div>
        <div className="box">
          <div className="description">
            <h4 className="headPara">Description</h4>
            {isLoading ? 'Loading...' : apiDetails && apiDetails.description}
          </div>
          <div className="swagger">
            <h4 className="headPara">Swagger</h4>
            {isLoading ? 'Loading...' : apiDetails?.swaggerUrl}

            {Object.keys(apiDetails).length > 0 && apiDetails['x-origin'][0]?.url && (
              <a className="swaggerLink" href={apiDetails['x-origin'][0].url} target="_blank" rel="noopener noreferrer">
                {apiDetails['x-origin'][0]?.url}
              </a>
            )}
          </div>
          <div className="contact">
            {isLoading ? (
              // Display a loader when isLoading is true
              <div>Loading...</div>
            ) : (
              apiDetails?.contact && (
                <div>
                  <h2 className="headPara">Contact</h2>
                  <p>Email: {apiDetails.contact.email}</p>
                  <p>Name: {apiDetails.contact.name}</p>
                  <p>URL: {apiDetails.contact.url}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <button className="explore-more-button" onClick={handleExploreMoreClick}>
        Explore More APIs
      </button>
    </div>
  );
}

export default ApiDetail;
