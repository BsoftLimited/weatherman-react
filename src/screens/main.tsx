import { useMutation, useQuery } from "react-query";
import { apiKey, getUserLocation, openWeatherAPI } from "../utils";
import { InfinitySpin } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { Result } from "../utils/types";
import { Input } from "../components";

const Main = () =>{
    const  originalQuery = new URLSearchParams(useLocation().search).get("q");

    const locationMutation = useMutation({
        mutationKey:  ["location"],
        mutationFn: () => getUserLocation(),
        onSuccess(data, variables, context) {
            geoMutation.mutate(data.data);
        },
    });

    const temperatureMutation = useMutation({
        mutationKey: ["temperature"],
        mutationFn: (init:{lat?: string, long?: string}) => {
            return openWeatherAPI.get(`/data/2.5/forecast?lat=${init.lat}&lon=${init.long}&appid=${apiKey}`);
        },
    });

    const geoMutation = useMutation({
        mutationKey: ["geoposition"],
        mutationFn: (query: string) => openWeatherAPI.get(`/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`),
        onSuccess(data) {
            temperatureMutation.mutate({lat: data.data[0].lat, long: data.data[0].lon })
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
            </div>)
    }

    const init = (temperatureMutation.data?.data) as Result;
    
    return (
        <div className="bg" style={{ display: "flex", width:"100%", flexDirection: "column",  justifyContent: "flex-start", alignItems:"center", paddingTop: 50, gap: 10 }}>
            <h1 style={{ fontSize: 50, fontFamily:"sans-serif", fontWeight:"lighter" }}>Weather Man</h1>
            <Input />
            <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
                <div style={{  display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}>
                    sdfghjhgfdsdfghj
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default Main;