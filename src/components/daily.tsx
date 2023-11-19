import { useContext } from "react";
import { Daily } from "../utils/types";
import { AppContext, AppContextType } from "../utils/providers";
import { BiDroplet, BiWind } from "react-icons/bi";
import { toDay } from "../utils";
import "../assets/styles/others.scss";

const DailyView = () =>{
    const daily: Daily[] = (useContext(AppContext) as AppContextType).forcast?.daily as Daily[];
    
    return (
        <div className="others-item-container">
            { daily.map((day, index)=>{return (
                <div className="others-item">
                    <h2 className="others-item-name">{ index === 0 ? "Today" : `${toDay(new Date(day.dt * 1000).getDay())} ${new Date(day.dt * 1000).getDate()}` }</h2>
                    <img className="others-item-image" src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`} alt=""/>
                    <div className="others-item-temp">{ Math.round(day.temp.min) }{ "\u00B0"} - { Math.round(day.temp.max) }{ "\u00B0"}</div>
                    <div className="others-item-more-container">
                        <div className="others-item-more"><BiDroplet /> { day.humidity }</div>
                        <div className="others-item-more"><BiWind /> { day.wind_speed }</div>
                    </div>
                </div>
            ); }) }
        </div>
    );
}

export default DailyView;