import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import userRouter from "./routers/user.router.js"
import paymentRouter from "./routers/payment.router.js"
import searchRouter from "./routers/search.router.js"
import adminRouter from "./routers/admin.router.js"
import tagRouter from "./routers/tag.router.js"
import { notFound } from "./controllers/default.controller.js"
import path from "path"

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

app.use('/api', userRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/search', searchRouter)
app.use('/admin', adminRouter)
app.use('/admin/tag', tagRouter)

app.all("*", notFound);
app.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
});
