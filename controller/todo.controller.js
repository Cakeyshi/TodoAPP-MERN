import Todo from "../model/todo.model.js";

//@desc load react HTML
//@route GET *
export const loadReact = (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "public", "front-end-todolist", "index.html")
  );
};

//@desc get all todo lists
//@route GET /api/todo
export const getTodoLists = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

//@desc get a todo list through id
//@route GET /api/todo/:id
export const getTodoList = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) res.status(400).json({ msg: "not found" });
    res.status(200).json(todo);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

//@desc get a todo list through title
//@route GET /api/todo/title/:title
export const getTodoListByTitle = async (req, res, next) => {
  try {
    const title = req.params.title;
    const todo = await Todo.find({ title: new RegExp(title, "i") });
    if (todo.length === 0) {
      const error = new Error(`Request with id: ${id} not found`);
      error.status = 404;
      return next(error);
    }
    res.status(200).json(todo);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

//@desc post a todo list
//@route POST /api/todo
export const postTodoList = async (req, res, next) => {
  try {
    const todoList = await Todo.create(req.body);
    res.status(200).json(todoList);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

//@desc update a todo list
//@route PUT /api/todo/:id
export const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!todo) {
      const error = new Error(`Request with id: ${id} not found`);
      error.status = 404;
      return next(error);
    }

    res.status(200).json(todo);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

//@desc delete a todo list
//@route DELETE /api/todo/:id
export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      const error = new Error(`Request with id: ${id} not found`);
      error.status = 404;
      return next(error);
    }

    res.status(200).json(todo);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

//@desc delete all todo list
//@route DELETE /api/todo/:id
export const deleteAllTodo = async (req, res, next) => {
  try {
    const todo = await Todo.deleteMany();
    res.status(200).json({ msg: `${todo.deletedCount} documents deleted` });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};
