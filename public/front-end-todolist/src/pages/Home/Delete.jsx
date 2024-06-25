import { useState } from "react";
import icon from "/Users/zach/Documents/leetcode/Todo App/public/front-end-todolist/src/assets/trash-can.svg";

function Delete({ id, onDelete }) {
  const [isDelete, setIsDelete] = useState(false);

  const deleteItem = async (id) => {
    setIsDelete(true);
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/todo/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting item", errorData);
      } else {
        onDelete(id);
      }
    } catch (e) {
      console.error("error deleting item", e);
    }
  };
  return (
    <button
      className="btn btn-outline-danger"
      style={{
        width: "50px",
        height: "50px",
        position: "relative",
        transform: "translate(750px, -65px)",
      }}
      onClick={() => deleteItem(id)}
      disabled={isDelete}
    >
      <img src={icon} alt="" style={{width: "40px", height: "40px", transform: "translate(-8px, -2px)"}}/>
    </button>
  );
}

export default Delete;
