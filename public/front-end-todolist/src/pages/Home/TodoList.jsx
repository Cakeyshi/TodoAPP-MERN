import React, { useState, useEffect } from "react";
import Lists from "./Lists";
import { useNavigate } from "react-router-dom";

function TodoList({ filter }) {
  const [todoData, setTodoData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/todo/")
      .then((response) => response.json())
      .then((data) => {
        setTodoData(data);
      })
      .catch((error) => {
        console.error("Error fetching todo data:", error);
      });
  }, []);

  const noTasksStyles = {
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleDelete = (id) => {
    setTodoData(todoData.filter((todo) => todo._id !== id));
  };

  const handleEditClick = (id) => {
    navigate(`/update/${id}`);
  };

  // Filter the todo items based on the selected filter
  const filteredTodoData = todoData.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "finished") return todo.isDone;
    if (filter === "pending") return !todo.isDone;
  });

  return (
    <ul className="list-group" style={{ width: "100%", height: "100%" }}>
      {filteredTodoData.length === 0 ? (
        <h2 style={noTasksStyles}>There are no tasks for today</h2>
      ) : (
        filteredTodoData.map((list) => (
          <Lists
            key={list._id}
            title={list.title}
            body={list.body}
            id={list._id}
            onDelete={handleDelete}
            onEdit={handleEditClick}
          />
        ))
      )}
    </ul>
  );
}

export default TodoList;
