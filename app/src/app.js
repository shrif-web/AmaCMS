import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import userRouter from "./routers/user.router.js"
import { notFound } from "./controllers/default.controller.js"
import sequelize from "./mysql.js"
import elastic from "./elastic.js"

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

app.get('/etest', async (req, res) => {
    const { body } = await elastic.search({
        index: 'myindex',
        body: {
            query: {
                match_all: {}
            }
        }
    })

    res.status(200).json(body)
})

app.all("*", notFound);

app.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
});
