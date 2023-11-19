import { useContext } from "react";
import "../assets/styles/current.scss";
import { AppContext, AppContextType } from "../utils/providers";
import { BiDroplet, BiWind } from "react-icons/bi";


const CurrentView = () =>{
    const { forcast, location} = useContext(AppContext) as AppContextType;

    return (
        <div className="weatherDetails">
            <div className="location">{location?.place}<span style={{ fontSize: 16 }}> - { forcast?.timezone }</span></div>
            <div style={{ display:"flex", marginBottom: -30, padding:0, alignItems:"center" }}>
                <h2 className="temperature">{ Math.round(forcast!.current.temp) }<span style={{ fontSize: 50, lineHeight:"auto" }}>{ "℃" }</span></h2>
                <img src={`https://openweathermap.org/img/wn/${forcast!.current.weather[0].icon}@4x.png`} alt="" id="image" />
            </div>
            <div className="description">
                <p style={{ fontSize: 22, fontWeight: 300, }} className="weatherReport">{ forcast!.current.weather[0].description }</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, fontWeight: 200, marginTop: 10, width: 200, color: "white" }}>
                    <div style={{ display: "flex", alignItems: "center", }}><BiDroplet /> { forcast?.current.humidity }</div>
                    <div style={{ display: "flex", alignItems: "center", }}><BiWind /> { forcast?.current.wind_speed }</div>
                </div>
            </div>
        </div>
    );
}

export default CurrentView;