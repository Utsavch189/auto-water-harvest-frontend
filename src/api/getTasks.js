import { axiosInstance } from "./axios";

export const getTasks=async()=>{
    return axiosInstance.get(`/api/v1/get-tasks/${sessionStorage.getItem('rasp_id')}`)
}