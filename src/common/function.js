import { v4 as uuidv4 } from "uuid";
import * as Bootstrap from "react-icons/bs";
import * as FontAwesome from "react-icons/fa";
import * as AntDesign from "react-icons/ai";
import * as Feather from "react-icons/fi";
import * as MaterialDesign from "react-icons/md";
import { useLocation } from "react-router-dom";
const getIcon = (iconName) => {
  console.log("iconName", iconName);
  let IconName = "";
  switch (iconName.slice(0, 2)) {
    case "Fa":
      IconName = FontAwesome[iconName];
      break;
    case "Ai":
      IconName = AntDesign[iconName];
      break;
    case "Bs":
      IconName = Bootstrap[iconName];
      break;
    case "Fi":
      IconName = Feather[iconName];
      break;
    case "Md":
      IconName = MaterialDesign[iconName];
      break;

    default:
      break;
  }

  return IconName;
};

const GetRoute = () => {
  return useLocation().pathname;
};

export { uuidv4, GetRoute, getIcon };
