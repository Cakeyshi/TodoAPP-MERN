import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Checklist from "./Checklist";
import Delete from "./Delete";
import icon from "/Users/zach/Documents/leetcode/Todo App/public/front-end-todolist/src/assets/update.svg";
import { useNavigate } from "react-router-dom";

function Lists(props) {
  const { id, title, body, onEdit, onDelete } = props;
  const [isChecked, setCheck] = useState(false);
  const [isDone, setDone] = useState(false);
  const navigate = useNavigate();

  // Fetch todo data on mount
  useEffect(() => {
    fetch(`http://localhost:8080/api/todo/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setDone(data.isDone);
        setCheck(data.isDone);
      })
      .catch((error) => {
        console.error("Error fetching todo data:", error);
      });
  }, [id]);

  // Handle checkbox change
  const handleCheck = () => {
    const newIsChecked = !isChecked;
    setCheck(newIsChecked);

    fetch(`http://localhost:8080/api/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isDone: newIsChecked }),
    })
      .then((response) => response.json())
      .then(() => {
        // Handle any further actions if necessary
      })
      .catch((error) => {
        console.error("Error updating todo data:", error);
      });
  };

  // Styles
  const listStyles = {
    height: "5em",
  };

  const labelStyles = {
    fontSize: "20px",
    fontWeight: "bold",
    paddingLeft: "20px",
    textDecorationLine: isChecked ? "line-through" : "",
    color: isChecked ? "gray" : "white",
  };

  const pStyles = {
    color: isChecked ? "gray" : "white",
  };

  const btnStyle = {
    width: "50px",
    height: "50px",
    position: "relative",
    transform: "translate(700px, -65px)",
  };

  // Format body text
  const formattedBody = body.length > 40 ? `${body.slice(0, 40)}...` : body;

  return (
    <li className="list-group-item" style={listStyles} key={id} id={id}>
      <Checklist checked={isChecked} onChange={handleCheck} />
      <label style={labelStyles}>{title}</label>
      <p style={pStyles}>{formattedBody}</p>
      <button
        className="btn btn-outline-primary"
        style={btnStyle}
        onClick={() => onEdit(id)}
      >
        <img
          src={icon}
          alt="Add List"
          style={{
            width: "40px",
            height: "40px",
            transform: "translate(-8px, -2px)",
          }}
        />
      </button>
      <Delete id={id} onDelete={onDelete} />
    </li>
  );
}

Lists.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Lists;
