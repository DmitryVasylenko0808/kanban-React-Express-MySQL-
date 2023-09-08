import React from "react";
import Task from "./Task.jsx";
import { useDispatch } from "react-redux";
import { openForm } from "../../redux/slices/formsSlice.js";

const Column = ({ boardId, title, tasks }) => {
    const dispatch = useDispatch();

    const openTaskView = (id) => {
        console.log(id);
        dispatch(openForm({ 
            form: "taskView", 
            variant: "add",
            boardId, 
            taskId: id 
        }));
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