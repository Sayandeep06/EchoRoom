import { useEffect, useRef, useState } from 'react';
import './index.css';
import ChatIcon from './assets/chatIcon';
import LandingPage from './LandingPage';

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (roomId) {
      const websocket = new WebSocket("ws://localhost:8080");
      setWs(websocket);

      websocket.onopen = () => {
        websocket.send(JSON.stringify({
          type: "join",
          payload: {
            roomId
          }
        }));
      };

      websocket.onmessage = (event) => {
        const data = event.data;
        setMessages((messages) => [...messages, data]);
      };

      return () => {
        websocket.close();
      };
    }
  }, [roomId]);

  const handleSubmit = () => {
    if (ws && inputValue.trim() !== "") {
      ws.send(JSON.stringify({
        type: "chat",
        payload: {
          message: inputValue
        }
      }));
      setInputValue("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {roomId ? (
        <div className='flex items-center justify-center bg-black w-screen h-screen'>
          <div className='flex flex-col rounded-xl border-gray-700 border w-150 h-150 p-4 gap-4'>
            <div className='flex w-full h-10 justify-start rounded-xl items-center text-white text-xl italic'>
              <span className='mx-4'><ChatIcon/></span>
              Chat Room
            </div>
            <div className='flex flex-col-reverse w-full h-full border border-gray-700 rounded-xl p-4 gap-4 overflow-y-auto'>
              {messages.slice().reverse().map((message, index) => (
                <span key={index}>
                  <p className='italic inline-block px-2 bg-gray-200 rounded-md'>{message}</p>
                </span>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className='flex rounded-md mx-1'>
              <input
                placeholder='Type Messages'
                className='bg-white w-120 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-gray-500 italic'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <button
                className='bg-gray-700 shadow shadow-gray-500 text-white rounded-md mx-2 px-4 transition transform active:shadow-lg active:scale-95'
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <LandingPage onJoin={setRoomId} />
      )}
    </div>
  );
}

export default App;