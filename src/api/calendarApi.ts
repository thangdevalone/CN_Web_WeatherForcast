

import { API_KEY, normLocation } from "../constants";
import axiosClient from "./axiosClient"


const calendarApi = {
    getData(locate:string,dt:string,param:string){
        const url = `/${param}.json?key=${API_KEY}&q=${normLocation(locate)}&dt=${dt}&lang=vi&aqi=yes`
        
        return axiosClient.get(url)
    },
}
export default calendarApi;