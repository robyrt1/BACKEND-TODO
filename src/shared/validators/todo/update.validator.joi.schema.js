const defautJoi = require("@hapi/joi");
const joiDate = require("@joi/date");
const joi = defautJoi.extend(joiDate);

const updateValidatorTodoJoiSchema = joi.object().keys({
    name: joi.string().optional(),
    date: joi.date().format("YYYY-MM-DD HH:mm:ss").optional()
})

module.exports = { updateValidatorTodoJoiSchema };