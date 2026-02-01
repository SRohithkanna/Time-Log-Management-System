import React from 'react';

function ProspectSummary({ prospectSummary }) {
  return (
    <div className="summary-section">
      <h2>Prospect Summary</h2>
      {prospectSummary.length === 0 ? (
        <p className="no-data">No prospect summary available.</p>
      ) : (
        <div className="table-responsive">
          <table className="summary-table">
            <thead>
              <tr>
                <th>Prospect Name</th>
                <th>Start Date</th>
                <th>Onboarded Date</th>
                <th>Total Hours Spent</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {prospectSummary.map((summary) => (
                <tr key={summary.prospectName}>
                  <td>{summary.prospectName}</td>
                  <td>{summary.startDate}</td>
                  <td>{summary.onboardedDate}</td>
                  <td>{summary.totalHoursSpent.toFixed(1)}</td>
                  <td>{summary.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProspectSummary;
