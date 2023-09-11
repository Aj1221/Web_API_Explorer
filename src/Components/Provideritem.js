import React, { useState, useEffect } from 'react';
import ExpandedProviderItem from './ExpandedProviderItem';
import PropTypes from 'prop-types';

function ProviderItem({ provider }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [providerDetails, setProviderDetails] = useState(null);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchProviderDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.apis.guru/v2/${provider}.json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const providerInfo = data.apis && data.apis[provider] && data.apis[provider].info;

        if (isMounted) {
          setProviderDetails(providerInfo);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching provider details:', error);
        setIsLoading(false);
      }
    };

    if (isExpanded) {
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

  return (
    <li>
      {isExpanded ? (
        <ExpandedProviderItem
          provider={provider}
          providerDetails={providerDetails}
          toggleExpansion={toggleExpansion}
        />
      ) : (
        <div className="providerbox">
          <div
            className={`provider-header ${isExpanded ? 'expanded' : ''}`}
            onClick={toggleExpansion}
          >
            {provider}
          </div>
          <div
            className={`toggle-arrow ${isExpanded ? 'up' : 'down'}`}
            onClick={toggleExpansion}
          ></div>
        </div>
      )}
      {isLoading && <div>Loading...</div>}
    </li>
  );
}

ProviderItem.propTypes = {
  provider: PropTypes.string.isRequired, // Define the PropTypes for 'provider'
};

export default ProviderItem;
