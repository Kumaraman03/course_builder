// App.js
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import ModuleList from './components/ModuleList';
import AddModule from './components/AddModule';
import './App.css';

const App = () => {
  const [modules, setModules] = useState([]);
  const [mainModule, setMainModule] = useState(null); // Track the main module separately
  const [isAddModuleVisible, setIsAddModuleVisible] = useState(true); // Track if AddModule is visible

  const addModule = (name) => {
    console.log("Adding module:", name);
    const newModule = { id: Date.now(), name, resources: [] };
    if (mainModule) {
      setModules([newModule, ...modules]); // Prepend new module
    } else {
      setMainModule(newModule); // Set as main module if no main module exists
    }
    setIsAddModuleVisible(false); // Hide AddModule after adding a module
  };

  const renameModule = (id) => {
    const newName = prompt('Enter new module name:');
    if (newName) {
      setModules(modules.map(module => (module.id === id ? { ...module, name: newName } : module)));
    }
  };

  const deleteModule = (id) => {
    setModules(modules.filter(module => module.id !== id));
    if (mainModule && mainModule.id === id) {
      setMainModule(null); // Reset main module if deleted
    }
  };

  const addResourceToModule = (moduleId, resource) => {
    setModules(
      modules.map(module =>
        module.id === moduleId ? { ...module, resources: [...module.resources, { ...resource, id: Date.now() }] } : module
      )
    );
  };

  const renameResource = (moduleId, resourceId) => {
    const newName = prompt('Enter new resource name:');
    if (newName) {
      setModules(
        modules.map(module =>
          module.id === moduleId
            ? {
                ...module,
                resources: module.resources.map(resource =>
                  resource.id === resourceId ? { ...resource, name: newName } : resource
                ),
              }
            : module
        )
      );
    }
  };

  const deleteResource = (moduleId, resourceId) => {
    setModules(
      modules.map(module =>
        module.id === moduleId
          ? { ...module, resources: module.resources.filter(resource => resource.id !== resourceId) }
          : module
      )
    );
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const sourceModuleIndex = modules.findIndex(module => module.id.toString() === source.droppableId);
      const newResources = Array.from(modules[sourceModuleIndex].resources);
      const [moved] = newResources.splice(source.index, 1);
      newResources.splice(destination.index, 0, moved);

      const newModules = Array.from(modules);
      newModules[sourceModuleIndex].resources = newResources;
      setModules(newModules);
    } else {
      const sourceModuleIndex = modules.findIndex(module => module.id.toString() === source.droppableId);
      const destinationModuleIndex = modules.findIndex(module => module.id.toString() === destination.droppableId);

      const sourceResources = Array.from(modules[sourceModuleIndex].resources);
      const [moved] = sourceResources.splice(source.index, 1);
      const destinationResources = Array.from(modules[destinationModuleIndex].resources);
      destinationResources.splice(destination.index, 0, moved);

      const newModules = Array.from(modules);
      newModules[sourceModuleIndex].resources = sourceResources;
      newModules[destinationModuleIndex].resources = destinationResources;
      setModules(newModules);
    }
  };

  return (
    <div>
      <h1>Course Builder</h1>
      {isAddModuleVisible && <AddModule addModule={addModule} />} {/* Render AddModule only if it's visible */}
      <DragDropContext onDragEnd={onDragEnd}>
        <ModuleList
          modules={mainModule ? [mainModule, ...modules] : modules} // Render main module first if exists
          addResourceToModule={addResourceToModule}
          deleteModule={deleteModule}
          renameModule={renameModule}
          deleteResource={deleteResource}
          renameResource={renameResource}
        />
      </DragDropContext>
    </div>
  );
};

export default App;
