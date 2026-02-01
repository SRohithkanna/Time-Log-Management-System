import React, { useState, useEffect } from 'react';
import './App.css';
import TimeLogForm from './components/TimeLogForm';
import TimeLogTable from './components/TimeLogTable';
import ProspectSummary from './components/ProspectSummary';
import TimeLogService from './services/TimeLogService';
import Toolbox from './components/Toolbox';
import Dialog from './components/Dialog';

function App() {
  const [timeLogs, setTimeLogs] = useState([]);
  const [formData, setFormData] = useState({
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
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState('');
  const [showSummary, setShowSummary] = useState(true);

  useEffect(() => {
    retrieveTimeLogs();
  }, []);

  const retrieveTimeLogs = () => {
    TimeLogService.getAll()
      .then((response) => {
        setTimeLogs(response.data);
        setMessage('');
      })
      .catch((e) => {
        console.error('Error fetching logs:', e);
        setMessage('Failed to fetch logs');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      TimeLogService.update(formData.id, formData)
        .then((response) => {
          setMessage('Log updated successfully!');
          retrieveTimeLogs();
          setIsEditing(false);
          resetForm();
          setIsDialogOpen(false);
        })
        .catch((e) => {
          console.error('Error updating time log:', e);
          setMessage('Error updating log');
        });
    } else {
      TimeLogService.create(formData)
        .then((response) => {
          setMessage('Log added successfully!');
          retrieveTimeLogs();
          resetForm();
          setIsDialogOpen(false);
        })
        .catch((e) => {
          console.error('Error creating time log:', e);
          setMessage('Error adding log');
        });
    }
  };

  const resetForm = () => {
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
  };

  const handleEdit = (log) => {
    setFormData({
      id: log._id || log.id,
      date: log.date,
      name: log.name,
      resourceName: log.resourceName,
      effortHours: log.effortHours.toString(),
      remarks: log.remarks,
      startDate: log.startDate,
      onboardedDate: log.onboardedDate,
      status: log.status
    });
    setIsEditing(true);
    setIsDialogOpen(true);
    setMessage('');
  };

  const handleDelete = (id) => {
    TimeLogService.remove(id)
      .then((response) => {
        setMessage('Log deleted successfully!');
        retrieveTimeLogs();
      })
      .catch((e) => {
        console.error('Error deleting time log:', e);
        setMessage('Error deleting log');
      });
  };

  const getProspectSummary = () => {
    const summaryMap = new Map();
    timeLogs.forEach((log) => {
      const prospectName = log.name;
      const effort = parseFloat(log.effortHours) || 0;
      if (!summaryMap.has(prospectName)) {
        summaryMap.set(prospectName, {
          prospectName: prospectName,
          totalHoursSpent: 0,
          startDate: log.startDate || '',
          onboardedDate: log.onboardedDate || '',
          status: log.status || 'Unknown'
        });
      }
      const current = summaryMap.get(prospectName);
      current.totalHoursSpent += effort;
    });
    return Array.from(summaryMap.values());
  };

  const getUniqueProspects = () => {
  return Array.from(
    new Set(
      timeLogs
        .map((log) => log.name)
        .filter((name) => typeof name === 'string' && name.trim() !== '')
    )
  );
};


 const filteredTimeLogs = selectedProspect
  ? timeLogs.filter((log) => log.name === selectedProspect)
  : timeLogs;

  return (
    <div className="container">
      <h1>Time Log Management</h1>

      {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}

      <Toolbox
        onInsert={() => {
          setIsEditing(false);
          resetForm();
          setIsDialogOpen(true);
        }}
      />

      <div className="filter-section">
        <label htmlFor="prospectFilter">Select Prospect: </label>
        <select
          id="prospectFilter"
          value={selectedProspect}
          onChange={(e) => setSelectedProspect(e.target.value)}
        >
          <option value="">--  --</option>
          {getUniqueProspects().map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="toggle-section" style={{ textAlign: 'center', marginBottom: '10px' }}>
        <button onClick={() => setShowSummary((prev) => !prev)}>
          {showSummary ? 'Hide Prospect Summary' : 'Show Prospect Summary'}
        </button>
      </div>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <TimeLogForm
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </Dialog>

      {selectedProspect && (
        <TimeLogTable
          timeLogs={filteredTimeLogs}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}

      {showSummary && <ProspectSummary prospectSummary={getProspectSummary()} />}
    </div>
  );
}

export default App;
