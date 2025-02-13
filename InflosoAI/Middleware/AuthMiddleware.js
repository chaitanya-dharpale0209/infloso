module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'ACCESS DENIED: No token available' });

    try {
        const secret = process.env.JWT_SECRET;
        const tokenValue = token.split(' ')[1];
        if (!tokenValue) return res.status(500).json({ message: 'Malformed token' });

        const verified = jwt.verify(tokenValue, secret);
        req.user = verified;

        // Check if user is verified
        if (!req.user.verified) {
            return res.status(403).json({ message: "Email not verified. Please verify your email first." });
        }

        next();
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

