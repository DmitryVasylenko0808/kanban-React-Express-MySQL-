import React from "react";
import { Link } from "react-router-dom";

const Button = ({ type = "button", className, imgSrc, altSrc, children, clickHandler, linkTo, classNameImg }) => {
    if (!linkTo) {
        return (
            <button type={type} className={className} onClick={clickHandler}>
                {imgSrc && <img src={imgSrc} alt={altSrc} className={classNameImg} />}
                {children}
            </button>
        )
    } else {
        return (
            <Link className={className} to={linkTo}>
                <img src={imgSrc} alt={altSrc} />
                {children}
            </Link>
        )
    }
}

export default Button;