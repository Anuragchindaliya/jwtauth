import UserModel from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
class UserController {
    static userRegistration = async (req, res,) => {
        const { name, email, password, password_confirmation } = req.body;

        if (name && email && password && password_confirmation) {
            if (password === password_confirmation) {
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

                        res.status(201).send({ "status": "success", "message": "Registration success", token })
                    } catch (error) {
                        console.log(error);
                        res.send({ "status": "failes", "message": "unable to register" })
                    }
                }
                else {
                    res.status(209).send({ "status": "failed", "message": "email is already exists" });
                }

            } else {
                res.send({ "status": "failed", "message": "password and confirmation password doestn't match" })
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
}

export default UserController;