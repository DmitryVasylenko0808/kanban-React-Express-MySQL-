import React from "react";
import FormListItem from "./FormListItem.jsx";
import Button from "../Button.jsx";

const FormList = ({ type, items, onAdd, onDelete }) => {
    let title;
    let className;
    let typeItem;
    let titleAddBtn;
    if (type === "subtasks") {
        title = "Subtasks";
        className = "form-subtasks-add";
        typeItem = "subtask"
        titleAddBtn = "+ Add New Subtask";
    } else if (type === "boards") {
        title = "Board Categories";
        className = "form-boards-add";
        typeItem = "board"
        titleAddBtn = "+ Add New Category";
    }

    return (
        <div className={className}>
            <label className="form__label">{title}</label>
            <FormListItem
                type={typeItem}
                id="item1"
                placeholder="e.g. Take coffee break"
                onDelete={onDelete}
            />
            <FormListItem
                type={typeItem}
                id="item1"
                placeholder="e.g. Take coffee break"
                onDelete={onDelete}
            />
            <Button
                className="form__btn"
                clickHandler={onAdd}
            >
                {titleAddBtn}
            </Button>
        </div>
    );
}

export default FormList;