import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd'; 
import StationDetails from '../components/StationDetails'; 
import dayjs from 'dayjs';
import Papa from 'papaparse';

const Station = () => {
  const stationDetails = {
    city: "Campina Grande",
    state: "PB",
    creationDate: "01/01/2000",
    code: "A313",
    latitude: "-23.5505",
    longitude: "-46.6333",
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const loadCSV = async () => {
      const response = await fetch('data/PB_CG_22082024.csv');
      const text = await response.text();

      // Parse do CSV
      Papa.parse(text, {
        header: true,
        delimiter: ";",
        complete: (results) => {
          // Armazena os dados no estado
          setWeatherData(results.data);
        },
      });
    };

    loadCSV();
  }, []);

  return (
    <div>
      <StationDetails details={stationDetails} />
    
      <div className="data-container">
        <div className="datapicker">
          <h2>Selecione um Intervalo de Datas</h2>
          <label>
            Data de Início:
            <DatePicker 
              value={startDate ? dayjs(startDate) : null} 
              onChange={(date) => setStartDate(date)} 
            />
          </label>
          <label>
            Data de Fim:
            <DatePicker 
              value={endDate ? dayjs(endDate) : null} 
              onChange={(date) => setEndDate(date)} 
            />
          </label>      
        </div>

        <div className="station-content">
          {/* Renderize os dados do CSV aqui */}
          {weatherData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Hora (UTC)</th>
                  <th>Temp. Ins. (C)</th>
                  <th>Temp. Max. (C)</th>
                  <th>Temp. Min. (C)</th>
                  <th>Umi. Ins. (%)</th>
                  <th>Umi. Max. (%)</th>
                  <th>Umi. Min. (%)</th>
                  <th>Pto Orvalho Ins. (C)</th>
                  <th>Pto Orvalho Max. (C)</th>
                  <th>Pto Orvalho Min. (C)</th>
                  <th>Pressao Ins. (hPa)</th>
                  <th>Pressao Max. (hPa)</th>
                  <th>Pressao Min. (hPa)</th>
                  <th>Vel. Vento (m/s)</th>
                  <th>Dir. Vento (m/s)</th>
                  <th>Raj. Vento (m/s)</th>
                  <th>Radiacao (KJ/m²)</th>
                  <th>Chuva (mm)</th>
                </tr>
              </thead>
              <tbody>
                {weatherData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.Data}</td>
                    <td>{row["Hora (UTC)"]}</td>
                    <td>{row["Temp. Ins. (C)"]}</td>
                    <td>{row["Temp. Max. (C)"]}</td>
                    <td>{row["Temp. Min. (C)"]}</td>
                    <td>{row["Umi. Ins. (%)"]}</td>
                    <td>{row["Umi. Max. (%)"]}</td>
                    <td>{row["Umi. Min. (%)"]}</td>
                    <td>{row["Pto Orvalho Ins. (C)"]}</td>
                    <td>{row["Pto Orvalho Max. (C)"]}</td>
                    <td>{row["Pto Orvalho Min. (C)"]}</td>
                    <td>{row["Pressao Ins. (hPa)"]}</td>
                    <td>{row["Pressao Max. (hPa)"]}</td>
                    <td>{row["Pressao Min. (hPa)"]}</td>
                    <td>{row["Vel. Vento (m/s)"]}</td>
                    <td>{row["Dir. Vento (m/s)"]}</td>
                    <td>{row["Raj. Vento (m/s)"]}</td>
                    <td>{row["Radiacao (KJ/m²)"]}</td>
                    <td>{row["Chuva (mm)"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Carregando dados...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Station;
