import * as React from 'react';
import { Data } from './types';
import getUserLocation, { openWeatherAPI } from './connections';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';

interface Location{ latitude: string, longitude: string, country: string, place: string }

export type AppContextType = {
    forcast?: Data;
    loading: boolean;
    isError: boolean;
    message: any;
    location?: Location
    load: (city: string) => void;
    refresh: () => void;
};

export const AppContext = React.createContext<AppContextType | null>(null);

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, setState] = useState<{forcast?: Data, loading: boolean, isError: boolean, message: any }>({loading: false, isError: false, message: ""});
    const [location, setLocation] = useState<Location>();

    const  originalQuery = new URLSearchParams(useLocation().search).get("q");

    const locationMutation = useMutation({
        mutationKey:  ["location"],
        mutationFn: () => getUserLocation(),
        onMutate:()=>setState(init => { return { ...init, loading: true, isError: false, messages: "Getting users current location"}}),
        onSuccess(data) {
            //alert(JSON.stringify(data.data));
            setLocation({latitude: data.data.latitude, longitude: data.data.longitude, country: data.data.country_name, place: data.data.city});
        },
        onError(error) {
            //alert(`${import.meta.env.VITE_APIKEY} - ${JSON.stringify(error)}`);
            if(import.meta.env.VITE_IS_DEVELOPMENT){
                console.error("Location Error", error);
            }
            setState(init => { return { ...init, loading: false, isError: true, message: "Unable to get user location, check network settings."}});
        },
    });

    const temperatureMutation = useMutation({
        mutationKey: ["temperature"],
        onMutate:()=>setState(init => { return { ...init, loading: true, isError: false, message: "Gathering weather report,please wait"}}),
        mutationFn: (init:{lat: string, long: string}) => {
            return openWeatherAPI.get(`/data/3.0/onecall?lat=${init.lat}&lon=${init.long}&exclude=minutely&appid=${import.meta.env.VITE_APIKEY}&units=metric`);
        },
        onSuccess(data) {
            setState(init => { return { ...init, forcast: data.data, loading: false}});
            //alert(JSON.stringify(data));
        },
        onError(error) {
            if(import.meta.env.VITE_IS_DEVELOPMENT){
                console.error("Forecast Error", error);
            }
            setState(init => { return { ...init, loading: false, isError: true, message: `Unable to get forcast repost for ${location?.place}`}});
            //alert(`${import.meta.env.VITE_APIKEY} - ${JSON.stringify(error)}`);
        },
    });

    const geoMutation = useMutation({
        mutationKey: ["geoposition"],
        mutationFn: (query: string) => openWeatherAPI.get(`/geo/1.0/direct?q=${query}&limit=1&appid=${import.meta.env.VITE_APIKEY}`),
        onMutate:(variables)=>setState(init => { return { ...init, loading: true, isError: false, message: `Getting coordinates for location: ${variables}`}}),
        onSuccess(data) {
            //alert(JSON.stringify(data));
            setLocation({latitude: data.data[0].lat, longitude: data.data[0].lon, country: data.data[0].state || data.data[0].country, place: data.data[0].name});
        },
        onError(error, variables) {
            if(import.meta.env.VITE_IS_DEVELOPMENT){
                console.error("Geo position Error", error);
            }
            //alert(`${import.meta.env.VITE_APIKEY} - ${JSON.stringify(error)}`);
            setState(init => { return { ...init, loading: false, isError: true, message: `Unable to geographical loction of ${variables}, either location is not in our database or network error`}});
        },
    });

    const load = async (city: string) => geoMutation.mutate(city);
    const refresh = async () => temperatureMutation.mutate({lat: location!.latitude, long: location!.longitude});

    const init = React.useCallback(async ()=>{
        if(!location && originalQuery){
            geoMutation.mutate(originalQuery);
        }if(location){
            temperatureMutation.mutate({lat: location.latitude, long: location.longitude});
        }else if(!originalQuery){
            locationMutation.mutate();
        }
    }, [location]);

    React.useEffect(()=> { init() }, [init, location]);

    return (
        <AppContext.Provider value={{ ...state,  load, location, refresh}}>{ children }</AppContext.Provider>
    );
}

export default AppProvider;