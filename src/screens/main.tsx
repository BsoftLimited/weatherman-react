import { useMutation, useQuery } from "react-query";
import { apiKey, getUserLocation, openWeatherAPI } from "../utils";
import { InfinitySpin } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { Result } from "../utils/types";
import { Input } from "../components";

const Main = () =>{
    const searchParams = new URLSearchParams(useLocation().search);

    const  originalQuery = searchParams.get("q");


    const locationQuery = useQuery({ queryKey: ['location'], queryFn: () => getUserLocation() });

    const temperatureMutation = useMutation({
        mutationFn: (init:{lat?: string, long?: string}) => {
            return openWeatherAPI.get(`/data/2.5/forecast?lat=${init.lat}&lon=${init.long}&appid=${apiKey}`);
        },
    });

    const geoMutation = useMutation({
        mutationFn: (query) => openWeatherAPI.get(`/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`),
        onSuccess(data) {
            temperatureMutation.mutate({lat: data.data[0].lat, long: data.data[0].lon })
        },
    });

    const fetchReports = useCallback(() => {
        if(locationQuery.isSuccess){
            geoMutation.mutate(locationQuery.data?.data.city);
        }
    }, [locationQuery.isLoading]);

    useEffect(()=> fetchReports(), [fetchReports]);

    if(locationQuery.isLoading || geoMutation.isLoading || temperatureMutation.isLoading ){
        return (
            <div style={{ width: "100dvw", height: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                <InfinitySpin width='340' color="#4fa94d" />
            </div>)
    }

    const init = (temperatureMutation.data?.data) as Result;
    
    return (
        <div className="bg" style={{ display: "flex", width:"100%", justifyContent:"center", alignItems:"flex-start" }}>
            <Input />
        </div>
    );
}

export default Main;