import { useState } from "react";
import "../assets/styles/others.scss"
import DailyView from "./daily";

interface OthersProps{

}

const Others: React.FC<OthersProps> = ({}) =>{
    const [option, setOption] = useState<"daily" | "hourly">("hourly");

    const toHourly = () => setOption("hourly");
    const toDaily = () => setOption("daily");

    return (
        <div className="others-container">
            <div className="options" style={{ }}>
                <div className={`option-btn-left ${ option === "hourly" && "option-btn-active" }`} style={{ }} onClick={toHourly}>Hourly</div>
                <div className={`option-btn-right ${ option === "daily" && "option-btn-active"}`} style={{ }} onClick={toDaily}>Daily</div>
            </div>
            <div style={{ display: "flex", width: "100%", flex: 1, flexWrap: "wrap", marginTop: 20 }}>
                { option === "daily" && <DailyView /> }
            </div>
        </div>
    );
}

export default Others;