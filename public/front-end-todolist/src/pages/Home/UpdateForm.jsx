import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateForm({ onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/todo/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.title && !data.body) {
          setWarning(true);
          return;
        }
        setTitle(data.title);
        setBody(data.body);
      })
      .catch((error) => {
        console.error("Error fetching todo data:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) {
      setWarning(true);
      return;
    }
    fetch(`http://localhost:8080/api/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating todo data:", error);
      });
  };

  const handleCancel = () => {
    navigate("/");
  };

  const mainCardStyles = {
    height: "95vh",
    width: "60vw",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "1px 4px 8px rgba(255, 255, 255, 0.1)",
  };

  const titleStyles = {
    height: "70px",
    marginBottom: "50px",
  };

  const bodyStyles = {
    height: "20rem",
    marginBottom: "50px",
  };

  const cancelStyles = {
    transform: "translate(100px, -37px)",
  };

  const warningStyle = {
    transform: "translate(60rem, -12rem)",
    width: "280px",
    height: "150px",
    position: "fixed",
  };

  return (
    <div className="card" style={mainCardStyles}>
      <div className="card-body">
        <h5 className="card-title">Update Task</h5>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              id="title"
              type="text"
              name="title"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Title"
              style={titleStyles}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {warning && (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
              style={warningStyle}
            >
              <strong>Warning!</strong> Please fill in all fields.
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          <div className="input-group input-group-lg">
            <textarea
              id="body"
              className="form-control"
              name="body"
              rows="3"
              placeholder="Body"
              style={bodyStyles}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <button
          className="btn btn-light"
          style={cancelStyles}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default UpdateForm;
