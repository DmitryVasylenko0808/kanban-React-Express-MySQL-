import React from "react";
import Button from "../Button.jsx";
import SwitchThemeBox from "../SwitchThemeBox.jsx";
import { Outlet, useNavigate } from "react-router";

import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/slices/themeSlice.js";

const AuthLayout = () => {
    const theme = useSelector(selectTheme);
    const navigate = useNavigate();

    const classNameAuth = `auth ${theme}`;

    const goBack = () => navigate(-1);

    return (
        <div className={classNameAuth}>
            <div className="auth-header">
                <Button
                    className="auth-header__btnback"
                    clickHandler={goBack}
                >
                    Go Back
                </Button>
                <SwitchThemeBox />
            </div>

            <div className="auth-container">
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;