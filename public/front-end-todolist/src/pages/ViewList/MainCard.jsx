import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainCard({ onSubmit }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [warning, setWarning] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Optional: Log the form data
    setWarning(false);

    //make sure form has content
    if (formData.body === "" && formData.title === "") {
      setWarning(true);
      return;
    }
    try {
      // Send the form data to the API endpoint
      const response = await fetch("http://localhost:8080/api/todo/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Notify the parent component about the form submission
      onSubmit(formData);

      //Navigate after
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    setFormData({
      title: "",
      body: "",
    });
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
    <>
      <div className="card" style={mainCardStyles}>
        <div className="card-body">
          <h5 className="card-title">New Task</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">😀</h6>
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
                value={formData.title}
                onChange={handleChange}
                style={titleStyles}
              />
            </div>
            {warning && (
              <div
                class="alert alert-warning alert-dismissible fade show"
                role="alert"
                style={warningStyle}
              >
                <strong>Holy guacamole!</strong> You should check in on some of
                those fields below.
                <button
                  type="button"
                  class="btn-close"
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
                value={formData.body}
                onChange={handleChange}
                rows="3"
                placeholder="Body"
                style={bodyStyles}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <a href="/">
            <button
              type="submit"
              className="btn btn-light"
              style={cancelStyles}
            >
              Cancel
            </button>
          </a>
        </div>
      </div>
    </>
  );
}

export default MainCard;
