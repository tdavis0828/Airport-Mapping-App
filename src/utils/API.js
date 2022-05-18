import axios from 'axios';


const urlBase = 'https://api.aviationapi.com/v1/airports?apt=';

export const getAirports = (siteNum) => {
    return axios.get(`${urlBase}${siteNum}`);
  };