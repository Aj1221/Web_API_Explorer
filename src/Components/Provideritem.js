import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProviderItem({ provider }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const [providerDetails, setProviderDetails] = useState(null);
  const navigate = useNavigate();

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    let isMounted = true;

    // Fetch the provider details from the API
    const fetchProviderDetails = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        const response = await fetch(`https://api.apis.guru/v2/${provider}.json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const providerInfo = data.apis && data.apis[provider] && data.apis[provider].info;

        // Check if the component is still mounted before updating state
        if (isMounted) {
          setProviderDetails(providerInfo);
          setIsLoading(false); // Set loading state to false when data is fetched
        }
      } catch (error) {
        console.error('Error fetching provider details:', error);
        setIsLoading(false); // Set loading state to false on error
      }
    };

    if (isExpanded) {
    //   const effectKey = `expanded-${provider}`;
      fetchProviderDetails();
      return () => {
        isMounted = false;
      };
    } else {
      setTimeout(() => {
        if (isMounted) {
          setProviderDetails(null);
        }
      }, 300);
    }
  }, [isExpanded, provider]);

  const navigateToApiDetails = () => {
    navigate(`/api/${provider}`);
  };

  return (
    <li>
      <div className={`provider-header ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpansion}>
        {provider}
        <span className={`toggle-arrow ${isExpanded ? 'up' : 'down'}`} onClick={toggleExpansion}></span>
      </div>
      {isLoading && <div>Loading...</div>} {/* Render the loader */}
      {providerDetails && isExpanded && !isLoading && (
        <div className="provider-details">
          <div className="image-and-name" onClick={navigateToApiDetails}>
            <img src={providerDetails['x-logo']?.url} alt={provider} />
            <h3>{providerDetails.title}</h3>
          </div>
        </div>
      )}
    </li>
  );
}

export default ProviderItem;
