import React from "react";

const Control = ({ type, children, id, onChange, placeholder, selectOptions, error }) => {
    const invalid = error ? "invalid" : "";

    if (type === "text") {
        return (
            <div className="form-control">
                <label htmlFor={id} className="form__label">{children}</label>
                <input
                    className={`form__input ${invalid}`}
                    id={id}
                    placeholder={placeholder}
                    onChange={onChange}
                />
                {error && <span className="form__helper">{error}</span>}
            </div>
        )
    } else if (type === "textarea") {
        return (
            <div className="form-control">
                <label htmlFor={id} className="form__label">{children}</label>
                <textarea
                    className={`form__textarea ${invalid}`}
                    id={id}
                    placeholder={placeholder}
                    onChange={onChange}
                />
                {error && <span className="form__helper">{error}</span>}
            </div>
        )
    } else if (type === "select") {
        return (
            <div className="form-control">
                <label htmlFor={id} className="form__label">{children}</label>
                <select 
                    className={`form__select ${invalid}`}
                    id={id}
                    placeholder={placeholder}
                    onChange={onChange}
                >
                    {selectOptions.map(item => <option value={item.id}>{item.title}</option>)}
                </select>
                {error && <span className="form__helper">{error}</span>}
            </div>
        )
    }
}

export default Control;