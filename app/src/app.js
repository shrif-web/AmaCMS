import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import apiRouter from "./routers/api/api.router.js"
import adminRouter from "./routers/admin/admin.router.js"
import { notFound } from "./controllers/default.controller.js"
import sequelize from "./models/index.js"
import path from "path"

await sequelize.sync()

const hostname = "0.0.0.0";
const port = 3000;
const __dirname = path.resolve()    

const app = express()
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.set('view engine', 'ejs');
app.disable('view cache'); // for development

app.use('/api', apiRouter)
app.use('/admin', adminRouter)

app.all("*", notFound);
app.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
});
