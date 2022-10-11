const defautJoi = require("@hapi/joi");
const joiDate = require("@joi/date");
const joi = defautJoi.extend(joiDate);

const addValidatorTodoJoiSchema = joi.object().keys({
    name: joi.string().required(),
    date: joi.date().format("YYYY-MM-DD HH:mm:ss").required()
})

module.exports = { addValidatorTodoJoiSchema };