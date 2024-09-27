import axios, { AxiosResponse } from 'axios';

export const getAllUser = async ({page,keySearch}: any) => {
    const res : AxiosResponse = await axios.get("http://localhost:8000/users", {
        params:{
          keySearch : keySearch,
          pageCurrent : page,
          pageSize : 5
        }
      });
  return res;
};
