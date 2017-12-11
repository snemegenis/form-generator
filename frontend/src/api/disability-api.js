import axios from "axios";

const URL = APP_CONFIG.API_URL + APP_CONFIG.API_APP_PREFIX + '/patient';
const load = (patientId, disabilityId) => axios.get(`${URL}/${patientId}/disability/${disabilityId}`);
const add = (disability) => axios.post(URL + '/' + disability.patientId + '/disability', disability);
const saveTmp = (disability) => axios.post(URL + '/' + disability.patientId + '/disability/tmp', disability);
const loadTmp = (patientId) => axios.get(URL + '/' + patientId + '/disability/tmp');

export default {
    load,
    add,
    saveTmp,
    loadTmp
}