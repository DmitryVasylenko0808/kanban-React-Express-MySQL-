import React from "react";
import Task from "./Task.jsx";
import { useDispatch } from "react-redux";
import { openForm } from "../../redux/slices/formsSlice.js";

const Column = ({ title, tasks }) => {
    const dispatch = useDispatch();

    const openTaskView = () => {
        dispatch(openForm({form: "taskView", variant: "add"}));
    }

    return (
        <div className="column">
            <div className="column-box">
                <div className="column-box__circle"></div>
                {title} (3)
            </div>

            <Task
                title="Task N"
                subtasks={3}
                completed={1}
                onView={openTaskView}
            />
            <Task
                title="Task N"
                subtasks={3}
                completed={1}
                onView={openTaskView}
            />
            <Task
                title="Task N"
                subtasks={3}
                completed={1}
                onView={openTaskView}
            />
        </div>
    );
}

export default Column;