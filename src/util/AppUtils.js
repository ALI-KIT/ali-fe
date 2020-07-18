import axios from 'axios';

var baseUrl = 'http://localhost:4000/api'

class AppUtil {
    async loadApi(endPoint) {
    return axios.get(baseUrl + endPoint)
    .then(res => res.data)
    .catch(error => {
        error.status = (error.response && error.response.status) || 500;
        throw error;
    });
}
}

export default AppUtil