import express from  "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const app = express();
const port= 5000;

app.use(cors());
app.use(express.json());

const api_key = "9nb7hnag7fcb";
const api_secret = "se2xjxgfzmyyazj45kypraswqt6nxt2j6g6jas6g5vf65zrzqwrsmf2rjf7nk7vs";
const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res)=> {
    try {
    const { firstName, lastName , userName , password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    res.json({token, userId, firstName, lastName, userName, hashedPassword});
    } catch(error) {
        res.json(error);
    }
});

app.post("/login", async (req, res)=> {
      try {
        const { userName, password } = req.body;
      const { users } = await serverClient.queryUsers({ name: userName});
      if(users.length === 0) return res.json({message: "User not found"});

      const token = serverClient.createToken(users[0].id);
      const passwordMatch = await bcrypt.compare(password, users[0].hashedPassword);
     
      if (passwordMatch) {
        res.json({
          token,
          firstName: users[0].firstName,
          lastName: users[0].lastName,
          userName,
          userId: users[0].id,
        });
      } 
      } catch (error) {
        res.json(error);
      }    
});


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});

