import axios, { AxiosResponse } from 'axios';

export const findUser = async ({id,user,pass}: any) => {
    const url = "http://localhost:8000/getUser"
    if(id != null){
      return axios.post<AxiosResponse>(url, {id: id});
    }
    return axios.post<AxiosResponse>(url, {user: user,pass: pass,});
};