import axios from 'axios';

export const baseurl = 'https://personal-laverne-utsav-3faaa6d6.koyeb.app/'

export const axiosInstance = axios.create({
  baseURL: baseurl
})

axiosInstance?.interceptors?.response?.use(async(res) => {
  console.log("Axios response:", res);
  return res;
}, err => {
  console.log("Axios error:", err);
  throw err;
});
