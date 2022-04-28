import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
var checkUserAuth = async (req, res, next) => {
    const { cookies } = req;
    if ("token" in cookies) {
        console.log("token is exists", cookies);
        try {
            const { signID } = jwt.verify(cookies.token, process.env.JWT_SECRET_KEY);
            res.user = await UserModel.findById(signID).select("-password");
            next()
        } catch (error) {
            console.log(error);
            res.status(401).json({ status: "failed", message: "Unauthorize user" });
        }
    } else {
        console.log("cookies not exists");
        res.status(403).json({ status: "failed", message: "Not Authenticated" })
    }

}
export default checkUserAuth;