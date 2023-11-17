import { useMutation } from "react-query";
import { getUserLocation, openWeatherAPI } from "../utils";
import { InfinitySpin } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { Current, Input, Others } from "../components";
import { Data } from "../utils/types";
import { FaCogs } from "react-icons/fa";
import { AppContext, AppContextType } from "../utils/providers";

const Main = () =>{
    const { forcast, loading, message, isError} = useContext(AppContext) as AppContextType;

    if(loading ){
        return (
            <div style={{ width: "100dvw", height: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", backgroundColor: "white" }}>
                <InfinitySpin width='340' color="#4fa94d" />
                <div>{message}</div>
            </div>);
    }

    if(!isError && forcast ){
        //console.log(JSON.stringify(forcast));
        return (
            <div className="bg" style={{ display: "flex", flexDirection: "column", padding: 30 }}>
                <h1 style={{ fontSize: 24, fontFamily:"sans-serif", fontWeight:200 }}>Weather Man</h1>
                <div style={{ display: "flex", flex: 1, width:"100%", flexDirection: "row" }}>
                    <div style={{ display: "flex", flex: 2, flexDirection: "column", height:"100%", alignItems:"center", justifyContent:"flex-end" }}>
                        <Current />
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
            <div>{ message }</div>
        );
    }
}

export default Main;