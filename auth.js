const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('token');
    if (!token) return res.json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = verified;
        next();
    } catch (err) {
        res.status(200).json({ message: 'Invalid Token' });
    }
}