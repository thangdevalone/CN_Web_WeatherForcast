

import { API_KEY, normLocation } from "../constants";
import axiosClient from "./axiosClient"


const astroApi = {
    getAstro(locate:string){
        const url = `/astronomy.json?key=${API_KEY}&q=${normLocation(locate)}&lang=vi`
        return axiosClient.get(url)
    },
   
}
export default astroApi;