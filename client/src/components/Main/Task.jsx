import React from "react";

const Task = ({ title, subtasks, completed, onView }) => {
    return (
        <div className="column-task" onClick={onView}>
            <span className="column-task__title">{title}</span>
            <span className="column-task__count">{`${completed} of ${subtasks} subtask`}s</span>
        </div>
    );
}

export default Task;