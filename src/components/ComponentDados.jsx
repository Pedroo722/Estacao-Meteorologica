import React, { useState } from "react";

// Componente para cada item da barra de status
const ComponentDadosItem = ({ title, Icon, value, min, max, minIcon: MinIcon, maxIcon: MaxIcon }) => {
    const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar se o item foi clicado

    // Estilos base
    const iconStyle = {
        backgroundColor: '#03624C',
        width: '130px',
        height: '130px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        // alignItems: 'center',
        borderRadius: '20px',
        color: 'white',
        fontWeight: 'bold',
        margin: '20px auto',
        transition: 'height 0.5s ease, width 0.5s ease', // Animação para aumentar tamanho
        cursor: 'pointer',
    };

    const expandedStyle = {
        height: '150px', // Aumenta ao clicar
    };

    // const expandedStyle3 = {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     justifyContent: 'space-evenly',
    //     alignItems: 'center',
        
    // };

    // const expandedStyle2 = {
    //     flexDirection: 'row', // Altera a direção do flex para horizontal quando expandido
    //     justifyContent: 'space-between',
        
    // };

    const textStyle = {
        margin: '5px 0',
        fontSize: '14px',
        color: '#03624C',
        fontWeight: 'bold',
    };

    const numberStyle = {
        margin: '5px 0',
        fontSize: '25px',
        color: '#FFFFFF',
    };

    const minMaxStyle = {
        fontSize: '14px',
        color: '#FFFFFF',
        marginTop: '5px',
        transition: 'height 1s ease, width 1s ease'
        
    };

    const extraStyle = {
        display: 'flex', // Flexbox para alinhar o ícone com o valor
        justifyContent: 'flex-start', 
        alignItems: 'center',
        margin: '10px'
    }

    // Alterna entre expandido e colapsado
    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div style={{ textAlign: 'center' }} onClick={handleClick}>

            <p style={textStyle}>{title}</p>

            <div style={{ ...iconStyle, ...(isExpanded ? expandedStyle : {}) }}>
                    {isExpanded ? (
                        <div>
                            <Icon style={{ fontSize: '20px', transition: 'height 1s ease, width 1s ease', }} />
                            <h3 style={numberStyle}>{value}</h3>
                        </div>
                    ) : (
                        <div>
                            <Icon style={{ fontSize: '50px', transition: 'height 1s ease, width 1s ease', }} />
                            <h3 style={numberStyle}>{value}</h3>
                        </div>
                    )}
                    {isExpanded && ( 
                        <div style={minMaxStyle}>
                            <div style={extraStyle} >
                                <MinIcon style={{ fontSize: '20px' }} />
                                <p p style={{margin: '0px', paddingLeft: '10px'}} >Min: {min}</p> 
                                
                            </div>

                            <div style={extraStyle} >
                                <MaxIcon style={{ fontSize: '20px' }} />
                                <p style={{margin: '0px', paddingLeft: '10px'}} >Max: {max}</p> 
                                
                            </div>
                            
                        </div>
                        
                    )}
                
            </div>
        </div>
    );
};

// Componente principal StatusBar que aceita props
const ComponentDados = ({ items }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '80%', marginBottom: '20px', color: '#fff' }}>
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
