function authMiddleware (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect("/login");
    } else {
        next();
    }
};

module.exports = {
    authMiddleware
}