import { InfinitySpin } from "react-loader-spinner";
import { useContext, useState } from "react";
import { Current, Input, Others } from "../components";
import { FaCog, FaCogs } from "react-icons/fa";
import { AppContext, AppContextType } from "../utils/providers";
import { Chart as ChartJS, CategoryScale, LineController, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ReactChart } from "chartjs-react";
import { Hourly } from "../utils/types";
import "../assets/styles/main.scss";

ChartJS.register( CategoryScale, LinearScale, LineController, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    elements: {
        line: {
            tension: 0.5,
        },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
};

const graphData = (hourly: Hourly[]) =>{
    let labels: string[] = [];
    let temps: number[] = [];
    let wind: number[] = [];
    let humidity: number[] =  [];
    let index = 1;

    while(labels.length < 12){
        const hour = hourly[index];

        labels.push(`${new Date(hour.dt * 1000).getHours()}:00`);
        temps.push(hour.temp);
        wind.push(hour.wind_speed);
        humidity.push(hour.humidity);

        index += 1;
    }
    return { labels:  labels, temps, wind, humidity };
}
  

const Main = () =>{
    const { forcast, loading, message, isError} = useContext(AppContext) as AppContextType;

    if(loading ){
        return (
            <div style={{ width: "100dvw", height: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", backgroundColor: "red"}}>
                <InfinitySpin width='340' color="white" />
                <div>{message}</div>
            </div>);
    }

    if(!isError && forcast ){
        //console.log(JSON.stringify(forcast));

        const data = graphData(forcast.hourly);
  
        const chartData = {
            labels: data.labels,
            datasets: [
                {
                    label: 'Temperature',
                    data: data.temps,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                },
                {
                    label: 'Wind Speed',
                    data: data.wind,
                    borderColor: 'rgb(99, 132, 255)',
                    backgroundColor: 'rgba(99, 132, 255, 0.6)',
                },
                {
                    label: 'Humidity',
                    data: data.humidity,
                    borderColor: 'rgb(99, 255, 132)',
                    backgroundColor: 'rgba(99, 255, 132, 0.6)',
                },
            ],
        };

        return (
            <div className="bg">
                <h1 className="header-title">Weather Man</h1>
                <div className="header-bar">
                    <h1 className="header-bar-title">Weather Man</h1>
                    <div className="header-bar-search-settings-container">
                        <Input />
                    </div>
                </div>
                <div className="main">
                    <div className="main-top">
                        <div className="main-current-container">
                            <Current />
                        </div>
                        <div className="main-chart-root">
                            <div style={{ display: "flex", justifyContent: "stretch", backgroundColor:"#ffffff", padding: 20, borderRadius: 10, backdropFilter:"blur(2px)", width: "100%" }}>
                                <ReactChart id="unique-chart-id" type="line" data={chartData} options={options} />
                            </div>
                        </div>
                    </div>
                    <div className="main-bottom">
                        <Others />
                    </div>
                </div>
            </div>
        );
    }else{
        return (
            <div>{ message }</div>
        );
    }
}

export default Main;