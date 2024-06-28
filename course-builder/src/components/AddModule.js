import React, { useState } from 'react';
import './AddModule.css';

const AddModule = ({ addModule }) => {
  const [moduleName, setModuleName] = useState('');

  const handleAddModule = (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    if (moduleName.trim() !== '') {
      addModule(moduleName);
      setModuleName('');
    }
  };

  return (
    <form onSubmit={handleAddModule}>
      <input
        type="text"
        value={moduleName}
        onChange={(e) => setModuleName(e.target.value)}
        placeholder="New module name"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddModule;
