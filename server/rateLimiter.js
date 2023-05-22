const { rateLimit } = require('express-rate-limit')

module.exports = {
    rateLimiter: () => {
        const implementRateLimiter = rateLimit({
            windowMs: 1 * 60 * 60 * 1000,
            max: 10,
            message: 'You have exceeded the rate limit for the hour',
            standardHeaders: true,
            legacyHeaders: false
        })
        return implementRateLimiter
    }

}