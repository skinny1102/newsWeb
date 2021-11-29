module.exports = (req, res, next) => {
    {
        if (req.session.isAuth === null) {
            req.session.isAuth = false;
        } else {
            res.locals.lcisAuth = req.session.isAuth;
            res.locals.lcUser = req.session.User;
        }
    }
    {
        if (req.session.isAuthAdmin === null) {
            req.session.isAuthAdmin = false;
        } else {
            res.locals.lcAdmin = req.session.isAuthAdmin;
            res.locals.lcAdminUser = req.session.UserAdmin;
        }
    }

    next();
};
