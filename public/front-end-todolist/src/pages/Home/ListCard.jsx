import React from "react";
import TodoList from "./TodoList";

function ListCard(props) {
  return (
    <div
      className="card-body"
      style={{
        margin: "auto",
        width: "60rem",
        height: "30rem", // fixed height to enable scrolling
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto", // vertical scrolling
        overflowX: "hidden", // hide horizontal scrollbar if not needed
        border: "1px solid #ccc",
        transform: "translate(-16px, 10px)",
      }}
    >
      <TodoList filter={props.filter} />
    </div>
  );
}

export default ListCard;
