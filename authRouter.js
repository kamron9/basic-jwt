const {Router} = require('express')
const AuthController = require('./authController')
const {check} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')




const router = new Router()

router.post('/register',[
    check('username','username cannot be empty').notEmpty(),
    check('password', 'password shoud min 4 max 10 symbol').isLength({min:4,max:10})
],AuthController.register)
router.post('/login', AuthController.login)
router.get('/users',roleMiddleware(['ADMIN']), AuthController.getUser)

module.exports = router