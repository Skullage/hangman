import axios from "axios";
import { VUE_APP_SOCKET_ENDPOINT } from "../config/config.js";

axios.defaults.baseURL = VUE_APP_SOCKET_ENDPOINT;

const instance = axios.create({});

export default instance;
