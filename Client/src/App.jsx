import { useState } from "react";
import Login from "./components/Login";
import Logo from "./assets/logo.png";
import SignUp from "./components/SignUp";
import { Chat } from "stream-chat-react";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
// import Game from "./components/Game";
import JoinGame from "./components/JoinGame";



export default function App() {
  
  const cookies = new Cookies();
  const api_key = "9nb7hnag7fcb";
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  const logOut = ()=> {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  if(token){
    client.connectUser({
      id: cookies.get("userId"),
      name: cookies.get("userName"),
      firstName: cookies.get("firstName"),
      lastName: cookies.get("lastName"),
      hashedPassword: cookies.get("hashedPassword")
    }, token).then(() => {
        setIsAuth(true);
    });
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="absolute top-2 flex items-center justify-center mb-6">
        <img className="size-14" src={Logo} alt="Logo" />
      <p className="text-4xl font-bold font-mono m-2">Tic-Tac-Toe</p>
      </div>
      {isAuth ? (
      <Chat client={client}>
        <JoinGame />
      <button className="mt-3 mb-4 bg-red-600 px-3 font-semibold hover:bg-red-500
         font-sans w-30 h-8 ring-2 ring-white" onClick={logOut}>Log out</button>
      </Chat>) : (
        <>
        <SignUp setIsAuth={setIsAuth} />
        <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  )
}
