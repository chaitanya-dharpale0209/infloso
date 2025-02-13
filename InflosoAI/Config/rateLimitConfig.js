const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5,
    message: { message: "Too many login attempts, please try again later." }
});

const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 3, 
    message: { message: "Too many registration attempts, please try again later." }
});


module.exports = {
    loginLimiter,
    registerLimiter
};
