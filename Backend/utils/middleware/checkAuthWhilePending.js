const jwt = require("jsonwebtoken");

const authenticateTokenWhilePending = (req, res, next) => {
    
    const tokenData = req.header("Authorization").split(" ");
    const token = tokenData[1];
    console.log(token);

    jwt.verify(token, res.locals.secrets.JWT_SECRET, (err, user) => {
        if (err) {
            res.sendStatus(401);
        } else {
            req.userId = user.userId;
            req.userStatus = user.userStatus;

            next();
        }
    });
};

module.exports = authenticateTokenWhilePending;
