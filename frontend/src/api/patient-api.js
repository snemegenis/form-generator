import request from "superagent";

let AuthIntercept = require('superagent-intercept')((err, res) => {
  if (err) {
    console.log(err);
  }
  if (res && res.status) {
    console.log("Status = "+res.status);
  }

});

const URL = APP_CONFIG.API_URL + APP_CONFIG.API_APP_PREFIX + '/patient';
const load = (doctorId) => request.get(URL + '/list').use(AuthIntercept);
const save = (patient) => request.post(URL + '/save').send(patient);

export default {
  load,
  save
}