import React from 'react';

const RoleSelector = ({ selectedButton, onSelect }) => {
  const handleButtonClick = (buttonName) => {
    onSelect(buttonName);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => handleButtonClick('Visitor')}
        style={{
          margin: '0 10px',
          backgroundColor: selectedButton === 'Visitor' ? 'green' : 'black',
        }}
      >
        Visitor
      </button>
      <button
        type="button"
        onClick={() => handleButtonClick('Radiologist')}
        style={{
          margin: '0 10px',
          backgroundColor: selectedButton === 'Radiologist' ? 'green' : 'black',
        }}
      >
        Radiologist
      </button>
      <button
        type="button"
        onClick={() => handleButtonClick('Doctor')}
        style={{
          margin: '0 10px 10px',
          backgroundColor: selectedButton === 'Doctor' ? 'green' : 'black',
        }}
      >
        Doctor
      </button>
    </div>
  );
};

export default RoleSelector;
