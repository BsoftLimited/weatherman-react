import { useContext } from "react";
import "../assets/styles/current.scss";
import { AppContext, AppContextType } from "../utils/providers";
import { BiDroplet, BiWind } from "react-icons/bi";


const CurrentView = () =>{
    const { forcast, location} = useContext(AppContext) as AppContextType;

    return (
        <div className="weatherDetails">
            <div className="location">{location?.place}<span> - { forcast?.timezone }</span></div>
            <div style={{ display:"flex", marginBottom: "-1.0rem", padding:0, alignItems:"center" }}>
                <h2 className="temperature">{ Math.round(forcast!.current.temp) }<span className="degree">{ "℃" }</span></h2>
                <img src={`https://openweathermap.org/img/wn/${forcast!.current.weather[0].icon}@4x.png`} alt="" id="image" />
            </div>
            <div className="description">
                <p className="weatherReport">{ forcast!.current.weather[0].description }</p>
                <div className="wetherReport-others">
                    <div style={{ display: "flex", alignItems: "center", }}><BiDroplet /> { forcast?.current.humidity }</div>
                    <div style={{ display: "flex", alignItems: "center", }}><BiWind /> { forcast?.current.wind_speed }</div>
                </div>
            </div>
        </div>
    );
}

export default CurrentView;