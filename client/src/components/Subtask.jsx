import React from "react";

const Subtask = ({ title, isChecked, id, onToggle }) => {
    let classNameLabelChecked = "form__label";
    if (isChecked) {
        classNameLabelChecked += " checked";
    }

    return (
        <div className="form-substasks-item-check">
            <label className="container">
                <label htmlFor={id} className={classNameLabelChecked}>
                    {title}
                </label>
                <input 
                    type="checkbox" 
                    checked={isChecked} 
                    id={id} 
                    onChange={e => onToggle(id, e.target.checked)}
                />
                <span className="checkmark"></span>
            </label>
        </div>
    );
}

export default Subtask;