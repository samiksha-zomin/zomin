const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if(!accessToken) return res.json({error: "Cannot Access"});

    try {
        const validToken = verify(accessToken, process.env.SESSION_CODE);
        req.user = validToken;

        if (validToken) {
            return next();
        }
    } catch (err){
        return res.json({error: err});
    }
    
};

module.exports = { validateToken };