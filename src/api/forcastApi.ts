
import { API_KEY } from "@/constants";
import axiosClient from "./axiosClient"


const forcastApi = {
    getForcast(locate:string,days:number){
        const url = `/forecast.json?key${API_KEY}&q=${locate}&days=${days}`
        return axiosClient.get(url)
    },
   
}
export default forcastApi;