import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import apiRouter from "./routers/api/api.router.js"
import adminRouter from "./routers/admin/admin.router.js"
import authRouter from "./routers/auth/auth.router.js"
import { notFound } from "./controllers/default.controller.js"
import sequelize from "./models/index.js"
import path from "path"
import session from "express-session"
import { flash } from "express-flash-message"
import redis from 'redis'
import ConnectRedis from 'connect-redis'

await sequelize.sync()

const hostname = "0.0.0.0";
const port = 3000;
const __dirname = path.resolve()

const app = express()
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const RedisStore = ConnectRedis(session)
const redisClient = redis.createClient('redis://cache')
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new RedisStore({
        client: redisClient,
        ttl: 260,
    }),
    resave: false,
    saveUninitialized: false,
}));
app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}))
app.set('view engine', 'ejs');
app.disable('view cache'); // for development

app.use(function(req, res, next) {
    res.locals.currentUser = req.session.user;
    next();
});

app.use('/api', apiRouter)
app.use('/admin', adminRouter)
app.use('/', authRouter)

app.all("*", notFound);
app.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
});
