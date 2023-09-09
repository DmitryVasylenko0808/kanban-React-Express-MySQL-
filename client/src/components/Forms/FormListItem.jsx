import React, { useEffect, useState } from "react";
import Button from "../Button.jsx";

const FormListItem = ({ type, id, value, placeholder, onDelete, onChange }) => {
    let className;
    if (type === 'subtask') {
        className = "form-subtasks-add__item";
    } else if (type === "board") {
        className = "form-boards-add__item";
    }

    return (
        <div className={className}>
            <input
                value={value}
                className="form__input"
                id={id}
                placeholder={placeholder}
                onChange={e => onChange(id, e.target.value)}
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