import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";


export default function SignUp({ setIsAuth }) {

  const cookies = new Cookies(); 
  const [user, setUser] = useState(null);

  const signUp = ()=>{
      axios.post("http://localhost:5000/signup", user).then(res => {
             const { token, userId, firstName, lastName, userName, hashedPassword } = res.data;
          cookies.set("token", token);
          cookies.set("userId", userId);
          cookies.set("userName", userName);
          cookies.set("firstName", firstName);
          cookies.set("lastName", lastName);
          cookies.set("hashedPassword", hashedPassword);
          setIsAuth(true);
      });
  };

  return (
    <div className="flex flex-col m-[20px] w-[25rem] h-[22rem] text-black
    bg-gray-400 shadow-xl rounded-xl p-6 items-center justify-center font-serif
    shadow-gray-600">
      <div>
      <p className="text-3xl font-bold font-mono m-2">Sign Up</p>
      </div>
      <input 
       className="mt-3 mb-2 w-80 place-items-center bg-transparent rounded-md placeholder-black
       text-base focus:outline-none border border-b-black focus:border-white  px-2 py-1"
      type="text" placeholder="First Name" onChange={(e)=> {
        setUser({...user, firstName: e.target.value})} } />
      <input 
      className="mt-3 mb-2 w-80 place-items-center bg-transparent rounded-md placeholder-black
      text-base focus:outline-none border border-b-black focus:border-white  px-2 py-1"
      type="text" placeholder="Last Name" onChange={(e)=> {
        setUser({...user, lastName: e.target.value})} } />
      <input 
      className="mt-3 mb-2 w-80 place-items-center bg-transparent rounded-md placeholder-black
      text-base focus:outline-none border border-b-black focus:border-white  px-2 py-1"
      type="text" placeholder="User Name" onChange={(e)=> {
        setUser({...user, userName: e.target.value})} } />
      <input 
      className="mt-3 mb-2 w-80 place-items-center bg-transparent rounded-md placeholder-black
      text-base focus:outline-none border border-b-black focus:border-white  px-2 py-1"
      type="password" placeholder="Password" onChange={(e)=> {
        setUser({...user, password: e.target.value})} } />
        <button
         className="mt-3 mb-4 bg-green-500 px-3 font-semibold hover:bg-green-400
         font-sans w-40 h-8 ring-2 ring-blue-300"
        onClick={signUp}>Sign Up</button>    
    </div>
  )
}
