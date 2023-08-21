import axios from 'axios';
import {API_URL} from "../config/config.js";

axios.defaults.baseURL = API_URL;

const instance = axios.create({});

export default instance;
