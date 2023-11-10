import { useMutation } from "react-query";
import { apiKey, getUserLocation, openWeatherAPI } from "../utils";
import { InfinitySpin } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Result } from "../utils/types";
import { Current, Input } from "../components";

const Main = () =>{
    const  originalQuery = new URLSearchParams(useLocation().search).get("q");
    const [location, setLocation] = useState({ latitude: "", longitude: "", country: "", place: "" });
    const [results, setResults] = useState<Result>();

    const locationMutation = useMutation({
        mutationKey:  ["location"],
        mutationFn: () => getUserLocation(),
        onSuccess(data) {
            geoMutation.mutate(data.data);
        },
        onError(error, variables, context) {
            alert(JSON.stringify(error));
        },
    });''

    const temperatureMutation = useMutation({
        mutationKey: ["temperature"],
        mutationFn: (init:{lat: string, long: string}) => {
            return openWeatherAPI.get(`/data/2.5/forecast?lat=${init.lat}&lon=${init.long}&appid=${apiKey}&units=metric`);
        },
        onSuccess(data) {
            setResults(data.data);
        },
        onError(error, variables, context) {
            alert(JSON.stringify(error));
        },
    });

    const geoMutation = useMutation({
        mutationKey: ["geoposition"],
        mutationFn: (query: string) => openWeatherAPI.get(`/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`),
        onSuccess(data) {
            setLocation({latitude: data.data[0].lat, longitude: data.data[0].lon, country: data.data[0].country, place: data.data[0].name});
            temperatureMutation.mutate({lat: data.data[0].lat, long: data.data[0].lon })
        },
        onError(error, variables, context) {
            alert(JSON.stringify(error));
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

    if(!locationMutation.isError && !geoMutation.isError && !temperatureMutation.isError && results ){
        return (
            <div className="bg" style={{ display: "flex", flexDirection: "column", padding: 30 }}>
                <h1 style={{ fontSize: 30, fontFamily:"sans-serif", fontWeight:"lighter" }}>Weather Man</h1>
                <div style={{ display: "flex", flex: 1, width:"100%", flexDirection: "row" }}>
                    <div style={{ display: "flex", flex: 2, flexDirection: "column", height:"100%", alignItems:"center", justifyContent:"flex-end" }}>
                        <Current location={location} forcast={results.list[0]} />
                    </div>
                    <div style={{ display: "flex", flex: 3, flexDirection: "column", height:"100%", backgroundColor:"#00000036", padding: 10, borderRadius: 30, backdropFilter:"blur(2px)" }}>
                        <Input />
                        <div>

                        </div>
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