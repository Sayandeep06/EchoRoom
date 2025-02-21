import { useEffect, useState } from 'react'
import './index.css'
import ChatIcon from './assets/chatIcon';

function App() {

  const [messages, setMessages] = useState(["hi there"]);

  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      const data = event.data;
      setMessages(messages => [...messages, data])
    }
  },[]);

  return (
    <div className='flex items-center justify-center bg-black w-screen h-screen'>
      <div className='flex flex-col rounded-xl border-gray-700 border w-150 h-150 p-4 gap-4'>
        <div className='flex w-full h-10 justify-start rounded-xl items-center text-white text-xl italic'>
          <span className='mx-4'><ChatIcon/></span>
          Chat Room
        </div>
        <div className='flex flex-col w-full h-full border border-gray-700 rounded-xl p-4 gap-4 overflow-y-auto'>
          {messages.map((message)=>(
            <span className=''>
              <p className='italic inline-block px-2 bg-gray-200 rounded-md'>{message}</p>
            </span>
          ))}
        </div>
        <div className='flex rounded-md mx-1'>
          <input placeholder='Type Messages' className='bg-white w-120 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-gray-500 italic'></input>
          <button className='bg-gray-700 shadow shadow-gray-500 text-white rounded-md mx-2 px-4 tansition transform active:shadow-lg active:scale-95'>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default App
