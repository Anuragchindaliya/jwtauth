import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPTION = {
            dbName: "jwtauth"
        }
        await mongoose.connect(DATABASE_URL, DB_OPTION)
        console.log("connected successfully")
    } catch (error) {
        console.log("connect", error);
    }

}
export default connectDB;