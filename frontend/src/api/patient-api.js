import request from "superagent";

const URL = APP_CONFIG.API_URL + APP_CONFIG.API_APP_PREFIX + '/patient';
const load = (doctorId) => request.get(URL + '/list');
const save = (patient) => request.post(URL + '/save').send(patient);

export default {
  load,
  save
}