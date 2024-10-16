import React, { useEffect, useState } from "react";
import axios from "axios";
import StationDataIcons from './StationDataIcons'; // Componente anterior
import { FaTemperatureLow, FaTemperatureHalf, FaTemperatureArrowDown, FaTemperatureArrowUp, FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6"; 
import { RiWaterPercentFill } from "react-icons/ri";
import { TiWeatherShower } from "react-icons/ti"; 
import { GiWaterSplash } from "react-icons/gi"; 
import { IoIosWater } from "react-icons/io";
import { TbWorld, TbWorldDown, TbWorldUp } from "react-icons/tb";
import { FaCloudRain } from "react-icons/fa6";

import { baseUrlWeatherData } from "../util/constants";
import RainContainer from './RainComponent'; // Novo componente para dados de chuva

const StatusBar = ({ selectedStationCode }) => {
    const StatusBarStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        width: '65%',
        marginBottom: '20px',
    };

    const [statusItems, setStatusItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const url = `${baseUrlWeatherData}${selectedStationCode}?date=${'2024-04-06'}`;
            try {
                const response = await axios.get(url);
                const data = response.data.data;

                if (data.length > 0) {
                    const latestData = data[0]; 
                    setStatusItems([
                        { 
                            title: "TEMPERATURA", 
                            icon: FaTemperatureHalf, 
                            value: (latestData.tempBulboSeco !== null && latestData.tempBulboSeco !== "NaN") ? `${latestData.tempBulboSeco}º` : "Dado Ausente",
                            min: (latestData.tempMin !== null && latestData.tempMin !== "NaN") ? `${latestData.tempMin}º` : "Null",
                            max: (latestData.tempMax !== null && latestData.tempMax !== "NaN") ? `${latestData.tempMax}º` : "Null",                            
                            minIcon: FaTemperatureArrowDown, 
                            maxIcon: FaTemperatureArrowUp 
                        },
                        { 
                            title: "TEMPERATURA ORVALHO", 
                            icon: FaTemperatureLow, 
                            value: (latestData.tempPontoOrvalho !== null && latestData.tempPontoOrvalho !== "NaN") ? `${latestData.tempPontoOrvalho}º` : "Dado Ausente",
                            min: (latestData.tempOrvalhoMin !== null && latestData.tempOrvalhoMin !== "NaN") ? `${latestData.tempOrvalhoMin}º` : "Null",
                            max: (latestData.tempOrvalhoMax !== null && latestData.tempOrvalhoMax !== "NaN") ? `${latestData.tempOrvalhoMax}º` : "Null",                            
                            minIcon: FaTemperatureArrowDown, 
                            maxIcon: FaTemperatureArrowUp 
                        },
                        { 
                            title: "PRESSÃO", 
                            icon: TbWorld, 
                            value: (latestData.pressaoAtmosfericaNivelEstacao !== null && latestData.pressaoAtmosfericaNivelEstacao !== "NaN") ? `${latestData.pressaoAtmosfericaNivelEstacao} hPa` : "Dado Ausente",
                            min: (latestData.pressaoAtmosfericaMin !== null && latestData.pressaoAtmosfericaMin !== "NaN") ? `${latestData.pressaoAtmosfericaMin} hPa` : "Null",
                            max: (latestData.pressaoAtmosfericaMax !== null && latestData.pressaoAtmosfericaMax !== "NaN") ? `${latestData.pressaoAtmosfericaMax} hPa` : "Null",
                            minIcon: TbWorldDown, 
                            maxIcon: TbWorldUp 
                        },
                        { 
                            title: "UMIDADE", 
                            icon: RiWaterPercentFill, 
                            value: (latestData.umidadeRelativa !== null && latestData.umidadeRelativa !== "NaN") ? `${latestData.umidadeRelativa}%` : "Dado Ausente",
                            min: (latestData.umidadeRelativaMin !== null && latestData.umidadeRelativaMin !== "NaN") ? `${latestData.umidadeRelativaMin}%` : "Null",
                            max: (latestData.umidadeRelativaMax !== null && latestData.umidadeRelativaMax !== "NaN") ? `${latestData.umidadeRelativaMax}%` : "Null",
                            minIcon: FaArrowDownShortWide, 
                            maxIcon: FaArrowUpShortWide 
                        },
                        { 
                            title: "CHUVA", 
                            icon: FaCloudRain, 
                            value: (latestData.precipitacaoTotal !== null && latestData.precipitacaoTotal !== "NaN") ? `${latestData.precipitacaoTotal} mm` : "Dado Ausente",
                            min: '0 mm', 
                            max: '100 mm', 
                            minIcon: IoIosWater, 
                            maxIcon: GiWaterSplash 
                        },
                    ]);
                } else {
                    setStatusItems([
                        { 
                            title: "TEMPERATURA", 
                            icon: FaTemperatureHalf, 
                            value: "Dado Ausente", 
                            min: "--", 
                            max: "--", 
                            minIcon: FaTemperatureArrowDown, 
                            maxIcon: FaTemperatureArrowUp 
                        },
                        { 
                            title: "TEMPERATURA ORVALHO", 
                            icon: FaTemperatureLow, 
                            value: "Dado Ausente", 
                            min: "--", 
                            max: "--", 
                            minIcon: FaTemperatureArrowDown, 
                            maxIcon: FaTemperatureArrowUp 
                        },
                        { 
                            title: "PRESSÃO", 
                            icon: TbWorld, 
                            value: "Dado Ausente", 
                            min: "--", 
                            max: "--", 
                            minIcon: TbWorldDown, 
                            maxIcon: TbWorldUp 
                        },
                        { 
                            title: "UMIDADE", 
                            icon: RiWaterPercentFill, 
                            value: "Dado Ausente", 
                            min: "--", 
                            max: "--", 
                            minIcon: FaArrowDownShortWide, 
                            maxIcon: FaArrowUpShortWide 
                        },
                        { 
                            title: "CHUVA", 
                            icon: TiWeatherShower, 
                            value: "Dado Ausente", 
                            min: '0 mm', 
                            max: '100 mm', 
                            minIcon: IoIosWater, 
                            maxIcon: GiWaterSplash 
                        },
                    ]);
                }
            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            }
        };

        if (selectedStationCode) {
            fetchData();
        }
    }, [selectedStationCode]);

    return (
        <div style={StatusBarStyle}>
            {statusItems.map((item, index) => {
                if (item.title === "CHUVA") {
                    return (
                        <RainContainer key={index} item={item} />
                    );
                } else {
                    return (
                        <StationDataIcons key={index} items={[item]} />
                    );
                }
            })}
        </div>
    );
    
};

export default StatusBar;
