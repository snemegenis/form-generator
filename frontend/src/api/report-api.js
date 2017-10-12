import request from "superagent";

const URL = APP_CONFIG.API_URL + APP_CONFIG.API_APP_PREFIX + '/report';
const print = (patientId, fillDate, fillNumber) => {
  return request.get(URL + `/patient/${patientId}/disability`)
    .query({fillDate, fillNumber}).responseType('blob');
};

export default {
  print
}