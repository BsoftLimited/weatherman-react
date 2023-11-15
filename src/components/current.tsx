import React from "react";
import { Forecast } from "../utils/types";
import "../assets/styles/current.scss";

interface CurrentProps{
    forcast: Forecast,
    location: { latitude: string, longitude: string, country: string, place: string }
}

const Current:React.FC<CurrentProps> = ({forcast, location}) =>{
    return (
        <div className="weatherDetails">
            <span className="location">{ location.place}</span>
            <div style={{ display:"flex", marginBottom: -30, padding:0, alignItems:"center" }}>
                <h2 className="temperature">{ Math.round(forcast.main.temp) }<span style={{ fontSize: 50, lineHeight:"auto" }}>{ "℃" }</span></h2>
                <img src={`https://openweathermap.org/img/wn/${forcast.weather[0].icon}@4x.png`} alt="" id="image" />
            </div>
            <div className="description">
                <p className="weatherReport">{ forcast.weather[0].description }</p>
                
                <p className="date">{ new Date(forcast.dt * 1000).toDateString() }</p>
            </div>
        </div>
    );
}

export default Current;