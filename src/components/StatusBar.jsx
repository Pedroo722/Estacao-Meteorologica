import React, { useEffect, useState } from "react";
import axios from "axios";
import StationDataIcons from './StationDataIcons';
import { FaTemperatureLow, FaTemperatureHalf, FaTemperatureArrowDown, FaTemperatureArrowUp, FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6"; 
import { RiWaterPercentFill } from "react-icons/ri";
import { TiWeatherShower } from "react-icons/ti"; 
import { GiWaterSplash } from "react-icons/gi"; 
import { IoIosWater } from "react-icons/io";
import { TbWorld, TbWorldDown, TbWorldUp } from "react-icons/tb";
import { FaCloudRain } from "react-icons/fa6";
import '../styles/StatusBar.css';

import { baseUrlWeatherData } from "../util/constants";
import RainContainer from './RainComponent';
// import StatusBarStyle from "./StatusBarStyle";

// Função auxiliar para formatar valores
const formatValue = (value, unit) => {
    if (value === null || value === "NaN" || value === "N/A" || isNaN(value)) {
        return "Dado Ausente";
    }
    return `${parseFloat(value).toFixed(2)}${unit}`;
};

const StatusBar = ({ selectedStationCode, isMinimized }) => {
    const [statusItems, setStatusItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            //  const today = new Date().toISOString().split('T')[0]; // Formatação em YYYY-MM-DD
            // trocar '2024-01-01' para $today quando o back fizer extração automática dos dados
            const url = `${baseUrlWeatherData}${selectedStationCode}?date=${'2024-01-01'}`;
            try {
                const response = await axios.get(url);
                const data = response.data.averages;

                if (data && Object.keys(data).length > 0) {
                    setStatusItems([
                        { 
                            title: "TEMPERATURA", 
                            icon: FaTemperatureHalf, 
                            value: formatValue(data.mediaTempBulboSeco, "º"),
                            min: formatValue(data.mediaTempMin, "º"),
                            max: formatValue(data.mediaTempMax, "º"),
                            minIcon: FaTemperatureArrowDown, 
                            maxIcon: FaTemperatureArrowUp 
                        },
                        { 
                            title: "TEMPERATURA ORVALHO", 
                            icon: FaTemperatureLow, 
                            value: formatValue(data.mediaTempPontoOrvalho, "º"),
                            min: formatValue(data.mediaTempOrvalhoMin, "º"),
                            max: formatValue(data.mediaTempOrvalhoMax, "º"),
                            minIcon: FaTemperatureArrowDown, 
                            maxIcon: FaTemperatureArrowUp 
                        },
                        { 
                            title: "PRESSÃO", 
                            icon: TbWorld, 
                            value: formatValue(data.mediaPressaoAtmosfericaNivelEstacao, " hPa"),
                            min: formatValue(data.mediaPressaoAtmosfericaMin, " hPa"),
                            max: formatValue(data.mediaPressaoAtmosfericaMax, " hPa"),
                            minIcon: TbWorldDown, 
                            maxIcon: TbWorldUp 
                        },
                        { 
                            title: "UMIDADE", 
                            icon: RiWaterPercentFill, 
                            value: formatValue(data.mediaUmidadeRelativa, "%"),
                            min: formatValue(data.mediaUmidadeRelativaMin, "%"),
                            max: formatValue(data.mediaUmidadeRelativaMax, "%"),
                            minIcon: FaArrowDownShortWide, 
                            maxIcon: FaArrowUpShortWide 
                        },
                        { 
                            title: "CHUVA", 
                            icon: FaCloudRain, 
                            value: formatValue(data.mediaPrecipitacaoTotal, " mm"),
                            min: "0 mm", 
                            max: "100 mm", 
                            minIcon: IoIosWater, 
                            maxIcon: GiWaterSplash 
                        },
                    ]);
                } else {
                    setStatusItems([
                        { title: "TEMPERATURA", icon: FaTemperatureHalf, value: "Dado Ausente", min: "--", max: "--", minIcon: FaTemperatureArrowDown, maxIcon: FaTemperatureArrowUp },
                        { title: "TEMPERATURA ORVALHO", icon: FaTemperatureLow, value: "Dado Ausente", min: "--", max: "--", minIcon: FaTemperatureArrowDown, maxIcon: FaTemperatureArrowUp },
                        { title: "PRESSÃO", icon: TbWorld, value: "Dado Ausente", min: "--", max: "--", minIcon: TbWorldDown, maxIcon: TbWorldUp },
                        { title: "UMIDADE", icon: RiWaterPercentFill, value: "Dado Ausente", min: "--", max: "--", minIcon: FaArrowDownShortWide, maxIcon: FaArrowUpShortWide },
                        { title: "CHUVA", icon: TiWeatherShower, value: "Dado Ausente", min: '0 mm', max: '100 mm', minIcon: IoIosWater, maxIcon: GiWaterSplash },
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
        <div className={`container-status ${isMinimized ? 'container-minimized' : 'container-expanded'}`}>
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
