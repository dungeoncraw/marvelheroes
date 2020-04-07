import getClient from './client';
const apiKey = `apikey=${process.env.REACT_APP_PUBLIC_MARVEL_KEY}`;
export default {
    get(url: string) {
        return getClient().get(`${url}&${apiKey}`)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error));
    },

    getWithParms(path: string, params: {}) {
        return getClient().get(`${path}&${apiKey}`, { params })
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error));
    }
};