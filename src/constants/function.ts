import { AirQualityData } from '../models';

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
    if (code === 1063 || code === 1153 || code === 1240 || code === 1189) {
        return '/SmallRain.png';
    }
    if (code === 1195) {
        return '/RainThunder.png';
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
    if (code === 1063 || code === 1153 || code === 1240 || code === 1189) {
        return { transform: 'translate(10px,-5px)' };
    }
    if (code === 1195) {
        return { transform: 'translateY(15px)' };
    }
    if (code === 1009) {
        return {};
    }
    return { transform: 'unset' };
}

export function generateAdvice(airQualityData: AirQualityData): {
    alert: 'Tốt' | 'Trung bình' | 'Không lành mạnh' | 'Nguy hiểm' | 'Tuyệt vời';
    message: string;
} {
    if (airQualityData['us-epa-index'] === 6) {
        return {
            alert: 'Nguy hiểm',
            message: 'Ra ngoài giờ này chỉ có đắp chiếu thôi.',
        };
    }

    if (airQualityData['us-epa-index'] === 5 || airQualityData['us-epa-index'] === 4) {
        return {
            alert: 'Không lành mạnh',
            message: 'Hạn chế ra ngoài và sử dụng khẩu trang.',
        };
    }

    if (airQualityData['us-epa-index'] === 3) {
        return {
            alert: 'Trung bình',
            message: 'Hạn chế ra ngoài trong thời gian dài với những người nhạy cảm',
        };
    }
    if (airQualityData['us-epa-index'] === 2) {
        return {
            alert: 'Tốt',
            message: 'Thật là 1 dịp đặc biệt để ra ngoài với bạn bè và người thân',
        };
    }
    return {
        alert: 'Tuyệt vời',
        message: 'Cùng người yêu bạn dạo quanh thành phố, tận hưởng không khí trong lành đi nào',
    };
}

export function checkTime(date: string) {
    const currentTime = new Date(); // Get the current time
    const providedTime = new Date(date); // Convert the provided date string to a Date object

    if (providedTime > currentTime) {
        // The provided time is in the future
        return 'future';
    } else {
        // The provided time is in the past (history)
        return 'history';
    }
}
export function calculateDateDifference(startDate: string, endDate: string): number | null {
    const start = Date.parse(startDate);
    const end = Date.parse(endDate);

    if (isNaN(start) || isNaN(end)) {
        // Định dạng ngày không hợp lệ
        return null;
    }

    const timeDifference = Math.abs(end - start);
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
}
