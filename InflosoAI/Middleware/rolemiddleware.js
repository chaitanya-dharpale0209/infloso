module.exports = (...allowedRoles) => {
    return (req, res, next) => {
        console.log('Allowed Roles:', allowedRoles); 
        console.log('User Role from req.user:', req.user?.role); 

        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'access denied. unauthorized roles',
            });
        }
        next();
    };
};
