import axios from "axios";

const URL = APP_CONFIG.API_URL + APP_CONFIG.API_APP_PREFIX + '/patient';
const load = (doctorId) => axios.get(`${URL}/list`);
const save = (patient) => axios.post(URL + '/save', patient);
const remove = (patientId) => axios.delete(`${URL}/${patientId}`);

export default {
  load,
  save,
  remove
}