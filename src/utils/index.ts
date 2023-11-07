import getUserLocation, { openWeatherAPI, openWeatherImages } from "./connections";

export { openWeatherAPI, openWeatherImages, getUserLocation };

export const apiKey = "5339176bef3c8725c8a9c64ccb7d985f";

export const imageSrc = (name:string) => `https://openweathermap.org/img/wn/${name}@2x.png`;