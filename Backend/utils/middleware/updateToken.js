const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");

const updateToken = (req, res, next) => {
    const token = req.session.token;
    console.log("req-token before:",req.session.token);
    jwt.verify(token, res.locals.secrets.JWT_SECRET, (err, user) => {
        console.log("from auth:",user);
        if (err) {
            res.sendStatus(401);
        } else {
            export const updatedUser = await User.findById(user.userId);
            next();
        }  
    });
    const token = jwt.sign(
        {
            userId: updatedUser._id,
            userRole: updatedUser.role,
            userStatus: updatedUser.status,
        },
        res.locals.secrets.JWT_SECRET,
        {
            expiresIn: 60 * 60 * 24 * 14,
        }
    );
    req.session.token = token;
    console.log("req-token after:",req.session.token);
};

module.exports = updateToken;
