import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import userRouter from "./routers/user.router.js"
import { notFound } from "./controllers/default.controller.js"
import sequelize from "./mysql.js"

const hostname = "0.0.0.0";
const port = 3000;

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api', userRouter)
app.all("*", notFound);

app.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
});
