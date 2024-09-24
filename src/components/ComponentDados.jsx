// import React from "react";
// import { FaTemperatureHalf } from "react-icons/fa6";


// const ComponentDados = ({ title, Icon, value }) => {
//     const componentDadosStyle = {
//         display: 'flex',
//         justifyContent: 'space-around',
//         width: '80%',
//         marginBottom: '20px',
//         color: '#fff'
//     };

//     const boxStyle = {
//         textAlign: 'center',
//     };

//     const icon = {
//         backgroundColor: '#03624C',
//         width: '130px',
//         height: '130px',
//         display: 'flex',
//         flexDirection: 'column', 
//         justifyContent: 'space-evenly',
//         alignItems: 'center', // Alinhar ícone e texto no centro
//         borderRadius: '50px', 
//         color: 'white',
//         fontWeight: 'bold',
//         margin: '20px auto',
//     };

//     const textStyle = {
//         margin: '5px 0',
//         fontSize: '14px',
//         color: '#555',
//     };

//     const numberStyle = {
//         margin: '5px 0',
//         fontSize: '30px',
//         color: '#FFFFFF',
//     };

//     const iconStyle = { 
//         fontSize: '100px',    
//         margin: '20px 0',      // Margem ao redor do ícone
//         transition: 'transform 0.2s', // Efeito de transição
//     };

//     return (
//         <div style={{ textAlign: 'center' }}>
//         <p style={textStyle}>{title}</p>
//         <div style={iconStyle}>
//             <Icon style={{ fontSize: '50px' }} />
//             <h3 style={numberStyle}>{value}</h3>
//         </div>
//     </div>
//     );
// }

import React from "react";

// Componente para cada item da barra de status
const ComponentDadosItem = ({ title, Icon, value }) => {
    const iconStyle = {
        backgroundColor: '#03624C',
        width: '130px',
        height: '130px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: '50px',
        color: 'white',
        fontWeight: 'bold',
        margin: '20px auto',
    };

    const textStyle = {
        margin: '5px 0',
        fontSize: '14px',
        color: '#555',
    };

    const numberStyle = {
        margin: '5px 0',
        fontSize: '30px',
        color: '#FFFFFF',
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <p style={textStyle}>{title}</p>
            <div style={iconStyle}>
                <Icon style={{ fontSize: '50px' }} />
                <h3 style={numberStyle}>{value}</h3>
            </div>
        </div>
    );
};

// Componente principal StatusBar que aceita props
const ComponentDados = ({ items }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '80%', marginBottom: '20px', color: '#fff' }}>
            {items.map((item, index) => (
                <ComponentDadosItem key={index} title={item.title} Icon={item.icon} value={item.value} />
            ))}
        </div>
    );
}

export default ComponentDados;
