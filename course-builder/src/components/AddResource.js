import React, { useState } from 'react';
import './AddResource.css';

const AddResource = ({ addResource }) => {
  const [resourceName, setResourceName] = useState('');
  const [resourceType, setResourceType] = useState('link');
  const [resourceContent, setResourceContent] = useState('');

  const handleAddResource = () => {
    if (resourceName.trim() !== '' && resourceContent.trim() !== '') {
      addResource({ name: resourceName, type: resourceType, content: resourceContent });
      setResourceName('');
      setResourceContent('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResourceContent(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={resourceName}
        onChange={(e) => setResourceName(e.target.value)}
        placeholder="Resource name"
      />
      <select value={resourceType} onChange={(e) => setResourceType(e.target.value)}>
        <option value="link">Link</option>
        <option value="image">Image</option>
        <option value="pdf">PDF</option>
      </select>
      {resourceType === 'link' ? (
        <input
          type="text"
          value={resourceContent}
          onChange={(e) => setResourceContent(e.target.value)}
          placeholder="Resource content"
        />
      ) : (
        <input type="file" onChange={handleFileChange} />
      )}
      <button onClick={handleAddResource}>Add Resource</button>
    </div>
  );
};

export default AddResource;

