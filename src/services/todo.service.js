const {
  OK,
  CREATED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT,
  NOT_FOUND,
} = require("../shared/constants/http.codes.js");

const db = require("../config/mysql.config");

const { JoiValidator } = require("../shared/validators/todo/joi.validator");
const {
  addValidatorTodoJoiSchema,
} = require("../shared/validators/todo/add.validator.todo.joi.schema");
const {
  updateValidatorTodoJoiSchema,
} = require("../shared/validators/todo/update.validator.joi.schema");

class TodoService {
  constructor() {
    this.joiValidator = new JoiValidator();
  }

  get() {
    const todos = db.execQuery("select * from todo");
    return { statusCode: OK, data: todos };
  }

  getByNameAndDate({ name, date }) {
    const [todo] = db.execQuery(
      `select * from todo where lower(name) = '${name.toLowerCase()}' and date = '${date}'`
    );
    return { statusCode: OK, data: todo };
  }

  getById(id) {
    const [todo] = db.execQuery(`select * from todo where id = '${id}'`);
    return { statusCode: OK, data: todo };
  }

  add(body) {
    this.joiValidator.validate(addValidatorTodoJoiSchema, body);
    const todoFromDB = this.getByNameAndDate(body);
  
    if (todoFromDB.data) {
      throw { statusCode: BAD_REQUEST, error: `todo already exists` };
    }

    const result = db.execQuery(
      `insert into todo (name,date) values ('${body.name}', '${body.date}')`
    );

    const data =
      result?.affectedRows > 0 ? "todo inserted" : "todo was not inserted";

    return { statusCode: CREATED, data };
  }

  removeById(id) {
    const todoFromDB = this.getById(id);

    if (!todoFromDB.data) {
      throw { statusCode: BAD_REQUEST, error: `todo not found` };
    }

    db.execQuery(`delete from todo where id = ${id}`);
    return { statusCode: NO_CONTENT, data: undefined };
  }

  updateById(id, body) {
    this.joiValidator.validate(updateValidatorTodoJoiSchema, body);
    const todoFromDB = this.getById(id);

    if (!todoFromDB.data) {
      throw { statusCode: BAD_REQUEST, error: `todo not found`};
    }

    const mergedData = { ...todoFromDB.data, ...body };
    
    db.execQuery(
      `update todo set name = '${mergedData.name}',date = '${mergedData.date}' where id = ${id}`
    );
    return { statusCode: NO_CONTENT, data: "successfully updated" };
  }
}

module.exports = { TodoService };
