const {body} = require('express-validator')

const postValidation = [
    body('title', 'Введите заголовок статьи').isLength({min:1}).isString(),
    body('description', 'Введите описание статьи').isLength({min:1}),
    body('tags', 'Неправильный формат тэгов').optional().isString(),
    body('imageUrl', 'Неверная ссылка на картинку').optional().isString()
]

module.exports = {postValidation}