import getUserLocation, { openWeatherAPI, openWeatherImages } from "./connections";

export { openWeatherAPI, openWeatherImages, getUserLocation };

export const imageSrc = (name:string) => `https://openweathermap.org/img/wn/${name}@2x.png`;

export const toDay = (value: number) =>{
    switch(value){
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Today";
    }
}

export const month = (value: number) =>{
    switch(value){
        case 1:
            return "January";
        case 2:
            return "Febrary";
        case 3:
            return "Match";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
        default:
            return "unknown";
    }
}

export const bounds = (value: number, min: number, max: number): number =>{
    if(value < min){
        return min;
    }

    if(value > max){
        return max;
    }
    return value;
}