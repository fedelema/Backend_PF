const { Router } = require('express');
const router = new Router();
const passport = require('passport');
const path = require('path');
const { authMiddleware } = require('../auth/index');
const { carritosDao }  = require('../src/daos/indexDaos');
const carritos = carritosDao;

router.get("/", (req, res) => {
    res.redirect("/home");
});

router.post("/signup", passport.authenticate("signup", {
    failureRedirect: "/signup",
    }) , (req, res) => {  
        req.session.user = req.user;
        const comprador = req.user.username;
        const nuevoCarrito = {
            timestamp_carrito: Date.now(),
            comprador: comprador,
            productos: []
        }
        let nuevoId = carritos.save(nuevoCarrito);
    
        res.redirect("/home");
    }
);

router.post("/login", passport.authenticate("login", {
    failureRedirect: "/login",
    }) ,(req, res) => {
        req.session.user = req.user;
        res.redirect('/home');
    }
);

router.get("/login", (req, res) => {
    res.sendFile(path.resolve('public/login.html'));
});

router.get("/signup", (req, res) => {
    res.sendFile(path.resolve('public/signup.html'));
});

router.get("/home", authMiddleware, (req, res) => {
    res.render(path.resolve('public/index.ejs'), { user: req.session.user });
});

router.get("/logout", authMiddleware, (req, res) => {
    const user = req.session.user;
    req.session.destroy();
    res.render(path.resolve('public/logout.ejs'), { user });
});

module.exports = router;