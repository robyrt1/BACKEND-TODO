const defautJoi = require("@hapi/joi");
const joiDate = require("@joi/date");
const joi = defautJoi.extend(joiDate);

const addValidatorTodoJoiSchema = joi.object().keys({
    name: joi.strinG().required(),
    date: joiDate.date().format("YYYY-MM-DD HH:MN:SS").required()
})

module.exports = { addValidatorTodoJoiSchema };