import dotenv from "dotenv";
dotenv.config()
import express from 'express';
import connectDB from "./config/connectdb.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"



const app = express()
const port = process.env.port;
const DATABASE_URL = process.env.DATABASE_URL;
app.use(cors());

//database connection
connectDB(DATABASE_URL);

// JSON
app.use(express.json())

app.use("/api/user", userRoutes)





app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})