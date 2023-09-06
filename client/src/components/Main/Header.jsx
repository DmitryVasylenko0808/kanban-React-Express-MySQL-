import React from "react";
import Button from "../Button.jsx";
import ContextMenu from "../ContextMenu.jsx";
import { openForm } from "../../redux/slices/formsSlice.js";
import { useDispatch } from "react-redux";

const Header = () => {
    const dispatch = useDispatch();

    const openTaskForm = () => {
        dispatch(openForm({form: "taskForm", variant: "add"}));
    }

    const openEditBoardForm = () => {
        dispatch(openForm({form: "boardForm", variant: "edit"}));
    }

    return (
        <div className="header">
            <h2 className="header__todo">Platform Launch</h2>
            <div className="header-box">
                <Button className="addtask-btn" clickHandler={openTaskForm}>+ Add New Task</Button>
                <ContextMenu variant="header">
                    <Button
                        className="context-menu_btn"
                        classNameImg="context-menu__delete"
                        imgSrc="./assets/dark/trash-solid.svg"
                        altSrc="Delete"
                        clickHandler={null}
                    >
                        Delete
                    </Button>
                    <Button
                        className="context-menu_btn"
                        classNameImg="context-menu__edit"
                        imgSrc="./assets/dark/pen-solid.svg"
                        altSrc="Edit"
                        clickHandler={openEditBoardForm}
                    >
                        Edit
                    </Button>
                </ContextMenu>

                <div className="header-box">
                    <Button
                        className="login-btn"
                        linkTo="/auth/login"
                        imgSrc="./assets/dark/right-to-bracket-solid.svg"
                        altSrc="Log In"
                    >
                        Log In
                    </Button>
                </div>
                {/* <div className="header-box">
                    <span className="login">usertest</span>
                    <Button 
                        className="logout-btn"
                        imgSrc="./assets/dark/right-from-bracket-solid.svg"
                        altSrc="Log Out"
                        clickHandler={null}
                    >
                        Log Out
                    </Button>
                </div> */}
            </div>
        </div>
    );
}

export default Header;