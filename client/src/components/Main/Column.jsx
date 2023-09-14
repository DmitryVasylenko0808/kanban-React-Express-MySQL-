import React from "react";
import Task from "./Task.jsx";
import { useDispatch, useSelector } from "react-redux";
import { openForm } from "../../redux/slices/formsSlice.js";
import { useNavigate } from "react-router";

const Column = ({ boardId, title, tasks }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);

    const openTaskView = (id) => {
        if (!user) {
            alert('You are not authorized. Log in to add/edit board');
            navigate('/auth/login');
        } else {
            dispatch(openForm({ 
                form: "taskView", 
                variant: "add",
                boardId, 
                taskId: id 
            }));
        }
    }

    return (
        <div className="column">
            <div className="column-box">
                <div className="column-box__circle"></div>
                {title} ({tasks.length})
            </div>
            {tasks.map(task =>
                <Task
                    title={task.task_title}
                    subtasks={task.subtasks}
                    completed={task.subtasks_completed}
                    onView={() => openTaskView(task.id)}
                    key={task.id}
                />
            )}
        </div>
    );
}

export default Column;