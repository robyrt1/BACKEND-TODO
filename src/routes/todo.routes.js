const { TodoController} = require("../controllers/todo.controller");
const todoController = new TodoController();
const todoRoutes = (app) => {
    app.get("/todo", function(req, res , next){
        todoController.get(req, res , next);
    });

    app.post("/todo", function(req, res, next){
        todoController.add(req, res, next);
    })

    app.delete("/todo/:id", function(req, res, next){
        todoController.removeById(req, res, next);
    })

    app.put("/todo/:id", function(req, res, next){
        todoController.updateById(req, res, next);
    })
};
module.exports = {todoRoutes};