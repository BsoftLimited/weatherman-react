import { useState } from "react";
import "../assets/styles/others.scss"
import DailyView from "./daily";
import HourlyView from "./hourly";
import Input from "./input";

interface OthersProps{

}

const Others: React.FC<OthersProps> = ({}) =>{
    const [option, setOption] = useState<"daily" | "hourly">("hourly");

    const toHourly = () => setOption("hourly");
    const toDaily = () => setOption("daily");

    return (
        <div className="others-container">
            <div className="main-bottom-search-settings-container">
                <div className="desktop-search"><Input /></div>
                <div className="options">
                    <div className={`option-btn-left ${ option === "hourly" && "option-btn-active" }`} onClick={toHourly}>Hourly</div>
                    <div className={`option-btn-right ${ option === "daily" && "option-btn-active"}`} onClick={toDaily}>Daily</div>
                </div>
            </div>
            <div style={{ display: "flex", width: "100%", flex: 1, flexWrap: "wrap", marginTop: 20 }}>
                { option === "daily" && <DailyView /> }
                { option === "hourly" && <HourlyView /> }
            </div>
        </div>
    );
}

export default Others;