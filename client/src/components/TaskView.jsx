import React from "react";
import Button from "./Button.jsx";
import ContextMenu from "./ContextMenu.jsx";
import Control from "./Control.jsx";
import Subtask from "./Subtask.jsx";

import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../redux/slices/themeSlice.js";
import { closeForm, openForm } from "../redux/slices/formsSlice.js";

const TaskView = ({ id }) => {
    const theme = useSelector(selectTheme);
    const dispatch = useDispatch();

    const classNameForm = `form absolute ${theme}`;

    const openEditTaskForm = () => {
        dispatch(openForm({ form: "taskForm", variant: 'edit' }));
    }

    const onCloseHandler = e => {
        e.preventDefault();
        dispatch(closeForm('taskView'));
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
                Task Title title title edita distinctio quo beatae est nulla corporis voluptatibus ex aperiam eligendi!
                amet consectetur adipisicing elit. Commodi autem ipsum dolores at quibusdam, amet consectetur adipisicing elit. Commodi autem ipsum dolores at quibusdam.
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
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi autem ipsum dolores at quibusdam,
                possimus nemo architecto veritatis incidunt expedita distinctio quo beatae est nulla corporis voluptatibus ex aperiam eligendi!
            </p>

            <div className="form-subtasks-checks">
                <label for="" className="form__label">Subtasks (2 of 3)</label>
                <Subtask
                    title="Consectetur adipisicing elit. Commodi autem ipsum dolores at quibusdam"
                    isChecked={true}
                    id="item1"
                    onToggle={null}
                />
                <Subtask
                    title="Consectetur adipisicing elit. Commodi autem ipsum dolores at quibusdam"
                    isChecked={true}
                    id="item1"
                    onToggle={null}
                />
                <Subtask
                    title="Consectetur adipisicing elit. Commodi autem ipsum dolores at quibusdam"
                    isChecked={false}
                    id="item1"
                    onToggle={null}
                />
            </div>

            <Control
                type="select"
                id="status"
                onChange={null}
                placeholder="e.g. Take coffee break"
                selectOptions={[{ value: "value", title: "Status value" }]}
            >
                Current Status
            </Control>
        </form>
    );
}

export default TaskView;