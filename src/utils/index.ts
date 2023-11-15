import getUserLocation, { openWeatherAPI, openWeatherImages } from "./connections";

export { openWeatherAPI, openWeatherImages, getUserLocation };

export const imageSrc = (name:string) => `https://openweathermap.org/img/wn/${name}@2x.png`;