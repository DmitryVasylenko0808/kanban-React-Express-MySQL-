import React from "react";

const Loader = ({ variant }) => {
    let className = "loader";
    if (variant === "big") {
        className += " big";
        return (
            <div className="main-box">
                <div className={className}></div>
            </div>
        )
    }

    return <div className={className}></div>;
}

export default Loader;