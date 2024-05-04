const {body} = require('express-validator')

const authValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен состоять минимум из 5-символов').isLength({min:5}),
    ]
const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен состоять минимум из 5-символов').isLength({min:5}),
]

module.exports = {authValidation, loginValidation}
