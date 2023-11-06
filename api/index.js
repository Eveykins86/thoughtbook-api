const router = require('express').Router();

const userRoutes = require('./userRoutes')
const thoughtRoutes = require('./thoughtRoutes')

router.use('/api/user/', userRoutes)
router.use('/api/thought/', thoughtRoutes)

module.exports = router