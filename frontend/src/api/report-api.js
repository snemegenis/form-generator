import request from "superagent";

const URL = APP_CONFIG.API_URL + APP_CONFIG.API_APP_PREFIX + '/report';
const print = (patientId, fillDate, fillNumber, date, number) => {
  return request.post(URL + '/disability').responseType('blob').send({patientId, fillDate, fillNumber, date, number});
}

export default {
  print
}