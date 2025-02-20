import axios from 'axios';

const getAxiosInstance = (idInstance, apiTokenInstance) => {
  const apiUrl = `https://${idInstance.slice(0, 4)}.api.greenapi.com/waInstance${idInstance}`;
  return axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default getAxiosInstance;
