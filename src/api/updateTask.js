import { axiosInstance } from "./axios";

export const updateTask=async(payload)=>{
    return await axiosInstance.post(`/api/v1/update-task/${sessionStorage.getItem('rasp_id')}`,payload)
}