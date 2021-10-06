import { getIcon } from "./function";
import loginSvg from "images/login.svg";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./style.css";
const LogoutSection = () => {
  const history = useHistory();
  const Logout = () => {
    history().push("/signin");
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={() => history.push("/signin")}>Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="logoutSection">
      <div className="userIcon">
        <FaUserCircle />
      </div>

      <div className="logoutDropdown">
        <Dropdown overlay={menu}>
          <a
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
            style={{ color: "black" }}
          >
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export { LogoutSection };
