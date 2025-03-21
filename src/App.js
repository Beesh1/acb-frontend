import React, { useState, useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import './App.css';

function App() {

  const [code, setCode] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new ReconnectingWebSocket('ws://127.0.0.1:8000/ws');
    setSocket(ws);

    ws.onmessage = (event) => {
      setAiResponse(event.data);
    };

    return () => ws.close();
  }, []);

  const handleCodeChange = (event) => {
    const newCode = event.target.value;
    setCode(newCode);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(newCode);
    }
  };

  return (
    <div className="App">
      <h1>AI Code Buddy</h1>
      <textarea
        value={code}
        onChange={handleCodeChange}
        placeholder="Type your code here (e.g., def hello():)"
        rows="5"
        cols="50"
      />
      <h2>AI Suggestion:</h2>
      <pre>{aiResponse || 'Waiting for AI...'}</pre>
    </div>
  );
}

export default App;