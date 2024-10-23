import React, { useState } from "react";
import '../styles/RainComponent.css'; // Importando o CSS separado

const RainComponent = ({ title, Icon, value }) => {
    const [isExpanded, setIsExpanded] = useState(false); 

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="rain-component" onClick={handleClick}>
            <p className="rain-text">{title}</p>
            <div className="rain-icon-container">
                <div>
                    <Icon className={`rain-icon ${isExpanded ? 'rain-icon-small' : 'rain-icon-large'}`} />
                    <h3 className="rain-number">{value}</h3>
                </div>
            </div>
        </div>
    );
};

const RainContainer = ({ item }) => {
    return (
        <div className="rain-container">
            <RainComponent 
                title={item.title} 
                Icon={item.icon} 
                value={item.value} 
            />
        </div>
    );
}

export default RainContainer;
