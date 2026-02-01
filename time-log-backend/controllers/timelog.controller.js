// controllers/timelog.controller.js

import TimeLog from '../models/timelog.model.js';

// Create a new time log
export const createTimeLog = async (req, res) => {
  try {
    const {
      date,
      name,
      resourceName,
      effortHours,
      remarks,
      startDate,
      onboardedDate,
      status
    } = req.body;

    const newLog = new TimeLog({
      date,
      name,
      resourceName,
      effortHours,
      remarks,
      startDate,
      onboardedDate,
      status
    });

    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (err) {
    console.error('Create error:', err);
    res.status(500).json({ message: 'Failed to create time log' });
  }
};

// Get all time logs
export const getAllTimeLogs = async (req, res) => {
  try {
    const logs = await TimeLog.find();
    res.status(200).json(logs);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch logs' });
  }
};

// Update a log
export const updateTimeLog = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await TimeLog.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Time log not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Failed to update log' });
  }
};

// Delete a log
export const deleteTimeLog = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await TimeLog.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Time log not found' });
    }

    res.status(200).json({ message: 'Time log deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Failed to delete log' });
  }
};
