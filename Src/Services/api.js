import * as networkPaths from './networkPaths';
import baseAxios from './baseAxios';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosApiInstance = axios.create({
  baseURL: networkPaths.BASE_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers.Accept = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (!originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await AsyncStorage.getItem('accessToken');
      console.log('response', access_token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  },
);

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export default axiosApiInstance;
