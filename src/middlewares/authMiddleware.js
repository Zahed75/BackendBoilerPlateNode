var jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    let Token = req.headers['authorization']?.split(' ')[1]; // Assuming 'Authorization' header

    jwt.verify(Token, "SecretKey12345", function (err, decoded) {
        if (err) {
           res.status(401).json({ status: "UnAuthorized" });
        } else {
            console.log("Decoded Token:", decoded); // Log decoded data for debugging

            let email = decoded.email;
            let role = decoded.role;

            req.email = email; // Set email directly on req
            req.role = role; // Set role directly on req
            next();
        }
    });
};

