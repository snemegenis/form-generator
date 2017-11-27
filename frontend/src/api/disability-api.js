import request from "superagent";

const URL = APP_CONFIG.API_URL + APP_CONFIG.API_APP_PREFIX + '/patient';
const load = (patientId, disabilityId) => request.get(`${URL}/${patientId}/disability/${disabilityId}`);
const add = (disability) => request.post(URL + '/' + disability.patientId + '/disability').send(disability);
const saveTmp = (disability) => request.post(URL + '/' + disability.patientId + '/disability/tmp').send(disability);
const loadTmp = (patientId) => request.get(URL + '/' + patientId + '/disability/tmp');

export default {
    load,
    add,
    saveTmp,
    loadTmp
}