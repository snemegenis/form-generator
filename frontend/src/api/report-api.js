import axios from "axios";

const URL = APP_CONFIG.API_URL + APP_CONFIG.API_APP_PREFIX;
const print = (patientId, fillDate, fillNumber) => {
  return axios.get(`${URL}/patient/${patientId}/disability`, {
    params: {
      fillDate,
      fillNumber
    },
    responseType: 'blob'
  })
};

export default {
  print
}