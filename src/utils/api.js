// src/utils/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.mockfly.dev/mocks/4f1d8aef-1b46-40b2-a09c-ee27512e497c', // Updated base URL
    headers: {
        'Authorization': `Bearer 4129585b-db61-4024-a47c-a96d47c6370f`,
    },
});

export default api;

