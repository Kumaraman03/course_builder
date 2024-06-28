
import React from 'react';
import Module from './Module';
import './ModuleList.css';

const ModuleList = ({ modules, addResourceToModule, deleteModule, renameModule, deleteResource, renameResource }) => {
  return (
    <div>
      {modules.map((module) => (
        <Module
          key={module.id}
          module={module}
          addResourceToModule={addResourceToModule}
          deleteModule={deleteModule}
          renameModule={renameModule}
          deleteResource={deleteResource}
          renameResource={renameResource}
        />
      ))}
    </div>
  );
};

export default ModuleList;