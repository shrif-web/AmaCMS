import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import userRouter from "./routers/user.router.js"
import paymentRouter from "./routers/payment.router.js"
import searchRouter from "./routers/search.router.js"
import { notFound } from "./controllers/default.controller.js"
import sequelize from "./services/mysql.js"

const hostname = "0.0.0.0";
const port = 3000;

try {
    await sequelize.authenticate();
    console.log('Connection to mysql has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api', userRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/search', searchRouter)

app.all("*", notFound);

app.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
});
