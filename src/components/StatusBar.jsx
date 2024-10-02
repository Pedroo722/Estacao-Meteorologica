import React from "react";
import ComponentDados from './ComponentDados'
import { FaTemperatureHalf, FaTemperatureArrowDown, FaTemperatureArrowUp, FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6"; 
import { RiWaterPercentFill } from "react-icons/ri";
import { TiWeatherShower } from "react-icons/ti";
import { GiWaterSplash } from "react-icons/gi"; 
import { IoIosWater } from "react-icons/io";
import { TbWorld, TbWorldDown, TbWorldUp } from "react-icons/tb";


const StatusBar = () => {
    const StatusBarStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        width: '80%',
        marginBottom: '20px',
        color: '#fff'
    };

    const statusItems = [
        { title: "TEMPERATURA", icon: FaTemperatureHalf, value: "30º", min: '20º', max: '40º', minIcon: FaTemperatureArrowDown, maxIcon: FaTemperatureArrowUp },
        { title: "PRESSÃO", icon: TbWorld, value: "10", min: '20º', max: '40º', minIcon: TbWorldDown, maxIcon: TbWorldUp },
        { title: "UMIDADE", icon: RiWaterPercentFill, value: "10", min: '20º', max: '40º', minIcon: FaArrowDownShortWide, maxIcon: FaArrowUpShortWide },
        { title: "CHUVA", icon: TiWeatherShower, value: "10", min: '20º', max: '40º', minIcon: IoIosWater, maxIcon: GiWaterSplash },
        
    ];

    return (
        <div style={StatusBarStyle} >
            <ComponentDados items={statusItems} />
        </div>
    );
}

export default StatusBar;