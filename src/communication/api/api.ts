import getClient from './client';
const apiKey = `${process.env.REACT_APP_PUBLIC_MARVEL_KEY}`;
export default {
    get(url: string) {
        return getClient().get(`${url}?apikey=${apiKey}`)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error));
    },

    getWithParms(path: string, params: {}) {
        const paramsWithApi = {
            ...params, 
            apikey: apiKey
        }
        return getClient().get(path, { params: paramsWithApi })
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error));
    }
};