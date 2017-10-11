import request from "superagent";

const URL = APP_CONFIG.API_URL + APP_CONFIG.API_APP_PREFIX + '/patient';
const load = (doctorId) => request.post(URL + '/list').send({doctorId});
const save = (patient) => request.post(URL + '/save').send(patient);

export default {
  load,
  save
}