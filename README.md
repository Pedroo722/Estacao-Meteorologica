# Estação Metereologica - Dashboard de Análise de Dados Meteorológicos

<img alt="Logo do Instituto Federal da Paraíba" width="80px" src="https://www.ifpb.edu.br/en/imagens/logotipos/ifpb.png" align="left" style="margin-left: 5px;" />

Este repositório contém o código front-end que foi desenvolvido como parte do trabalho no Instituto Federal da Paraíba (IFPB) para o projeto de pesquisa: "**Construção de Dashboards para Auxílio na Análise de Dados Meteorológicos**". O objetivo principal do projeto é a construção de um dashboard interativo para auxiliar na análise de dados meteorológicos fornecidos pelo INMET ([INMET Portal](https://portal.inmet.gov.br/dadoshistoricos/)). 

<p align="right">Coordenador: Prof. Valnyr Vasconcelos Lira</p>


## Tecnologias Usadas


<div align="center">

![Javascript](https://img.shields.io/badge/javascript-%23323330?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)

</div>

## Funcionalidades

O dashboard possui duas páginas principais, com o intuito de oferecer uma experiência clara e simples na análise de dados meteorológicos. Aqui estão as principais funcionalidades disponíveis:

### 1. Página Inicial
- **Mapa Interativo da Paraíba**: Ao acessar a página inicial, você encontrará um mapa interativo da Paraíba contendo suas estações metereólogicas. 
- **Seleção de Estações Meteorológicas**: O usuário pode clicar nas estações meteorológicas marcadas no mapa para exibir informações detalhadas sobre a estação, exibindo os dados na seção embaixo do mapa. 
- **Informações em Destaque**: Após selecionar uma estação, os ícones em cima do mapa mostram a média diária do dia atual dos seguintes valores:
  - Temperatura do bulbo seco
  - Temperatura de orvalho
  - Pressão atmosférica
  - Umidade relativa
  - Pluviosidade do dia atual  

<div align="center">
  <img src="https://github.com/user-attachments/assets/f852d38a-dc9f-4cf2-b8c6-c0cf789b14d6" alt="Página Inicial" width="70%" height="70%" />
</div>

### 2. Página de Gráficos
- **Pesquisa de Estação**: Na segunda página, você pode pesquisar por uma estação específica.
- **Tipo de Pesquisa**: A página permite realizar pesquisas por dia ou por mês.
- **Selecionar Data**: Ao insirir uma data específica, a página retorne os dados meteorológicos correspondentes.
- **Visualização dos Dados**: Os dados são apresentados em uma tabela geral, juntamente com gráficos para cada tipo de dado, facilitando a comparação e análise visual.  

<div align="center">
  <img src="https://github.com/user-attachments/assets/41bb5339-3c56-439e-9664-a6c48d8b565b" alt="Tabela Geral" width="70%" height="70%" />
  <img src="https://github.com/user-attachments/assets/d9d95b91-44f9-4e0b-b820-64829a9b539d" alt="Gráfico de Temperatura" width="70%" height="70%" />
</div>