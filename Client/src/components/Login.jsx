import { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

export default function Login({ setIsAuth }) {

    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const cookies = new Cookies(); 

    const login = () => {
      axios.post("http://localhost:5000/login", {
        userName,
        password,
      }).then((res) => {
        const { firstName, lastName, userName, token, userId } = res.data;
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("userName", userName);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        setIsAuth(true);
      });
    };

  return (
    <div className="flex flex-col m-[20px] w-[25rem] h-[15rem] text-black
    bg-gray-400 shadow-xl rounded-xl p-6 items-center justify-center font-serif shadow-gray-600">
      <div>
      <p className="text-3xl font-bold font-mono m-2">Log In</p>
      </div>
      <input
         className="mt-3 mb-2 w-80 place-items-center bg-transparent rounded-md placeholder-black
         text-base focus:outline-none border border-b-black focus:border-white  px-2 py-1"
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
         className="mt-3 mb-2 w-80 place-items-center bg-transparent rounded-md placeholder-black
         text-base focus:outline-none border border-b-black focus:border-white  px-2 py-1"
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
        <button 
        className="mt-3 mb-4 bg-green-500 px-3 font-semibold hover:bg-green-400
        font-sans w-40 h-8 ring-2 ring-blue-300"
        onClick={login}>Log In</button>
    </div>
  )
}
