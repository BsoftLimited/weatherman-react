import { useQueryClient } from "react-query";
import { Daily } from "../utils/types";

interface DailyViewProps{
    daily?: Daily[]
}

const DailyView: React.FC<DailyViewProps> = () =>{
    const queryClient = useQueryClient();

    const data = queryClient.getQueriesData(["temperature"]);

    
    return (
        <div>
            {
                //daily.map((day)=><div>{ day.temp.day }</div>)
                JSON.stringify(data)
            }
        </div>
    );
}

export default DailyView;