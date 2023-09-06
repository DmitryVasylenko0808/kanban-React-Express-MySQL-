import React from "react";
import Button from "../Button.jsx";

const FormListItem = ({ type, id, value, placeholder, onDelete }) => {
    let className;
    if (type === 'subtask') {
        className = "form-subtasks-add__item";
    } else if (type === "board") {
        className = "form-boards-add__item";
    }

    return (
        <div className={className}>
            <input
                className="form__input"
                id={id}
                placeholder={placeholder}
                defaultValue={value}
            />
            <Button
                className="form__close"
                imgSrc="./assets/dark/xmark-solid.svg"
                altSrc="Close"
                clickHandler={onDelete}
            />
        </div>
    );
}

export default FormListItem;