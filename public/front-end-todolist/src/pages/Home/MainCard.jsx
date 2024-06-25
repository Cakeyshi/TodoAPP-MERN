import ListCard from "./ListCard";
import Create from "./Create";
import Navigation from "./Navigation";

function MainCard(props) {
  const mainCardStyles = {
    height: "95vh",
    width: "60vw",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "1px 4px 8px rgba(255, 255, 255, 0.1)",
  };
  return (
    <>
      <div className="card" style={mainCardStyles}>
        <div className="card-header">
          <h5 className="card-title">Todo App</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">by mash</h6>
          <Navigation />
        </div>
      </div>
      <Create />
    </>
  );
}

export default MainCard;
