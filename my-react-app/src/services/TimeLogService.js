import axios from 'axios';

const API_URL = 'http://localhost:5000/api/timelogs';

const getAll = () => {
  return axios.get(API_URL);
};

const create = (data) => {
  return axios.post(API_URL, data);
};

const update = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

const remove = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

const TimeLogService = {
  getAll,
  create,
  update,
  remove,
};

export default TimeLogService;