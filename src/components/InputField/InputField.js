import React from 'react';
import './InputField.css'; // We'll create this CSS file next

const InputField = () => {
  return (
    <div className="input-container">
      <input
        type="text"
        className="full-width-input ask-echo"
        data-button="true"
        placeholder="Need an answer? Ask Echo!"
        readOnly
      />
    </div>
  );
};

export default InputField;