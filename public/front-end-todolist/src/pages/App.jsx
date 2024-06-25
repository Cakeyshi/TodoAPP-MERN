import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainCard from "./Home/MainCard"
import View from "./ViewList/View";
import UpdateForm from "./Home/UpdateForm";

function App() {
  return (
    <Router>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Routes>
          <Route path="/" element={<MainCard/>} />
          <Route path="/view" element={<View/>} />
          <Route path="/update/:id" element={<UpdateForm/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
