const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const config = require('./config.js');
const User = require('./schema/user.schema');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { comparePassword, hashPassword } = require('./utils/password');
const { mongoose, Types } = require('mongoose');
const path = require('path');
// const { authMiddleware } = require('./auth/index');
const logger = require('./logger/logger_config');
const mailRegistro = require('./notifications/mail-admin');

const routerProductos = require('./routes/productos');
const routerCarritos = require('./routes/carritos');
const routerSession = require('./routes/user');

const connect = async () => {
    await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);
};
connect();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

passport.use("login", new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    const passHash = user.password;
    if (!user || !comparePassword(password, passHash)) {
        return done(null, null, { message: "Invalid username or password" });
    }
    return done(null, user);
}));
passport.use("signup", new LocalStrategy({
    passReqToCallback: true
    }, async (req, username, password, done) => {
    const { nombre, direccion, edad, interno, telefono } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        return done(new Error("User already exists."), null);
    }
    const hashedPassword = hashPassword(password);
    const newUser = new User({ username, password: hashedPassword , nombre, direccion, edad, interno, telefono });
    mailRegistro(username, password, nombre, direccion, edad, interno, telefono);
    await newUser.save();
    return done(null, newUser);
}));
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
    id = Types.ObjectId(id);
    const user = await User.findById(id);
    done(null, user);
});

app.use(session({
    store: new MongoStore({
        mongoUrl: config.mongodb.cnxStr,
        retries: 0,
        ttl: 60 * 60 * 24
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routerSession);
app.use('/api/productos', routerProductos);
app.use('/api/carritos', routerCarritos);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('*', (req, res) => {
    logger.log('warn', `Ruta no encontrada ${req.url}`);
    res.status(400).send(`Ruta no encontrada ${req.url}`);
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
});

server.on('error', error => logger.log('error',`Ocurrio un error al iniciar el servidor ${error}`));