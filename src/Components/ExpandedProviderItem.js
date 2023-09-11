import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ExpandedProviderItem({ provider, providerDetails, toggleExpansion }) {
  // Check if providerDetails is available and in the correct format
  const isDataAvailable =
    providerDetails && providerDetails.title && providerDetails['x-logo']?.url;

  const navigate = useNavigate();

  const navigateToApiDetails = () => {
    navigate(`/api/${provider}`);
  };

  return (
    <div className="provider-details">
      <div className="Insideproviderbox">
        <div className={`provider-header expanded`} onClick={toggleExpansion}>
          {provider}
        </div>
        <div className={`toggle-arrow up`} onClick={toggleExpansion}></div>
      </div>
      {isDataAvailable ? (
        <div className="image-and-name" onClick={navigateToApiDetails}>
          <img src={providerDetails['x-logo']?.url} alt={provider} />
          <h3>{providerDetails.title}</h3>
        </div>
      ) : (
        <div className="api-response-incorrect">API response is incorrect</div>
      )}
    </div>
  );
}

ExpandedProviderItem.propTypes = {
  provider: PropTypes.string.isRequired, // Define the PropTypes for 'provider'
  providerDetails: PropTypes.shape({
    title: PropTypes.string, // Define the PropTypes for 'title'
    'x-logo': PropTypes.shape({
      url: PropTypes.string, // Define the PropTypes for 'url'
    }),
  }),
  toggleExpansion: PropTypes.func.isRequired, // Define the PropTypes for 'toggleExpansion'
};

export default ExpandedProviderItem;
