import React from "react";
import "../assets/styles/current.scss";
import { Current } from "../utils/types";

interface CurrentViewProps{
    current: Current,
    place: string,
    location: { latitude: string, longitude: string, country: string, place: string }
}

const CurrentView:React.FC<CurrentViewProps> = ({ current, location}) =>{
    return (
        <div className="weatherDetails">
            <span className="location">{ location.place}</span>
            <div style={{ display:"flex", marginBottom: -60, padding:0, alignItems:"center" }}>
                <h2 className="temperature">{ Math.round(forcast.main.temp) }<span style={{ fontSize: 50, lineHeight:"auto" }}>{ "℃" }</span></h2>
                <img src={`https://openweathermap.org/img/wn/${forcast.weather[0].icon}@4x.png`} alt="" id="image" />
            </div>
            <div className="description">
                <p className="weatherReport">{ current.weather[0].description }</p>
                
                <p className="date">{ new Date(current.dt * 1000).toDateString() }</p>
            </div>
        </div>
    );
}

export default CurrentView;