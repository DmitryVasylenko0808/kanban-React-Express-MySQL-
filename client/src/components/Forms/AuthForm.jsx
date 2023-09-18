import React from "react";

import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/slices/themeSlice";

const AuthForm = ({ variant, onSubmit, children }) => {
    const theme = useSelector(selectTheme);
    const classNameForm = `form ${theme}`;

    let title, classNameImg, imgSrc, altSrc;
    if (variant === "login") {
        title = "Log In";
        classNameImg = "form-heading__login";
        imgSrc = "../assets/dark/right-to-bracket-solid.svg";
        altSrc = "Log In";
    } else if (variant === "register") {
        title = "Registration";
        classNameImg = "form-heading__register";
        imgSrc = "../assets/dark/user-plus-solid.svg";
        altSrc = "Registration";
    }

    return (
        <form className={classNameForm} onSubmit={onSubmit}>
            <div className="form-heading authtype">
                <img className={classNameImg} src={imgSrc} alt={altSrc} />
                {title}
            </div>

            {children}
        </form>
    );
}

export default AuthForm;