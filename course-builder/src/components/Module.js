import React from 'react';
import ResourceList from './ResourceList';
import AddResource from './AddResource';
import './Module.css';

const Module = ({ module, addResourceToModule, deleteModule, renameModule, deleteResource, renameResource }) => {
  const handleAddResource = (resource) => {
    addResourceToModule(module.id, resource);
  };

  return (
    <div>
      <h3>
        {module.name}
        <button onClick={() => renameModule(module.id)}>Rename</button>
        <button onClick={() => deleteModule(module.id)}>Delete</button>
      </h3>
      <AddResource addResource={handleAddResource} />
      <ResourceList
        resources={module.resources}
        deleteResource={deleteResource}
        renameResource={renameResource}
        moduleId={module.id}
      />
    </div>
  );
};

export default Module;
