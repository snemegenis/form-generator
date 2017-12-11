import axios from 'axios';

export const setupAxiosInterceptors = onUnauthenticated => {
  const onRequestSuccess = config => {
    var token = localStorage.getItem('auth-token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    config.timeout = 60000;
    return config;
  };
  const onResponseSuccess = (response) => response;
  const onResponseError = error => {
    if (error.response.status === 403) {
      localStorage.removeItem('auth-token');
      onUnauthenticated();
    }
    return Promise.reject(error);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

