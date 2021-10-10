import React from "react";

import "../styles/MonthHeading.css";
function MonthHeading({ month }) {
  return (
    <div className="monthHeading">
      <div>{month}</div>
    </div>
  );
}

export default MonthHeading;
