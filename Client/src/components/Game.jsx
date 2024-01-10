import { useState } from "react"
import Board from "./Board";
import Loader from "../assets/loader.gif";
import "./Chat.css";
import { Window, MessageList, MessageInput } from "stream-chat-react";

export default function Game({ channel, setChannel }) {

    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2); 

    const [result, setResult] = useState({ winner: "none", state: "none" });
 
    channel.on("user.watching.start", (event)=>{
         setPlayersJoined(event.watcher_count === 2);
    });

    if(!playersJoined){
        return (<div className="flex flex-col items-center justify-center">
          <p className="text-xl absolute top-32">Waiting for other players to join...</p> 
          <img className="size-[20rem] m-8" src={Loader} 
          alt="loader" /></div>)
    }


  return (
    <div className="flex w-full h-full items-center justify-center columns-2 gap-[100px]">
     <Board result={result} setResult={setResult} />
      <Window>
        <MessageList
        disableDateSeparator
          closeReactionSelectorOnClick
          hideDeletedMessages
          messageActions={["react"]} />
        <MessageInput noFiles />
      </Window>
      <button
        className="mt-3 mb-4 bg-zinc-500 px-3 font-semibold hover:bg-zinc-400
        font-sans w-30 h-8 ring-2 ring-white mr-5"
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
      >
        {" "}
        Leave Game
      </button>
      {result.state === "won" && <div className="w-[15rem] h-[10rem] absolute right-[8rem] rounded-lg 
      bottom-[8rem] bg-black text-white flex flex-col items-center justify-center shadow-lg shadow-slate-500">
      <p className="text-2xl font-sans font-medium ">Result 👇</p>
      <p 
      className="text-xl font-sans font-medium ">🎉 {result.winner} Won The Game 🎉</p></div>}
      {result.state === "tie" && <div className="w-[15rem] h-[10rem] absolute right-[8rem] rounded-lg 
      bottom-[8rem] bg-black text-white flex flex-col items-center justify-center shadow-lg shadow-slate-500">
        <p className="text-2xl font-sans font-medium ">Result 👇</p>
        <p className="text-xl font-sans font-medium ">Game Tied 🤝</p></div>}
    </div>
  )
}