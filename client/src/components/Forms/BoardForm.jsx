import React from "react";
import Button from "../Button.jsx";
import Control from "../Control.jsx";
import FormList from "./FormList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../redux/slices/themeSlice.js";
import { closeForm, selectVariant } from "../../redux/slices/formsSlice.js";

const BoardForm = ({ onSubmit }) => {
    const theme = useSelector(selectTheme);
    const variant = useSelector(selectVariant);
    const dispatch = useDispatch();

    const classNameForm = `form absolute ${theme}`;

    let title, titleSubmitBtn;
    if (variant === "add") {
        title = "Add New Board";
        titleSubmitBtn = "Create Board";
    } else if (variant === "edit") {
        title = "Edit Board";
        titleSubmitBtn = "Edit Board";
    }

    const onCloseHandler = e => {
        e.preventDefault();
        dispatch(closeForm('boardForm'));
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
                id="board"
                onChange={null}
                placeholder="e.g. Wish Design"
            >
                Board Name
            </Control>

            <FormList
                type="boards"
                items={[]}
                onAdd={null}
                OnDelete={null}
            />

            <Button
                type="submit"
                className="form__submit"
            >
                {titleSubmitBtn}
            </Button>
        </form>
    );
}

export default BoardForm;