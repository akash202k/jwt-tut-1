import express from "express"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function verifyToken(token) {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        return decoded
    } catch (error) {
        console.error("Invalid Token or token not exist", error);
        return;

    }
}
export default async function auth(req, res, next) {
    try {
        console.log(req.cookies.token);
        if (req.cookies && req.cookies?.token) {
            console.log(req.cookies.token);
            const token = req.cookies?.token;
            const decoded = await verifyToken(token);
            if (decoded) {
                req.user = decoded;
                return next();
            }
        }

        return res.json({
            message: "UnAuthorized"
        });
    } catch (error) {
        console.error("Something went wrong here", error);
        res.json({
            message: "UnAuthorized"
        })
        return;
    }
}