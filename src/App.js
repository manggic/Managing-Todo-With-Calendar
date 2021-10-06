import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import DateContainer from "./components/DateContainer";
import "./App.css";
import "./components/components.css";

import MonthHeading from "./components/MonthHeading";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { Badge, Space, Switch } from "antd";

import { Modal, Button, DatePicker, Checkbox } from "antd";
import "antd/dist/antd.css";
import { uuidv4 } from "./common/functions";
var moment = require("moment");
const App = () => {
  const [state, setState] = useState({
    currentStage: {},
    currentDate: { date: "", month: "", noOfDays: "" },
    isTaskModalVisible: false,
    dataToShowInModal: {},
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleDateContainer = () => {
    const d = new Date();
    const daysInCurrentMonth = new Date(
      d.getFullYear(),
      d.getMonth() + 1,
      0
    ).getDate();

    let Stage = {};
    const startOfMonthDate = moment().startOf("month").format("YYYY-MM-DD");
    const endOfMonthDate = moment().endOf("month").format("YYYY-MM-DD");
    let start = moment(moment(startOfMonthDate));
    let end = moment(moment(endOfMonthDate));

    //  LOOPING THROUGH THE DATE
    for (var m = start; m.diff(end, "days") <= 0; m.add(1, "days")) {
      Stage[m.format("YYYY-MM-DD")] = {
        allTask: [],
        taskToAdd: { id: "", taskName: "" },
        buttonToShow: "Add",
      };
    }

    setState({
      ...state,
      currentDate: {
        ...state.currentDate,
        date: d.toISOString().slice(0, 10),
        month: monthNames[d.getMonth()],
        noOfDays: daysInCurrentMonth,
      },
      currentStage: Stage,
    });
    // setCurrentStage(Stage);
  };

  useEffect(() => {
    handleDateContainer();
  }, []);

  // Modal for task - (START)
  const showTaskModal = (date) => {
    if (state.currentStage[date]) {
      // setDefaultValues(
      //   Object.keys(state.currentStage[date]).filter(
      //     (task) => state.currentStage[date][task]
      //   )
      // );
    }

    // setCurrentDate({ ...currentDate, date: date });
    // defaultValues = Object.keys(taskOfDate).filter((task) => taskOfDate[task]);

    setState({
      ...state,
      dataToShowInModal: { date, ...state.currentStage[date] },
      currentDate: { ...state.currentDate, date },
      isTaskModalVisible: true,
    });
  };

  const handleTaskCancel = () => {
    setState({
      ...state,
      currentStage: {
        ...state.currentStage,
        [state.dataToShowInModal.date]: state.dataToShowInModal,
      },
      isTaskModalVisible: false,
    });
  };
  function onTaskChange(e) {
    //

    let newTaskObj = {};
    Object.keys(state.currentStage[state.currentDate.date]).map((task) => {
      if (e.includes(task)) {
        newTaskObj[task] = true;
      } else {
        newTaskObj[task] = false;
      }
    });

    // setCurrentStage({ ...currentStage, [currentDate.date]: newTaskObj });
  }
  // Modal for task - (END)

  const changeTheSelect = (selected, id) => {
    //

    let newTask = state.dataToShowInModal.allTask.map((task) => {
      if (task.id === id) {
        return { ...task, status: selected };
      } else {
        return task;
      }
    });

    setState({
      ...state,
      dataToShowInModal: { ...state.dataToShowInModal, allTask: newTask },
    });
  };
  const menu = (task) => {
    return (
      <Menu>
        <Menu.Item>
          <a onClick={() => changeTheSelect("Todo", task.id)}>Todo</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={() => changeTheSelect("In-progress", task.id)}>
            In progress
          </a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={() => changeTheSelect("Done", task.id)}>Done</a>
        </Menu.Item>
      </Menu>
    );
  };

  const handleIconDelete = (id) => {
    setState({
      ...state,
      dataToShowInModal: {
        ...state.dataToShowInModal,
        allTask: state.dataToShowInModal.allTask.filter(
          (task) => task.id !== id
        ),
      },
    });
  };

  const handleIconEdit = (id) => {
    let task = state.dataToShowInModal.allTask.filter((task) => task.id === id);

    setState({
      ...state,

      dataToShowInModal: {
        ...state.dataToShowInModal,
        taskToAdd: { id: id, taskName: task[0].taskName },
        buttonToShow: "Edit",
      },
    });
  };

  const Task = ({ task }) => {
    return (
      <div className="task">
        <div>{task.taskName}</div>
        <div className="actions">
          <div className="badge paddingLeft">
            <Badge
              className="site-badge-count-109"
              count={task.status}
              style={{ backgroundColor: "#52c41a" }}
            />
          </div>
          <div className="statusDropdown paddingLeft">
            <Dropdown overlay={() => menu(task)}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
                style={{ color: "black" }}
              >
                status
                <DownOutlined />
              </a>
            </Dropdown>{" "}
          </div>
          <div
            onClick={() => handleIconEdit(task.id)}
            className="editIcon paddingLeft"
          >
            <MdModeEditOutline />
          </div>
          <div
            onClick={() => handleIconDelete(task.id)}
            className="deleteIcon paddingLeft"
          >
            <AiFillDelete />
          </div>
        </div>
      </div>
    );
  };

  const listing = () => {
    return (
      <div className="listing">
        {state?.dataToShowInModal?.allTask?.map((task) => {
          return <Task task={task} />;
        })}
        <div className="addInput">
          <input
            type="text"
            value={state?.dataToShowInModal?.taskToAdd?.taskName}
            onChange={(e) =>
              setState({
                ...state,
                dataToShowInModal: {
                  ...state.dataToShowInModal,
                  taskToAdd: {
                    ...state.dataToShowInModal.taskToAdd,
                    taskName: e.target.value,
                  },
                },
              })
            }
            placeholder="Enter task"
          />

          {state.dataToShowInModal.buttonToShow === "Add" && (
            <Button onClick={addTask} type="primary">
              Add
            </Button>
          )}
          {state.dataToShowInModal.buttonToShow === "Edit" && (
            <Button onClick={editTask} type="primary">
              Edit
            </Button>
          )}
        </div>
      </div>
    );
  };

  const addTask = () => {
    if (state.dataToShowInModal.taskToAdd.taskName) {
      setState({
        ...state,

        dataToShowInModal: {
          ...state.dataToShowInModal,

          allTask: [
            ...state.dataToShowInModal.allTask,
            {
              id: uuidv4(),
              taskName: state.dataToShowInModal.taskToAdd.taskName,
              status: "Todo",
            },
          ],
          taskToAdd: { id: "", taskName: "" },
        },
      });
    }
  };

  const editTask = () => {
    let newTask = state.dataToShowInModal.allTask.map((task) => {
      if (task.id === state.dataToShowInModal.taskToAdd.id) {
        return {
          ...task,
          taskName: state.dataToShowInModal.taskToAdd.taskName,
        };
      } else {
        return task;
      }
    });

    setState({
      ...state,
      dataToShowInModal: {
        ...state.dataToShowInModal,
        allTask: newTask,
        taskToAdd: { id: "", taskName: "" },

        buttonToShow: "Add",
      },
    });
  };
  const taskModal = () => {
    return (
      <Modal
        title="ToDo"
        visible={state.isTaskModalVisible}
        // onOk={handleTaskOk}
        onCancel={handleTaskCancel}
        footer={[
          <Button key="back" onClick={handleTaskCancel}>
            Cancel
          </Button>,
        ]}
        width={650}
      >
        {listing()}
      </Modal>
    );
  };

  return (
    <div>
      <div className="header">
        <MonthHeading month={state.currentDate.month} />
      </div>
      <div className="body">
        {Object.keys(state.currentStage).map((date) => {
          return (
            <DateContainer
              showTaskModal={() => showTaskModal(date)}
              date={date}
            />
          );
        })}
      </div>
      {taskModal()}
    </div>
  );
};

export default App;
