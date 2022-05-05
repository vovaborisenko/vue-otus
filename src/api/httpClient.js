import axios from 'axios';

axios.defaults.baseURL = 'https://kinopoiskapiunofficial.tech/api';

axios.defaults.headers['X-API-KEY'] = 'a1ae7c73-6c37-4135-9948-e9f38a836249';
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers.accept = 'application/json';

export default axios;
