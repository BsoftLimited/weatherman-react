import { useMutation } from "react-query";
import { getUserLocation, openWeatherAPI } from "../utils";
import { InfinitySpin } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Current, Input, Others } from "../components";
import { Data } from "../utils/types";
import { FaCogs } from "react-icons/fa";

const Main = () =>{
    const  originalQuery = new URLSearchParams(useLocation().search).get("q");
    const [forcast, setForcast] = useState<Data>();

    

    const temperatureMutation = useMutation({
        mutationKey: ["temperature"],
        mutationFn: (init:{lat: string, long: string}) => {
            return openWeatherAPI.get(`/data/3.0/onecall?lat=${init.lat}&lon=${init.long}&exclude=minutely&appid=${import.meta.env.VITE_APIKEY}&units=metric`);
        },
        onSuccess(data) {
            setForcast(data.data);
            //alert(JSON.stringify(data));
        },
        onError(error, variables, context) {
            alert(`${import.meta.env.VITE_APIKEY} - ${JSON.stringify(error)}`);
        },
    });

    const geoMutation = useMutation({
        mutationKey: ["geoposition"],
        mutationFn: (query: string) => openWeatherAPI.get(`/geo/1.0/direct?q=${query}&limit=1&appid=${import.meta.env.VITE_APIKEY}`),
        onSuccess(data) {
            //alert(JSON.stringify(data));
            setLocation({latitude: data.data[0].lat, longitude: data.data[0].lon, country: data.data[0].state || data.data[0].country, place: data.data[0].name});
            temperatureMutation.mutate({lat: data.data[0].lat, long: data.data[0].lon })
        },
        onError(error, variables, context) {
            alert(`${import.meta.env.VITE_APIKEY} - ${JSON.stringify(error)}`);
        },
    });

    const fetchReports = useCallback(() => {
        if(originalQuery){
            geoMutation.mutate(originalQuery);
        }else{
            locationMutation.mutate();
        }
    }, [originalQuery]);

    useEffect(()=> fetchReports(), [fetchReports]);

    if(locationMutation.isLoading || geoMutation.isLoading || temperatureMutation.isLoading ){
        return (
            <div style={{ width: "100dvw", height: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                <InfinitySpin width='340' color="#4fa94d" />
            </div>);
    }

    if(!locationMutation.isError && !geoMutation.isError && !temperatureMutation.isError && forcast ){
        console.log(JSON.stringify(forcast));
        return (
            <div className="bg" style={{ display: "flex", flexDirection: "column", padding: 30 }}>
                <h1 style={{ fontSize: 24, fontFamily:"sans-serif", fontWeight:200 }}>Weather Man</h1>
                <div style={{ display: "flex", flex: 1, width:"100%", flexDirection: "row" }}>
                    <div style={{ display: "flex", flex: 2, flexDirection: "column", height:"100%", alignItems:"center", justifyContent:"flex-end" }}>
                        <Current place={forcast.timezone} location={location} current={forcast?.current!} />
                    </div>
                    <div style={{ display: "flex", flex: 3, flexDirection: "column", alignItems: "end", height:"100%", backgroundColor:"#00000036", padding: 10, borderRadius: 30, backdropFilter:"blur(2px)" }}>
                        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                            <Input />
                            <div style={{ cursor: "pointer", margin: "10px" }}>
                                <FaCogs size={30} color="white"/>
                            </div>
                        </div>
                        <Others />
                    </div>
                </div>
            </div>
        );
    }else{
        return (
            <div>sdfghjgfd</div>
        );
    }
}

export default Main;