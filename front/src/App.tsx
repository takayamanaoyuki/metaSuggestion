import React, { useState, useEffect } from 'react';
import './App.css';
import { FrontPageHeader } from './organisims/FrontPageHeader';
import type { SelectChangeEvent } from '@mui/material';
import { Triangle } from './organisims/figures/Triangle';
import { Square } from './organisims/figures/Square';


type Message = {
  text: string;
  sender: string;
}
type AgentType = {
  selectValue: number,
  name: string,
  responseEndPoint: string
}

const Chatbot = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const REACT_APP_API_ENDPOINT="https://api.a3rt.recruit.co.jp/talk/v1/smalltalk";

  const REACT_APP_API_KEY="ZZIvj2zkNOz6X4sUwY83l14fmctn1e6W";
  const chatgpt_API_ENDPOINT = "http://localhost:8000/response"
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


  useEffect(() => {
    setMessages([{ text: '何か文章を書いてね', sender: 'bot' }]);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessages(messages => [...messages, { text: input, sender: 'user' }]);
    setInput('');
    try {
      const response = await fetch(chatgpt_API_ENDPOINT + currentAgentresponseEndPoint ?? "", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          query: input
        })
      });
      const data = await response.json();

      setMessages(messages => [...messages, { text: data.message, sender: 'bot' }]);
    } catch (error) {
      setMessages(messages => [...messages, { text: 'Error: Failed to fetch data from API', sender: 'bot' }]);
    }
  }

  return (
    <div className="chatbot">
      <FrontPageHeader selectOptions={selectOptions} onAgentTypeChange={onAgentTypeChange}/>
      <Square number={2} circled={false}/>
      <ul className="messages">
        {messages.map((message, index) => (
          <li key={index} className={message.sender}>
            <img src={`/${message.sender}.png`} alt={message.sender} />
            <span>{message.text}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;
