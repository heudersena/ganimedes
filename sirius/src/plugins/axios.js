import axios from 'axios'

const api = axios.create({
    baseURL: "http://192.168.0.111:4005/api/v1"
})


api.interceptors.request.use((request) => {
    const token = localStorage.getItem("sirius::access_token");
    if (token) {
        request.headers.Authorization = "Bearer " + token;
    }
    return request;
});


export default api