import { Router } from "express";
import { nanoid } from "nanoid";
const router = Router();
import jwt from "jsonwebtoken";
import auth from "../middleware/index.js";
import dotenv from "dotenv";


dotenv.config();

router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const userid = nanoid(3);

        // concider username as email id
        // implement input validation using zod
        // check either user exist in database 
        // if exist return user exist and ask for login
        // if user not exist register user and send jwt token

        console.log(process.env.JWT_SECRET);

        const token = await jwt.sign({
            userid,
            username
        }, process.env.JWT_SECRET);

        console.log(`user ${username} is registered successfully`);
        return res.json({
            userid,
            token
        })

    } catch (error) {
        console.error("Something went wrong while registering user");
        return;
    }

})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const token = await jwt.sign({ username }, process.env.JWT_SECRET);

    res.cookie("token", token, { httpOnly: true });

    res.json({
        token
    })
    return;
})

router.get("/health", (req, res) => {
    return res.json({
        health: "Ok"
    })
})


router.get("/", auth, async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        return res.json(decoded);

    } catch (error) {
        console.error("invalid user", error);
        return;
    }
})

export default router;