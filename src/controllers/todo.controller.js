const { TodoService } = require("../services/todo.service");

class TodoController {
    constructor() {
        this.todoService = new TodoService();
    }

    get(req, res, next) {
        const result = this.todoService.get();
        res.status(result.statusCode).json(result);
    }

    add(req, res, next) {
        const result = this.todoService.add(req.body);
        res.status(result.statusCode).json(result); 
    }

    removeById(req, res, next) {
        const result = this.todoService.removeById(req.params.id);
        res.status(result.statusCode).json(result); 
    }

    updateById(req, res, next){
        const result = this.todoService.updateById(req.params.id,req.body)
        result.status(result.statusCode).json(result);
    }
}

module.exports = { TodoController };