import * as React from 'react';
import { Data } from './types';
import getUserLocation, { openWeatherAPI } from './connections';
import { useState } from 'react';
import DefaultSettings, { AppSettings } from './settings';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';

export type AppContextType = {
    forcast?: Data;
    setting: AppSettings
    loading: boolean;
    isError: boolean;
    error: any;
    load: (city: string) => void;
    init: () => void,
    toggleUnits: () => void;
};

export const AppContext = React.createContext<AppContextType | null>(null);

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, setState] = useState<{forcast?: Data, loading: boolean, isError: boolean, message: any }>({loading: false, isError: false, error: ""});
    const [settings, setSettings] = useState<AppSettings>(DefaultSettings);
    const [location, setLocation] = useState({ latitude: "", longitude: "", country: "", place: "" });

    const  originalQuery = new URLSearchParams(useLocation().search).get("q");

    const locationMutation = useMutation({
        mutationKey:  ["location"],
        mutationFn: () => getUserLocation(),
        onMutate:()=>setState(init => { return { ...init, loading: true, isError: false, error: ""}}),
        onSuccess(data) {
            //alert(JSON.stringify(data.data));
            setLocation({latitude: data.data.latitude, longitude: data.data.longitude, country: data.data.country_name, place: data.data.city});
        },
        onError(error, variables, context) {
            //alert(`${import.meta.env.VITE_APIKEY} - ${JSON.stringify(error)}`);
            setState(init => { return { ...init, loading: false, isError: true, error}});
        },
    });

    const temperatureMutation = useMutation({
        mutationKey: ["temperature"],
        onMutate:()=>setState(init => { return { ...init, loading: true, isError: false, error: ""}}),
        mutationFn: (init:{lat: string, long: string}) => {
            return openWeatherAPI.get(`/data/3.0/onecall?lat=${init.lat}&lon=${init.long}&exclude=minutely&appid=${import.meta.env.VITE_APIKEY}&units=metric`);
        },
        onSuccess(data) {
            setState(init => { return { ...init, result: data, loading: false}});
            //alert(JSON.stringify(data));
        },
        onError(error, variables, context) {
            setState(init => { return { ...init, loading: false, isError: true, error}});
            //alert(`${import.meta.env.VITE_APIKEY} - ${JSON.stringify(error)}`);
        },
    });

    const geoMutation = useMutation({
        mutationKey: ["geoposition"],
        mutationFn: (query: string) => openWeatherAPI.get(`/geo/1.0/direct?q=${query}&limit=1&appid=${import.meta.env.VITE_APIKEY}`),
        onMutate:()=>setState(init => { return { ...init, loading: true, isError: false, error: ""}}),
        onSuccess(data) {
            //alert(JSON.stringify(data));
            setLocation({latitude: data.data[0].lat, longitude: data.data[0].lon, country: data.data[0].state || data.data[0].country, place: data.data[0].name});
            temperatureMutation.mutate({lat: data.data[0].lat, long: data.data[0].lon })
        },
        onError(error, variables, context) {
            alert(`${import.meta.env.VITE_APIKEY} - ${JSON.stringify(error)}`);
            setState(init => { return { ...init, loading: false, isError: true, error}});
        },
    });


    const init = React.useCallback(async ()=>{
        if(!location && originalQuery){
            geoMutation.mutate(originalQuery);
        }if(location){
            temperatureMutation.mutate({lat: location.latitude, long: location.longitude});
        }else{
            locationMutation.mutate();
        }
    }, [location]);

    React.useEffect(()=> { init() }, [init, location]);

    const load = async (city: string) => {
        try{
            const location = (await openWeatherAPI.get(`/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)).data;
            const data = (await openWeatherAPI.get(`/data/2.5/forecast?lat=${location[0].lat}&lon=${location[0].lon}&appid=${apiKey}&units=metric`)).data;
            
            setState(init => { return { ...init, result: data, loading: false}});
        }catch(error){
            setState(init => { return { ...init, loading: false, isError: true, error}});
        }
    }

    const toggleTheme  = () =>{
        setSettings((init)=> {
            if(init.theme === "auto"){
                return {...init, theme: LightTheme };
            }else{
                return {...init, theme: init.theme.isLight ? DarkTheme : "auto" };   
            }
        });
    }

    const toggleUnits = () => setSettings((init)=>{ return {...init, unit: init.unit === "metric" ? "imperical" : "metric" }});

    return (<AppContext.Provider value={{ load, toggleTheme, settings, toggleUnits, ...state}}>{children}</AppContext.Provider>);
}

export default AppProvider;