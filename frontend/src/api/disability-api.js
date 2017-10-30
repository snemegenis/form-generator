import request from "superagent";

const URL = APP_CONFIG.API_URL + APP_CONFIG.API_APP_PREFIX + '/patient';
const add = (disability) => request.post(URL + '/' + disability.patientId + '/disability').send(disability);

export default {
    add
}