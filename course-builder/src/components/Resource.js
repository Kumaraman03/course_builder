import React from 'react';
import './Resource.css';

const Resource = ({ resource, deleteResource, renameResource, moduleId }) => {
  return (
    <div>
      <span>{resource.name}</span>
      <button onClick={() => renameResource(moduleId, resource.id)}>Rename</button>
      <button onClick={() => deleteResource(moduleId, resource.id)}>Delete</button>
    </div>
  );
};

export default Resource;
