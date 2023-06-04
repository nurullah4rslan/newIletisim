import * as networkPaths from './networkPaths';
import axios from 'axios';
const baseAxios = axios.create({
  baseURL: networkPaths.BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default baseAxios;
