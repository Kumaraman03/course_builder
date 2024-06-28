import React, { useState } from 'react';
import AddResource from './AddResource';
import './ResourceList.css';

const ResourceList = () => {
  const [resources, setResources] = useState([]);

  const addResource = (resource) => {
    setResources([...resources, resource]);
  };

  return (
    <div>
      <AddResource addResource={addResource} />
      <div className="resource-list">
        {resources.map((resource, index) => (
          <div key={index} className="resource-item">
            <h3>{resource.name}</h3>
            {resource.type === 'link' ? (
              <a href={resource.content} target="_blank" rel="noopener noreferrer">{resource.content}</a>
            ) : resource.type === 'image' ? (
              <img src={resource.content} alt={resource.name} />
            ) : resource.type === 'pdf' ? (
              <embed src={resource.content} type="application/pdf" width="100%" height="500px" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceList;

