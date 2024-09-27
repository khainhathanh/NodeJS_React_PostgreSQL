import axios, { AxiosResponse } from "axios";
interface Props{
    userName: string,
    fullName: string,
    email: string,
    phone: string,
    password: string,
}
export default function createUser(user:Props){
    return axios.post<AxiosResponse>("http://localhost:8000/createUser", {
            user: user
      });
}