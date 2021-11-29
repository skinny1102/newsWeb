module.exports = (req, res, next) => {
    if (req.session.isAuth==true) {
        next();     
    } else {
        return res.redirect(`/admin`);
    }
};
