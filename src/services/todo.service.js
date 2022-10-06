const {
    OK,
    CREATED,
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    NO_CONTENT,
    NOT_FOUND,
} = require("../shared/constants/http.codes")

const db = require("../config/mysql.config")

const { JoiValidator } = require("../shared/validators/todo/joi.validator")
const { addValidatorTodoJoiSchema } = require("../shared/validators/todo/add.validator.todo.joi.schema")

class TodoService {
    constructor(){
        this.joiValidator = new JoiValidator()
    }

    get(){
        const todos = db.execQuery("select * from todo")
        return { statusCode: OK, data: todos }
    }
}

module.exports = { TodoService }