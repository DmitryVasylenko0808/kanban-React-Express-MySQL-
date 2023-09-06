import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, toggleTheme } from "../redux/slices/themeSlice";

const SwitchThemeBox = () => {
    const theme = useSelector(selectTheme);
    const dispatch = useDispatch();

    const toggleThemeHandler = () => {
        dispatch(toggleTheme(!theme));
    };

    return (
        <div className="sidebar-theme">
            <img src="../assets/dark/sun-solid.svg" alt="Sun" />
            <label className="switch">
                <input 
                    type="checkbox" 
                    checked={!theme} 
                    onChange={toggleThemeHandler} 
                />
                <span className="slider round"></span>
            </label>
            <img src="../assets/dark/moon-solid.svg" alt="Moon" />
        </div>
    );
}

export default SwitchThemeBox;