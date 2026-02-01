import React from 'react';

function TimeLogForm({
  formData,
  setFormData,
  handleChange,
  handleSubmit,
  isEditing,
  setIsEditing,
  closeForm
}) {
  return (
    <div className="form-section modal-form">
      <div className="form-header">
        <h2>{isEditing ? 'Edit Time Log' : 'Add New Time Log'}</h2>
        <button className="close-button" onClick={closeForm}>×</button>
      </div>
      <form onSubmit={handleSubmit} className="time-log-form">
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Prospect Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Sobha Realty"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="resourceName">Resource Name:</label>
          <input
            type="text"
            id="resourceName"
            name="resourceName"
            value={formData.resourceName}
            onChange={handleChange}
            placeholder="e.g., Abhinandana"
          />
        </div>

        <div className="form-group">
          <label htmlFor="effortHours">Effort in Hours:</label>
          <input
            type="number"
            id="effortHours"
            name="effortHours"
            value={formData.effortHours}
            onChange={handleChange}
            placeholder="e.g., 8"
            min="0"
            step="0.5"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="remarks">Remarks:</label>
          <textarea
            id="remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="e.g., Checklist Configuration"
            rows="3"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Prospect Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="onboardedDate">Prospect Onboarded Date:</label>
          <input
            type="date"
            id="onboardedDate"
            name="onboardedDate"
            value={formData.onboardedDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Prospect Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
            <option value="Zero">Zero</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          {isEditing ? 'Update Log' : 'Add Log'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setFormData({
                id: null,
                date: '',
                name: '',
                resourceName: '',
                effortHours: '',
                remarks: '',
                startDate: '',
                onboardedDate: '',
                status: 'Active'
              });
            }}
            className="cancel-button"
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
}

export default TimeLogForm;
