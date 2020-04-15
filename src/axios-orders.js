import axios from "axios";

const instance = axios.create({
    baseURL : "https://burger-app-example-b8caa.firebaseio.com/"
});

export default instance;