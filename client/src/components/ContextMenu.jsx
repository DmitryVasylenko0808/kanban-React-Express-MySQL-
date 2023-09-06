import React from "react";

const ContextMenu = ({ variant, children }) => {
    let imgContextSrc;
    if (variant === 'header') {
        imgContextSrc = "./assets/dark/ellipsis-vertical-solid-header.svg";
    } else if (variant === 'form') {
        imgContextSrc = "./assets/dark/ellipsis-vertical-solid.svg";
    }

    return (
        <div className="context-btn">
            <img src={imgContextSrc} alt="Context menu" />
            <div className="context-menu">
                {children}
            </div>
        </div>
    );
}

export default ContextMenu;