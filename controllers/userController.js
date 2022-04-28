import UserModel from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
class UserController {
    static userRegistration = async (req, res,) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        const { name, email, password } = req.body;

        if (name && email && password) {

            const user = await UserModel.findOne({ email: email });

            if (user === null) {
                try {
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password, salt);
                    const doc = new UserModel({
                        name: name,
                        email: email,
                        password: hashPassword
                    })
                    await doc.save();
                    const saved_user = await UserModel.findOne({ email: email })
                    // genrate jwt token
                    const token = jwt.sign({ signID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" });
                    res.cookie("token", token);
                    res.status(201).json({ status: "success", message: "Registration success" })
                } catch (error) {
                    console.log(error);
                    res.send({ "status": "failes", "message": "unable to register" })
                }
            }
            else {
                res.status(209).send({ "status": "failed", "message": "email is already exists" });
            }
        } else {
            res.send({ "status": "failed", "message": "All fields are required" })
        }
    }

    static userLogin = async (req, res) => {
        // console.log("login", req.body)
        try {
            const { email, password } = req.body;
            if (email && password) {
                const user = await UserModel.findOne({ email: email })
                if (user !== null) {
                    const isMatch = await bcrypt.compare(password, user.password)
                    if (email === user.email && isMatch) {
                        const token = jwt.sign({ signID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" });
                        res.cookie("token", token);
                        res.send({ "status": "success", "message": "Login success" });
                    } else {
                        res.send({ "status": "failed", "message": "Email or Password is not Valid" })
                    }
                } else {
                    res.send({ "status": "failed", "message": "your are not a Registerd user" });
                }
            } else {
                res.send({ "status": "failure", "message": "All fields are required" });
            }
        } catch (error) {
            console.log(error);
            res.send({ "status": "failed", "message": "unable to login" })
        }
    }

    static getUserData = (req, res) => {
        res.status(200).json({ status: "success", message: "Your are Authorized" });
    }
    static userLogout = (req, res) => {
        res.clearCookie("token").json({ status: "success", message: "Logout successfully" })
    }
}

export default UserController;