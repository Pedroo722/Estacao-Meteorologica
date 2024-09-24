import React from "react";
import ComponentDados from './ComponentDados'
import { FaTemperatureHalf, FaCloudSunRain, FaCloudArrowDown } from "react-icons/fa6"; 
import { RiWaterPercentFill } from "react-icons/ri";

const StatusBar = () => {
    const StatusBarStyle = {
                display: 'flex',
                justifyContent: 'space-around',
                width: '80%',
                marginBottom: '20px',
                color: '#fff'
    };

    const statusItems = [
        { title: "TEMPERATURA", icon: FaTemperatureHalf, value: "30º" },
        { title: "PRESSÃO", icon: FaCloudArrowDown, value: "10" },
        { title: "UMIDADE", icon: RiWaterPercentFill, value: "10" },
        { title: "CHUVA", icon: FaCloudSunRain, value: "10" },
        
    ];

    return (
        <div style={StatusBarStyle} >
            <ComponentDados items={statusItems} />
        </div>
    );
}

export default StatusBar;


// <div style={boxStyle}>
// <p style={textStyle}>TEMPERATURA</p>
// <div style={icon}>
//     <FaTemperatureHalf style={{fontSize: '50px'}} /> {/* Aplique iconStyle aqui */}
//     <h3 style={numberStyle}>30º</h3>
// </div>
// </div>  
// <div style={boxStyle}>
// <p style={textStyle}>PRESSÃO</p>
// <p>ICONE PRESSÃO</p>
// <h3 style={numberStyle}>10</h3>
// </div>
// <div style={boxStyle}>
// <p style={textStyle}>UMIDADE</p>
// <p>ICONE UMIDADE</p>
// <h3 style={numberStyle}>10</h3>
// </div>
// <div style={boxStyle}>
// <p style={textStyle}>CHUVA</p>
// <p>ICONE CHUVA</p>
// <h3 style={numberStyle}>10</h3>
// </div>