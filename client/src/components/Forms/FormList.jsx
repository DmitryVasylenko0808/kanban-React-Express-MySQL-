import React from "react";
import FormListItem from "./FormListItem.jsx";
import Button from "../Button.jsx";

const FormList = ({ type, items, onAdd, onDeleteItem, onChangeItem, error }) => {
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
            {error && <span className="form__helper">{error}</span>}
            {items.map((item, index) => (
                <FormListItem
                    type={typeItem}
                    id={index}
                    value={item.value}
                    placeholder="e.g. Take coffee break"
                    onChange={onChangeItem}
                    onDelete={() => onDeleteItem(index)}
                    key={index}
                />
            ))}
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