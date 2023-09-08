import React, { useEffect, useState } from "react";
import axios from "../axios";
import Button from "./Button.jsx";
import ContextMenu from "./ContextMenu.jsx";
import Control from "./Control.jsx";
import Subtask from "./Subtask.jsx";

import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../redux/slices/themeSlice.js";
import { closeForm, openForm } from "../redux/slices/formsSlice.js";
import Loader from "./Loader.jsx";

const TaskView = ({ boardId, taskId }) => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const [task, setTask] = useState(null);
    const [columns, setColumns] = useState([]);
    const [requestStatus, setRequestStatus] = useState('idle');

    const completedSubtasks = task && task.subtasks.filter(s => s.status === 1);
    const classNameForm = `form absolute ${theme}`;

    useEffect(() => {
        getTask();
    }, []);

    const getTask = async () => {
        try {
            setRequestStatus('loading')
            const res = await axios.get(`/tasks/${boardId}/${taskId}`);
            const { data, columns } = res.data;
            setTask(data);
            setColumns(columns);
            setRequestStatus('succeeded');
        } catch (err) {
            const { message } = err.response.data;
            alert(message);
            dispatch(closeForm('taskView'));
        }
    }

    const openEditTaskForm = () => {
        dispatch(openForm({ 
            form: "taskForm", 
            variant: 'edit', 
            boardId,
            taskId 
        }));
    }

    const onCloseHandler = e => {
        e.preventDefault();
        dispatch(closeForm('taskView'));
    }

    if (requestStatus === 'loading' || requestStatus === 'idle') {
        return (
            <form className={classNameForm}>
                <Loader variant="big" />
            </form>
        )
    }

    return (
        <form className={classNameForm}>
            <div className="form-box">
                <Button
                    className="form__close"
                    imgSrc="./assets/dark/xmark-solid.svg"
                    altSrc="Close"
                    clickHandler={onCloseHandler}
                />
            </div>

            <div className="form-heading">
                {task.title}
                <ContextMenu variant="form">
                    <Button
                        className="context-menu_btn"
                        classNameImg="context-menu__delete"
                        imgSrc="./assets/dark/trash-solid.svg"
                        altSrc="Delete"
                        clickHandler={null}
                    >
                        Delete
                    </Button>
                    <Button
                        className="context-menu_btn"
                        classNameImg="context-menu__edit"
                        imgSrc="./assets/dark/pen-solid.svg"
                        altSrc="Edit"
                        clickHandler={openEditTaskForm}
                    >
                        Edit
                    </Button>
                </ContextMenu>
            </div>

            <p className="form__text">
                {task.desciption}
            </p>

            <div className="form-subtasks-checks">
                <label htmlFor="" className="form__label">
                    {`Subtasks (${completedSubtasks.length} of ${task.subtasks.length})`}
                </label>
                {task.subtasks.map(s => 
                    <Subtask
                        title={s.title}
                        isChecked={!!s.status}
                        id={s.id}
                        onToggle={null}
                    />
                )}
            </div>

            <Control
                type="select"
                id="status"
                onChange={null}
                placeholder="e.g. Take coffee break"
                selectOptions={columns}
            >
                Current Status
            </Control>
        </form>
    );
}

export default TaskView;