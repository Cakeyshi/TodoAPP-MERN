import icon from "/Users/zach/Documents/leetcode/Todo App/public/front-end-todolist/src/assets/add-button.svg";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/view');
  }
  const btnStyle = {
    width: "50px",
    height: "50px",
    transform: "translate(-33rem, 18.3rem)",
  };
  return (
      <button className="btn btn-outline-primary" style={btnStyle} onClick={handleCreate}>
        <img
          src={icon}
          alt="Add List"
          style={{ width: "50px", height: "50px", transform: "translate(-12px, -6.5px)"}}
        />
      </button>
  );
}

export default Create;
