import axios, { AxiosResponse } from 'axios';

export const postLogin = async ({user , code}: any) => {
  const res: AxiosResponse<any> = await  axios.post<AxiosResponse>('http://localhost:8000/authentication', 
    {user : user, code: code});
  return res;
};
