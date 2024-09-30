import React, { useState, useEffect } from 'react';
import '../App.css';
import { FrontPageHeader } from '../organisims/FrontPageHeader';
import { Box, type SelectChangeEvent } from '@mui/material';
import { Triangle } from '../organisims/figures/Triangle';
import { Square } from '../organisims/figures/Square';
import { AgentCommunicationArea } from '../organisims/AgentComunicationArea';
import { QAArea } from '../organisims/QAArea';
import { NavigateToProblemButtonGroup } from '../organisims/NavigateToProblemButtonGroup';
import { LoginPage } from './LoginPage';
import { Navigate } from 'react-router-dom';


type AgentType = {
  selectValue: number,
  name: string,
  responseEndPoint: string
}

export const USER_ID = localStorage.getItem("user_id_metaSuggestion_experiment")
export const Home:React.FC = () => {
  const [currentAgentresponseEndPoint, setCurrentAgentresponseEndPoint] = useState<string>("/")
  const agentTypes: AgentType[] = [
    {
      selectValue: 0,
      name: "記憶なし",
      responseEndPoint: "/"
    },
    {
      selectValue: 1,
      name: "短期記憶あり",
      responseEndPoint: "ShortMemory/"
    },
  ]

  const selectOptions = agentTypes.map((agentType) => { return (
    {
      value: agentType.selectValue,
      name: agentType.name
    }
  )})
  const onAgentTypeChange = (event: SelectChangeEvent) => {
    const selectedAgentType = agentTypes.find((agentType) => (event.target.value == agentType.selectValue.toString()))
    if (selectedAgentType){
      setCurrentAgentresponseEndPoint(selectedAgentType.responseEndPoint)
    }
  }
  console.log(USER_ID)
  return (
    USER_ID ? 
    <div className="chatbot">
      <FrontPageHeader selectOptions={selectOptions} onAgentTypeChange={onAgentTypeChange}/>
      <Box sx={{display: "flex"}}>
        <Box sx={{width: "60%", backgroundColor: "white", padding: "20px", gap: "10px", display: "flex", flexDirection: "column"}}>
          <QAArea/>
          <NavigateToProblemButtonGroup/>
        </Box>  
        <AgentCommunicationArea currentAgentresponseEndPoint={currentAgentresponseEndPoint}/>
      </Box>
    </div> :
    <Navigate to="/login" />
  );
}


