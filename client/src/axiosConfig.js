import axios from 'axios';

const getJwtTokenFromCookie = () => {
  const cookie = document.cookie
    .split(';')
    .find((cookie) => cookie.trim().startsWith('jwt='));
  if (cookie) {
    return cookie.split('=')[1];
  }
  return null;
};

const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    function (config) {
      const token = getJwtTokenFromCookie();
      if (token && !config.disableInterceptor) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );
};

export default setupAxiosInterceptors;
