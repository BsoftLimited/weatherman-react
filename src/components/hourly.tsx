import { useContext } from "react";
import { Hourly } from "../utils/types";
import { AppContext, AppContextType } from "../utils/providers";
import { BiDroplet, BiWind } from "react-icons/bi";

const HourlyView:React.FC = () =>{
    const hourly: Hourly[] = (useContext(AppContext) as AppContextType).forcast?.hourly as Hourly[];

    const reduce = () =>{
        let init: Hourly[] = [];
        let index = 1;
        while(init.length < 10){
            init.push(hourly[index]);
            index += 1;
        }
        return init;
    }

    return (
        <div className="others-item-container">
            { reduce().map((hour)=>{return (
                <div className="others-item">
                    <h3 className="others-item-name">{ `${new Date(hour.dt * 1000).getHours()}:00` }</h3>
                    <img className="others-item-image" src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@4x.png`} alt="" />
                    <div className="others-item-temp">{ Math.round(hour.temp) }{ "\u00B0"}</div>
                    <div className="others-item-more-container">
                        <div className="others-item-more"><BiDroplet /> { hour.humidity }</div>
                        <div className="others-item-more"><BiWind /> { hour.wind_speed }</div>
                    </div>
                </div>
            ); }) }
        </div>
    );
}

export default HourlyView;