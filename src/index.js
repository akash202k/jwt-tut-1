import express from "express";
import userRoute from "./routes/index.js"
import cookieParser from "cookie-parser";

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute)

app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
})