import dotenv from "dotenv";
dotenv.config()
import express from 'express';
import connectDB from "./config/connectdb.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";



const app = express()
const port = process.env.port;
const DATABASE_URL = process.env.DATABASE_URL;
app.use(cors({ origin: "http://localhost:4200", credentials: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//database connection
connectDB(DATABASE_URL);

//parses cookies attached to the client request object
app.use(cookieParser());

// JSON
app.use(express.json());



app.use("/api/user", userRoutes)





app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})