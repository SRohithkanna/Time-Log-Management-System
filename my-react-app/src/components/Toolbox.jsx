import React from 'react';
import './Toolbox.css'; // optional styling

function Toolbox({ onInsert }) {
  return (
    <div className="toolbox" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
      <input
        type="text"
        placeholder="Search..."
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <button onClick={onInsert}>Insert</button>
    </div>
  );
}

export default Toolbox;
