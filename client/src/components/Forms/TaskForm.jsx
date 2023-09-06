import React from "react";
import Button from "../Button.jsx";
import Control from "../Control.jsx";
import FormList from "./FormList.jsx";

import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../redux/slices/themeSlice.js";
import { closeForm, selectVariant } from "../../redux/slices/formsSlice.js";

const TaskForm = ({ onSubmit }) => {
    const theme = useSelector(selectTheme);
    const variant = useSelector(selectVariant);
    const dispatch = useDispatch();

    const classNameForm = `form absolute ${theme}`;

    let title, titleSubmitBtn;
    if (variant === "add") {
        title = "Add New Task";
        titleSubmitBtn = "Create Task";
    } else if (variant === "edit") {
        title = "Edit Task";
        titleSubmitBtn = "Edit Task";
    }

    const onCloseHandler = e => {
        e.preventDefault();
        dispatch(closeForm('taskForm'));
    }

    return (
        <form className={classNameForm} onSubmit={onSubmit}>
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
                onChange={null}
                placeholder="e.g. Take coffee break"
            >
                Title
            </Control>

            <Control
                type="textarea"
                id="desc"
                onChange={null}
                placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            >
                Description
            </Control>

            <FormList 
                type="subtasks"
                items={[]}
                onAdd={null}
                OnDelete={null} 
            />

            <Control
                type="select"
                id="status"
                onChange={null}
                placeholder="e.g. Take coffee break"
                selectOptions={[{ value: "value", title: "Status value" }]}
            >
                Status
            </Control>

            <Button
                type="submit"
                className="form__submit"
            >
                {titleSubmitBtn}
            </Button>
        </form>
    );
}

export default TaskForm;