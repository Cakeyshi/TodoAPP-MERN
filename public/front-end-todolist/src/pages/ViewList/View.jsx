import MainCard from "./MainCard";
import { useState } from "react";

function View() {
  const [ formData, setFormData ] = useState({});

  const handleFormSubmit = async (data) => {
    setFormData(data);
  };
  return <MainCard onSubmit={handleFormSubmit} />;
}

export default View;
