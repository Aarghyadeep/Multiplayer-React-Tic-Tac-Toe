import { useState } from "react"
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";
import CustomInput from "./CustomInput";

export default function JoinGame() {

  const[rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);

  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };

  return (
    <>
    {channel ? 
    <Channel channel={channel} Input={CustomInput} >
       <Game channel={channel} setChannel={setChannel} />
    </Channel>
     : 
    (
        <div className="flex flex-col m-[20px] w-[25rem] h-[22rem] text-black shadow-gray-600
        bg-gray-400 shadow-xl rounded-xl p-6 items-center justify-center font-serif">
          <div className="relative bottom-10">
          <p className="text-3xl font-bold font-mono m-2">Create Game 🎮</p>
          </div>
      <label className="text-xl font-bold font-mono m-2">Select your opponent 👇</label>
      <input type="text"
      className="mt-3 mb-2 w-80 place-items-center bg-transparent rounded-md placeholder-black
      text-base focus:outline-none border border-b-black focus:border-white  px-2 py-1" 
      placeholder="Username of rival.." 
      onChange={(event) => {
        setRivalUsername(event.target.value);
      } } /> 
      <button 
      className="mt-3 mb-4 bg-green-500 px-3 font-semibold hover:bg-green-400
      font-sans w-40 h-8 ring-2 ring-blue-300"
      onClick={createChannel}>Join/Start Game</button>
    </div>
    )
    }
    </>)
}
