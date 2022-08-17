import axios from 'axios';
import { SEVER_URL } from '../config';

class UserService {
  post(data) {
    return axios.post(`${SEVER_URL}/api/users`, data);
  }

  get(uid) {
    return axios.get(`${SEVER_URL}/api/users/${uid}`);
  }

  delete(uid) {
    return axios.delete(`${SEVER_URL}/api/users/${uid}`);
  }

  deleteMany(uIds) {
    return axios.post(`${SEVER_URL}/api/users/deleteMany`, { ids: uIds });
  }
}

export default new UserService();
