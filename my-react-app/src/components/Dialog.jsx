import React from 'react';
import './Dialog.css';

function Dialog({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div
        className="dialog-content"
        onClick={(e) => e.stopPropagation()} // Prevent background click from closing
      >
        <button className="dialog-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

export default Dialog;
