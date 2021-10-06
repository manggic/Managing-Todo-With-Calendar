import React from "react";
import "../styles/DateContainer.css";
function DateContainer({ date, showTaskModal }) {
  return (
    <div onClick={showTaskModal} className="DateContainer">
      <h1 style={{ fontSize: "20px" }}>{date}</h1>
    </div>
  );
}

export default DateContainer;
