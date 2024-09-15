import React, { useState, useEffect } from 'react';
import '../App.css';
import { FrontPageHeader } from '../organisims/FrontPageHeader';
import { Box, type SelectChangeEvent } from '@mui/material';
import { Triangle } from '../organisims/figures/Triangle';
import { Square } from '../organisims/figures/Square';
import { AgentCommunicationArea } from '../organisims/AgentComunicationArea';
import { QuestionArea } from '../organisims/QuestionArea';


type AgentType = {
  selectValue: number,
  name: string,
  responseEndPoint: string
}

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

  return (
    <div className="chatbot">
      <FrontPageHeader selectOptions={selectOptions} onAgentTypeChange={onAgentTypeChange}/>
      <Box sx={{display: "flex"}}>
        <QuestionArea/>
        <AgentCommunicationArea currentAgentresponseEndPoint={currentAgentresponseEndPoint}/>
      </Box>
    </div>
  );
}


