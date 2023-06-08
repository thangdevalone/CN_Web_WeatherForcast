export interface CardWeather{
    avgtemp_c:number,
    date:string,
    condition:{
        text: string,
        code: number,
        icon:string,
    },
    maxwind_kph:number,
    avghumidity:number
}