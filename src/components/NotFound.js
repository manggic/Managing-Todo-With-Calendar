import React from "react";
import "../styles/NotFound.css";
import { Button } from "antd";

import { useHistory } from "react-router-dom";

function NotFound() {
  const history = useHistory();
  return (
    <div className="notFound">
      <Button type="primary" onClick={() => history.push("/")}>
        Home
      </Button>
    </div>
  );
}

export default NotFound;
