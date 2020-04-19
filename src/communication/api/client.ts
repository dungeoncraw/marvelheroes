import axios from 'axios';

const getClient = () => {
    const URL = 'https://gateway.marvel.com/v1/public';

    const options = {
        baseURL: URL
    };

    const client = axios.create(options);

    return client;
};

export default getClient;
