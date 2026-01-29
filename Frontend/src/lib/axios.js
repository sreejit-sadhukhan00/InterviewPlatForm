import axios from 'axios';

const axiosinstance= axios.create({
     baseURL:import.meta.env.VITE_API_URL,
     withCredentials:true //browser will send cookies along with every requests
});
export default axiosinstance;