import { useContext } from "react";
import { Daily } from "../utils/types";
import { AppContext, AppContextType } from "../utils/providers";

const DailyView = () =>{
    const daily: Daily[] = (useContext(AppContext) as AppContextType).forcast?.daily as Daily[];
    
    return (
        <div>
            {
                //daily.map((day)=><div>{ day.temp.day }</div>)
                JSON.stringify(daily)
            }
        </div>
    );
}

export default DailyView;