import axios from 'axios';

export default axios.create({
    // baseURL: "http://localhost:4000/" // Local Server
    baseURL: "https://campus-market-api.onrender.com" // Remote Server
})
