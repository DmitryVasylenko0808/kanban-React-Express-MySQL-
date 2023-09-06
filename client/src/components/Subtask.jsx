import React from "react";

const Subtask = ({ title, isChecked, id, onToggle }) => {
    return (
        <div className="form-substasks-item-check">
            <label className="container">
                <label htmlFor={id} className="form__label checked">
                    {title}
                </label>
                <input 
                    type="checkbox" 
                    checked={isChecked} 
                    id={id} 
                    onChange={onToggle}
                />
                <span className="checkmark"></span>
            </label>
        </div>
    );
}

export default Subtask;