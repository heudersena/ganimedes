import axios from 'axios'

const api = axios.create({
    baseURL: "http://192.168.0.106:4005/api/v1"
})


api.interceptors.request.use((request) => {
    // Buscando seu token salvo no localstorage ou qualquer outro local
    const token = localStorage.getItem("sirius::access_token");

    if (token) {
        request.headers.Authorization = "Bearer " + token;
    }
    return request;
});


export default api