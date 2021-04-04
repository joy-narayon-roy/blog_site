const {
    body
} = require("express-validator");

module.exports = [
    body('postTittle').not().isEmpty().withMessage('Please Input The Post Tittle').trim(),
    body('postBody').not().isEmpty().withMessage('Please Write Something').trim(),
    body('postTages').not().isEmpty().withMessage('Enter Some Tages !')
]