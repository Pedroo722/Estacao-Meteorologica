import React, { useEffect, useState } from "react";
import axios from "axios";
import ComponentDados from './ComponentDados';
import { FaTemperatureHalf, FaTemperatureArrowDown, FaTemperatureArrowUp, FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6"; 
import { RiWaterPercentFill } from "react-icons/ri";
import { TiWeatherShower } from "react-icons/ti";
import { GiWaterSplash } from "react-icons/gi"; 
import { IoIosWater } from "react-icons/io";
import { TbWorld, TbWorldDown, TbWorldUp } from "react-icons/tb";
import { baseUrlIcons } from "../util/constants";

const StatusBar = ({ selectedStationCode }) => {
    const StatusBarStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        width: '80%',
        marginBottom: '20px',
        color: '#fff'
    };

    const [statusItems, setStatusItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const today = new Date().toISOString().split('T')[0]; // Formata a data como YYYY-MM-DD
            console.log(today);
            console.log(selectedStationCode);
            const url = `${baseUrlIcons}${selectedStationCode}?date=${today}`;
            console.log(url);
            try {
                const response = await axios.get(url);
                console.log("Retorno da api Icones: ", response);
                const data = response.data.data;

                if (data.length > 0) {
                    const latestData = data[0]; 
                    setStatusItems([
                        { 
                            title: "TEMPERATURA", 
                            icon: FaTemperatureHalf, 
                            value: (latestData.tempBulboSeco !== null && latestData.tempBulboSeco !== "NaN") ? `${latestData.tempBulboSeco}º` : "Dado Omisso",
                            min: (latestData.tempMin !== null && latestData.tempMin !== "NaN") ? `${latestData.tempMin}º` : "Null",
                            max: (latestData.tempMax !== null && latestData.tempMax !== "NaN") ? `${latestData.tempMax}º` : "Null",                            
                            minIcon: FaTemperatureArrowDown, 
                            maxIcon: FaTemperatureArrowUp 
                        },
                        { 
                            title: "PRESSÃO", 
                            icon: TbWorld, 
                            value: (latestData.pressaoAtmosfericaNivelEstacao !== null && latestData.pressaoAtmosfericaNivelEstacao !== "NaN") ? `${latestData.pressaoAtmosfericaNivelEstacao} hPa` : "Dado Omisso",
                            min: (latestData.pressaoAtmosfericaMin !== null && latestData.pressaoAtmosfericaMin !== "NaN") ? `${latestData.pressaoAtmosfericaMin} hPa` : "Null",
                            max: (latestData.pressaoAtmosfericaMax !== null && latestData.pressaoAtmosfericaMax !== "NaN") ? `${latestData.pressaoAtmosfericaMax} hPa` : "Null",
                            minIcon: TbWorldDown, 
                            maxIcon: TbWorldUp 
                        },
                        { 
                            title: "UMIDADE", 
                            icon: RiWaterPercentFill, 
                            value: (latestData.umidadeRelativa !== null && latestData.umidadeRelativa !== "NaN") ? `${latestData.umidadeRelativa}%` : "Dado Omisso",
                            min: (latestData.umidadeRelativaMin !== null && latestData.umidadeRelativaMin !== "NaN") ? `${latestData.umidadeRelativaMin}%` : "Null",
                            max: (latestData.umidadeRelativaMax !== null && latestData.umidadeRelativaMax !== "NaN") ? `${latestData.umidadeRelativaMax}%` : "Null",
                            minIcon: FaArrowDownShortWide, 
                            maxIcon: FaArrowUpShortWide 
                        },
                        { 
                            title: "CHUVA", 
                            icon: TiWeatherShower, 
                            value: (latestData.precipitacaoTotal !== null && latestData.precipitacaoTotal !== "NaN") ? `${latestData.precipitacaoTotal} mm` : "Dado Omisso",
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
                            value: "Dado Omisso", 
                            min: "N/A", 
                            max: "N/A", 
                            minIcon: FaTemperatureArrowDown, 
                            maxIcon: FaTemperatureArrowUp 
                        },
                        { 
                            title: "PRESSÃO", 
                            icon: TbWorld, 
                            value: "Dado Omisso", 
                            min: "N/A", 
                            max: "N/A", 
                            minIcon: TbWorldDown, 
                            maxIcon: TbWorldUp 
                        },
                        { 
                            title: "UMIDADE", 
                            icon: RiWaterPercentFill, 
                            value: "Dado Omisso", 
                            min: "N/A", 
                            max: "N/A", 
                            minIcon: FaArrowDownShortWide, 
                            maxIcon: FaArrowUpShortWide 
                        },
                        { 
                            title: "CHUVA", 
                            icon: TiWeatherShower, 
                            value: "Dado Omisso", 
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
            <ComponentDados items={statusItems} />
        </div>
    );
};

export default StatusBar;
