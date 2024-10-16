import React, { useState } from "react";

const RainComponent = ({ title, Icon, value}) => {
    const [isExpanded, setIsExpanded] = useState(false); 

    const iconStyle = {
        width: '175px',
        height: '135px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        borderRadius: '20px',
        
        color: 'white',
        fontWeight: 'bold',
        margin: '10px auto',
        transition: 'height 0.5s ease, width 0.5s ease', // Animação para aumentar tamanho
        cursor: 'pointer',
        border: '5px solid #03624C',
    };

    const textStyle = {
        margin: '5px 0',
        fontSize: '14px',
        color: '#03624C',
        fontWeight: 'bold',
    };

    const numberStyle = {
        margin: '5px 0',
        fontSize: '25px',
        color: '#03624C',
    };

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div style={{ textAlign: 'center' }} onClick={handleClick}>
            <p style={textStyle}>{title}</p>
            <div style={iconStyle}>
                <div>
                    <Icon style={{ fontSize: isExpanded ? '20px' : '50px', transition: 'height 1s ease, width 1s ease', color: '#03624C' }} />
                    <h3 style={numberStyle}>{value}</h3>
                </div>
            </div>
        </div>
    );
};

const RainContainer = ({ item }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '80%', marginBottom: '20px', color: '#fff' }}>
            <RainComponent 
                title={item.title} 
                Icon={item.icon} 
                value={item.value} 
            />
        </div>
    );
}

export default RainContainer;
