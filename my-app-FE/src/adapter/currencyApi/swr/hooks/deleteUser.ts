import axios, { AxiosResponse } from 'axios';

export const deleteUser = async ({id}: any) => {
    return axios.delete<AxiosResponse>('http://localhost:8000/deleteUser/'+id);
};