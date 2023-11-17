import { useContext } from "react";
import "../assets/styles/current.scss";
import { AppContext, AppContextType } from "../utils/providers";


const CurrentView = () =>{
    const { forcast, location} = useContext(AppContext) as AppContextType;

    return (
        <div className="weatherDetails">
            <span className="location">{ location?.place}</span>
            <div style={{ display:"flex", marginBottom: -30, padding:0, alignItems:"center" }}>
                <h2 className="temperature">{ Math.round(forcast!.current.temp) }<span style={{ fontSize: 50, lineHeight:"auto" }}>{ "℃" }</span></h2>
                <img src={`https://openweathermap.org/img/wn/${forcast!.current.weather[0].icon}@4x.png`} alt="" id="image" />
            </div>
            <div className="description">
                <p className="weatherReport">{ forcast!.current.weather[0].description }</p>
                
                <p className="date">{ new Date(forcast!.current.dt * 1000).toDateString() }</p>
            </div>
        </div>
    );
}

export default CurrentView;