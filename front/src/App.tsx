import React, { useState, useEffect } from 'react';
import './App.css';
import { Header } from './atoms/Header';


type Message = {
  text: string;
  sender: string;
}

const Chatbot = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const REACT_APP_API_ENDPOINT="https://api.a3rt.recruit.co.jp/talk/v1/smalltalk";

  const REACT_APP_API_KEY="ZZIvj2zkNOz6X4sUwY83l14fmctn1e6W";
  const chatgpt_API_ENDPOINT = "http://localhost:8000/response/"


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
      const response = await fetch(chatgpt_API_ENDPOINT ?? "", {
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
      console.log(data)

      setMessages(messages => [...messages, { text: data.message, sender: 'bot' }]);
    } catch (error) {
      setMessages(messages => [...messages, { text: 'Error: Failed to fetch data from API', sender: 'bot' }]);
    }
  }

  return (
    <div className="chatbot">
      <Header/>
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
