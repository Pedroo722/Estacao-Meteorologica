import React, { useState } from "react";
import '../styles/StationDataIcons.css'; // Importando o CSS separado

const ComponentDadosItem = ({ title, Icon, value, min, max, minIcon: MinIcon, maxIcon: MaxIcon }) => {
    const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar se o item foi clicado

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="container-icon" onClick={handleClick}>
            <p className="text-icon">{title}</p>
            <div className={`icon-container ${isExpanded ? 'expanded' : ''}`}>
                {isExpanded ? (
                    <div>
                        <Icon className="icon-small" />
                        <h3 className="number-style">{value}</h3>
                    </div>
                ) : (
                    <div>
                        <Icon className="icon-large" />
                        <h3 className="number-style">{value}</h3>
                    </div>
                )}
                {isExpanded && ( 
                    <div className="min-max-style">
                        <div className="extra-style">
                            <MinIcon className="min-max-icon" />
                            <p className="min-max-text">Min: {min}</p>                                
                        </div>
                        <div className="extra-style">
                            <MaxIcon className="min-max-icon" />
                            <p className="min-max-text">Max: {max}</p> 
                        </div>                            
                    </div>                       
                )}                
            </div>
        </div>
    );
};

const ComponentDados = ({ items }) => {
    return (
        <div className="component-dados-container">
            {items.map((item, index) => (
                <ComponentDadosItem 
                    key={index} 
                    title={item.title} 
                    Icon={item.icon} 
                    value={item.value} 
                    min={item.min} 
                    max={item.max} 
                    minIcon={item.minIcon}
                    maxIcon={item.maxIcon}
                />
            ))}
        </div>
    );
}

export default ComponentDados;
