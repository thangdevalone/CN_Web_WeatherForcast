

import { API_KEY, normLocation } from "../constants";
import axiosClient from "./axiosClient"


const forcastApi = {
    getForcast(locate:string,days:number){
        const url = `/forecast.json?key=${API_KEY}&q=${normLocation(locate)}&days=${days}&lang=vi&aqi=yes`
        return axiosClient.get(url)
    },
}
export default forcastApi;