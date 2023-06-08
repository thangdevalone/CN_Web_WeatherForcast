import { AirQualityData } from "@/models";

export function normLocation(location: string) {
    return location.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
export function getIconWeather(code: number) {
    if (code === 1000) {
        return '/Sun.png';
    }
    if (code === 1003 || code === 1006) {
        return '/Cloudy.png';
    }
    if (code === 1063 || code === 1153 || code === 1240 || code===1189) {
        return '/SmallRain.png';
    }
    if (code===1195){
        return '/RainThunder.png'
    }
    if (code === 1009) {
        return '/NoSun.png';
    }
    return '/Sun.png';
}

export function getConfigIconWeather(code: number) {
    if (code === 1000) {
        return {};
    }
    if (code === 1003 || code === 1006) {
        return { transform: 'translateX(15px)' };
    }
    if (code === 1063 || code === 1153 || code === 1240 || code===1189) {
        return { transform: 'translate(10px,-5px)' };
    }
    if (code===1195){
        return  { transform: 'translateY(15px)' };
    }
    if (code === 1009) {
        return {};
    }
    return {transform:"unset"};
}


export function generateAdvice(airQualityData: AirQualityData): { alert: "Tốt" | "Trung bình" | "Xấu"; message: string } {

    const { pm2_5, pm10 } = airQualityData;
  
    if (pm2_5 > 50 || pm10 > 50) {
      return { alert: "Xấu", message: "Hạn chế ra ngoài và sử dụng khẩu trang." };
    }
  
    if (airQualityData["us-epa-index"] >= 3) {
      return { alert: "Xấu", message: "Hạn chế ra ngoài và sử dụng khẩu trang." };
    }
  
    if (airQualityData["gb-defra-index"] >= 6) {
      return { alert: "Xấu", message: "Hạn chế ra ngoài và sử dụng khẩu trang." };
    }
  
    if (pm2_5 > 20 || pm10 > 20) {
      return { alert: "Trung bình", message: "Hạn chế ra ngoài trong thời gian dài." };
    }
  
    return { alert: "Tốt", message: "Bạn có thể ra ngoài và tận hưởng môi trường." };
  }