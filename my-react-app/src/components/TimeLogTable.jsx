import React from 'react';

function TimeLogTable({ timeLogs, handleEdit, handleDelete }) {
  return (
    <div className="table-section">
      <h2>Time Log Details</h2>
      {timeLogs.length === 0 ? (
        <p className="no-data">No time logs recorded yet. Add some above!</p>
      ) : (
        <div className="table-responsive">
          <table className="time-log-table">
            <thead>
              <tr>
                <th>S No</th>
                <th>Date</th>
                <th>Prospect Name</th>
                <th>Resource Name</th>
                <th>Effort (Hrs)</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {timeLogs.map((log, index) => (
                <tr key={log._id || log.id}>
                  <td>{index + 1}</td>
                  <td>{log.date}</td>
                  <td>{log.name}</td>
                  <td>{log.resourceName}</td>
                  <td>{log.effortHours}</td>
                  <td>{log.remarks}</td>
                  <td className="actions">
                    <button onClick={() => handleEdit(log)} className="edit-button">Edit</button>
                    <button onClick={() => handleDelete(log._id || log.id)} className="delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TimeLogTable;
