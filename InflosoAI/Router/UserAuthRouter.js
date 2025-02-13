const express = require(`express`)
const router = express.Router();
const {register, verifyEmail, login, requestPasswordReset, resetPassword} = require(`../Controller/AuthUserController`)
const {loginLimiter, registerLimiter} = require('../Config/rateLimitConfig')


router.post('/register', registerLimiter, register)
router.get('/verify-email/:token', verifyEmail); 
router.post('/login', loginLimiter, login)
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);
module.exports = router;