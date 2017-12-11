import axios from "axios";

const URL = APP_CONFIG.API_URL + APP_CONFIG.API_APP_PREFIX + '/auth';
const login = (username, password) => axios.post(URL + "/login", {
  username, password});
const logout = () => axios.delete(URL + "/logout");

export default {
  login,
  logout
}