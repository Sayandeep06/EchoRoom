import { useState } from 'react';

function LandingPage({ onJoin }: { onJoin: (roomId: string) => void }) {
  const [roomId, setRoomId] = useState("");

  const handleJoin = () => {
    if (roomId.trim() !== "") {
      onJoin(roomId);
    }
  };

  return (
    <div className='flex items-center justify-center bg-black w-screen h-screen'>
      <div className='flex flex-col rounded-xl border-gray-700 border w-150 h-150 p-4 gap-4'>
        <input
          placeholder='Enter Room ID'
          className='bg-white w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500 italic'
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button
          className='bg-gray-700 shadow shadow-gray-500 text-white rounded-md mx-2 px-4 transition transform active:shadow-lg active:scale-95 mt-4'
          onClick={handleJoin}
        >
          Join Room
        </button>
      </div>
    </div>
  );
}

export default LandingPage;