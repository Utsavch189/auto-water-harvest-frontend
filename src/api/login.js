import { axiosInstance } from "./axios";

export const login=async(payload)=>{
    return await axiosInstance.post(`/api/v1/login/`,payload)
}