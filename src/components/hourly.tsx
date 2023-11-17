import { useContext } from "react";
import { Hourly } from "../utils/types";
import { AppContext, AppContextType } from "../utils/providers";
import { BiDroplet, BiWind } from "react-icons/bi";

const HourlyView:React.FC = () =>{
    const hourly: Hourly[] = (useContext(AppContext) as AppContextType).forcast?.hourly as Hourly[];

    const reduce = () =>{
        let init: Hourly[] = [];
        let index = 1;
        while(init.length < 12){
            init.push(hourly[index]);
            index += 1;
        }
        return init;
    }

    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            { reduce().map((hour)=>{return (
                <div style={{ textAlign: "center", backdropFilter: "blur(2px)", backgroundColor: "transparent", margin: 8, borderRadius: 20, paddingTop:8, paddingBottom: 8 }}>
                    <h2 style={{ fontWeight: 300, letterSpacing: 1.6 }}>{ `${new Date(hour.dt * 1000).getHours()}:00` }</h2>
                    <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@4x.png`} alt="" style={{ height: 200, width: 200, marginTop: -40, marginBottom: -50 }}/>
                    <div style={{ fontSize: 30 }}>{ Math.round(hour.temp) }{ "\u00B0"}</div>
                    <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", fontSize: 20, fontWeight: 200, marginTop: 10 }}>
                        <div><BiDroplet /> { hour.humidity }</div>
                        <div><BiWind /> { hour.wind_speed }</div>
                    </div>
                </div>
            ); }) }
        </div>
    );
}

export default HourlyView;