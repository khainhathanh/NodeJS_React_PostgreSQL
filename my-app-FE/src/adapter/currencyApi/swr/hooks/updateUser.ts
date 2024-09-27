import axios, { AxiosResponse } from "axios";
interface Props{
    id: BigInt,
    userName: string,
    fullName: string,
    email: string,
    phone: string,
    password: string,
}
export default function updateUser(user:Props){
    return axios.put<AxiosResponse>("http://localhost:8000/updateUser", {
            user: user
      });
}