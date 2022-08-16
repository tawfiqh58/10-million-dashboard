import axios from 'axios';
import { SEVER_URL } from '../config';

class UserService {
  post(data) {
    return axios.post(`${SEVER_URL}/api/users`, data);
  }

  get(id) {
    return axios.get(`${SEVER_URL}/api/users/${id}`);
  }

  delete(userId) {
    return axios.delete(`${SEVER_URL}/api/users/${userId}`);
  }

  deleteMany(userIds) {
    return axios.post(`${SEVER_URL}/api/users/deleteMany`, { ids: userIds });
  }
}

export default new UserService();
