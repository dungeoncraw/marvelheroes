import { AxiosError } from 'axios';

export const DefaultAPIErrorMessage = 'Internal Server Error';

export const getApiErrorContext = (err: AxiosError) => 
    String(err.response?.data?.message) || DefaultAPIErrorMessage;
