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
  <div className="modal-form">
    <div className="modal-header">
      <h2>{isEditing ? "Edit Time Log" : "Add New Time Log"}</h2>
      <button className="close-btn" onClick={closeForm}>×</button>
    </div>

    <form onSubmit={handleSubmit} className="form-grid">

      {/* Date */}
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      {/* Prospect Name */}
      <div className="form-group">
        <label>Prospect Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Sobha Realty"
          required
        />
      </div>

      {/* Resource Name */}
      <div className="form-group">
        <label>Resource Name</label>
        <input
          type="text"
          name="resourceName"
          value={formData.resourceName}
          onChange={handleChange}
          placeholder="e.g., Abhinandana"
        />
      </div>

      {/* Effort Hours */}
      <div className="form-group">
        <label>Effort (Hours)</label>
        <input
          type="number"
          name="effortHours"
          value={formData.effortHours}
          onChange={handleChange}
          min="0"
          step="0.5"
          required
        />
      </div>

      {/* Start Date */}
      <div className="form-group">
        <label>Prospect Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </div>

      {/* Onboarded Date */}
      <div className="form-group">
        <label>Onboarded Date</label>
        <input
          type="date"
          name="onboardedDate"
          value={formData.onboardedDate}
          onChange={handleChange}
        />
      </div>

      {/* Status */}
      <div className="form-group">
        <label>Status</label>
        <select
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

      {/* Remarks (Full Width) */}
      <div className="form-group full-width">
        <label>Remarks</label>
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          placeholder="e.g., Checklist Configuration"
          rows="3"
        />
      </div>

      {/* Buttons */}
      <div className="form-actions">
        {isEditing && (
          <button
            type="button"
            className="cancel-btn"
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
          >
            Cancel
          </button>
        )}

        <button type="submit" className="submit-btn">
          {isEditing ? "Update Log" : "Add Log"}
        </button>
      </div>
    </form>
  </div>
);

}

export default TimeLogForm;
