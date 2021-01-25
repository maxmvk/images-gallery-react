import axios from 'axios';
import { SERVER_URL } from '../config';

const instance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

const fileInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
  }
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

fileInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export const authApi = {

  async getAccount() {
    return await instance.get(`account`);
  },

  async login({email, password}) {
    return await instance.post(`auth/login`, {
      email,
      password
    });
  },

  async register({name, surname, email, password}) {
    return await instance.post(`auth/register`, {
      first_name: name,
      last_name: surname,
      email,
      password
    });
  }
};

export const imagesApi = {

  async getImages(filter, page, userId) {
    return await instance.get(`image?sort_created_at=${filter}&page=${page}&user_id=${userId}`);
  },

  async addImage(title, image) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    return await fileInstance.post(`image`, formData);
  },

  async updateImage(title, image, id) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('_method', "PUT");
    return await fileInstance.post(`image/${id}`, formData);
  },

  async deleteImage(id) {
    return await instance.delete(`image/${id}`);
  }
};