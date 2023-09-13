import React, { useEffect, useState } from "react";
import Button from "../Button.jsx";
import Control from "../Control.jsx";
import FormList from "./FormList.jsx";
import axios from "../../axios.js";

import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../redux/slices/themeSlice.js";
import { closeForm, selectBoardId, selectTaskId, selectVariant } from "../../redux/slices/formsSlice.js";
import { createTask, editTask, selectColumns } from "../../redux/slices/boardsSlice.js";
import Loader from "../Loader.jsx";

const TaskForm = () => {
    const dispatch = useDispatch();

    const theme = useSelector(selectTheme);
    const variant = useSelector(selectVariant);
    const columns = useSelector(selectColumns);
    const boardId = useSelector(selectBoardId);
    const taskId = useSelector(selectTaskId);

    const [taskTitle, setTaskTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subtasks, setSubtasks] = useState([]);
    const [status, setStatus] = useState('');
    const [prevStatus, setPrevStatus] = useState('');
    const [requestStatus, setRequestStatus] = useState('idle');

    useEffect(() => {
        if (variant === "add") {
            const subtasks = [
                { value: '', status: false },
                { value: '', status: false }
            ];
            setSubtasks(subtasks);
            setStatus(columns[0].column_title);
            setPrevStatus(columns[0].column_title);
        } else if (variant === "edit") {
            console.log(boardId, taskId);
            getTask();
        }
    }, []);

    const classNameForm = `form absolute ${theme}`;
    let title, titleSubmitBtn;
    if (variant === "add") {
        title = "Add New Task";
        titleSubmitBtn = "Create Task";
    } else if (variant === "edit") {
        title = "Edit Task";
        titleSubmitBtn = "Edit Task";
    }

    const getTask = async () => {
        try {
            const res = await axios.get(`/tasks/${boardId}/${taskId}`);
            const { data } = res.data;

            setTaskTitle(data.title);
            setDescription(data.description);
            setSubtasks(data.subtasks.map(s => ({ ...s, value: s.title })));
            setStatus(data.columnId);
            setPrevStatus(data.columnId);
        } catch (err) {
            const { message } = err.response.data;
            alert(message);
            dispatch(closeForm('taskForm'));
        }
    }

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        setRequestStatus('loading');
        try {
            const { column_id } = columns.find(col => col.column_id == status || col.column_title === status);
            const data = {
                title: taskTitle,
                desc: description,
                subtasks: subtasks.map(s => ({ ...s, title: s.value })),
                columnId: column_id
            };

            if (variant === "add") {
                await dispatch(createTask(data));
            } else if (variant === "edit") {
                data.id = taskId;
                data.prevColumnId = prevStatus;
                await dispatch(editTask(data));
            }
        } catch (err) {
            console.log(err);
            alert('Error');
        } finally {
            setRequestStatus('idle');
        }
    }

    const onChangeTaskTitle = e => {
        setTaskTitle(e.target.value);
    };

    const onChangeDescription = e => {
        setDescription(e.target.value);
    };

    const onChangeStatus = value => {
        setPrevStatus(status);
        setStatus(value);
    };

    const addSubtask = () => {
        const newSubtasks = [...subtasks, { value: '', status: false }];
        setSubtasks(newSubtasks);
    };

    const deleteSubtask = id => {
        const newSubtasks = subtasks.filter((c, index) => index !== id);
        setSubtasks(newSubtasks);
    };

    const onChangeSubtask = (id, value) => {
        const newCategories = subtasks.map((c, index) => {
            if (index === id) {
                return { ...c, value }
            } else {
                return c;
            }
        });
        setSubtasks(newCategories);
    };

    const onCloseHandler = e => {
        e.preventDefault();
        dispatch(closeForm('taskForm'));
    }

    return (
        <form className={classNameForm} onSubmit={onSubmitHandle}>
            <div className="form-box">
                <Button
                    className="form__close"
                    imgSrc="./assets/dark/xmark-solid.svg"
                    altSrc="Close"
                    clickHandler={onCloseHandler}
                />
            </div>

            <div className="form-heading">
                {title}
            </div>

            <Control
                type="text"
                id="title"
                value={taskTitle}
                onChange={onChangeTaskTitle}
                placeholder="e.g. Take coffee break"
            >
                Title
            </Control>

            <Control
                type="textarea"
                id="desc"
                value={description}
                onChange={onChangeDescription}
                placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            >
                Description
            </Control>

            <FormList 
                type="subtasks"
                items={subtasks}
                onAdd={addSubtask}
                onDeleteItem={deleteSubtask}
                onChangeItem={onChangeSubtask} 
            />

            <Control
                type="select"
                id="status"
                value={status}
                onChange={onChangeStatus}
                placeholder="e.g. Take coffee break"
                selectOptions={columns.map(col => ({ id: col.column_id, title: col.column_title }))}
            >
                Status
            </Control>

            <Button
                type="submit"
                className="form__submit"
            >
                {requestStatus === 'loading' 
                    ? <Loader /> 
                    : titleSubmitBtn
                }
            </Button>
        </form>
    );
}

export default TaskForm;