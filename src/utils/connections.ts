import axios from "axios";

export const openWeatherAPI =  axios.create({
	headers: { 
		//'Access-Control-Allow-Origin': '*',
        //'Access-Control-Allow-Headers': '*',
		'Content-Type': 'application/x-www-form-urlencoded' 
	},
	//withCredentials: false, 
	baseURL: "https://api.openweathermap.org", });
    
export const openWeatherImages =  axios.create({
    headers: { 
        //'Access-Control-Allow-Origin': '*',
        //'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/x-www-form-urlencoded' 
    },
    //withCredentials: false, 
    baseURL: "https://openweathermap.org/img/wn", });

const getUserLocation = async () => axios.get('https://ipapi.co/json/');

export default getUserLocation;