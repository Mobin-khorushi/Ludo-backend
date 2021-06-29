const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyparser = require('body-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

dotenv.config();
const app = express();

const socket = require('socket.io');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(cors());
/** Static files */
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/js', express.static(__dirname + 'public/js'));

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));
/** Template Engine */
app.set('views', './src/views');
app.set('view engine', 'ejs');


/** Routs */
const { loginRouter, logoutRouter } = require('./src/routes/login');
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
//app.use('/user/login', loginRouterP);

const dashRouter = require('./src/routes/dashbourd');
app.use('/dashbourd', dashRouter);

const userRouter = require('./src/routes/user');
app.use('/dashbourd/user', userRouter);

const adminRouter = require('./src/routes/admin');
app.use('/dashbourd/admin', adminRouter);

const statRouter = require('./src/routes/static');
app.use('/dashbourd/stats', statRouter);

const apiRouter = require('./src/routes/api');
app.use('/api', apiRouter);
/** App start */

const server = app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`);
});
const io = socket(server);
io.on("connection", function(socket) {
    console.log("Made socket connection");
});