import React, { useState } from "react";
import ListCard from "./ListCard";

function Navigation() {
  const [filter, setFilter] = useState("all");

  return (
    <>
      <ul className="nav nav-tabs card-header-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${filter === "all" ? "active" : ""}`}
            href="#"
            onClick={() => setFilter("all")}
          >
            All
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${filter === "finished" ? "active" : ""}`}
            href="#"
            onClick={() => setFilter("finished")}
          >
            Finished
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${filter === "pending" ? "active" : ""}`}
            href="#"
            onClick={() => setFilter("pending")}
          >
            Pending
          </a>
        </li>
      </ul>
      <ListCard filter={filter} />
    </>
  );
}

export default Navigation;
