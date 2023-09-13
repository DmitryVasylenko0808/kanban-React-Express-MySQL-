import React, { useEffect } from "react";
import Button from "../Button.jsx";
import ContextMenu from "../ContextMenu.jsx";
import { openForm } from "../../redux/slices/formsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/userSlice.js";
import { deleteBoard } from "../../redux/slices/boardsSlice.js";
import { useNavigate } from "react-router";

const Header = ({ board }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();

    const openTaskForm = () => {
        dispatch(openForm({
            form: "taskForm", 
            variant: "add",
            boardId: board.id
        }));
    }

    const onDeleteBoard = () => {
        if (window.confirm(`Do you really want to delete board '${board.title}'?`)) {
            dispatch(deleteBoard(board.id));
            navigate('/');
        }
    }

    const openEditBoardForm = () => {
        dispatch(openForm({
            form: "boardForm", 
            variant: "edit",
            boardId: board.id
        }));
    }

    const logoutUserHandler = () => {
        dispatch(logoutUser());
    }

    return (
        <div className="header">
            <h2 className="header__todo">{board ? board.title : ''}</h2>
            <div className="header-box">
                <Button className="addtask-btn" clickHandler={openTaskForm}>+ Add New Task</Button>
                <ContextMenu variant="header">
                    <Button
                        className="context-menu_btn"
                        classNameImg="context-menu__edit"
                        imgSrc="./assets/dark/pen-solid.svg"
                        altSrc="Edit"
                        clickHandler={openEditBoardForm}
                    >
                        Edit
                    </Button>
                    <Button
                        className="context-menu_btn"
                        classNameImg="context-menu__delete"
                        imgSrc="./assets/dark/trash-solid.svg"
                        altSrc="Delete"
                        clickHandler={onDeleteBoard}
                    >
                        Delete
                    </Button>
                </ContextMenu>

                {!user 
                    ? <div className="header-box">
                        <Button
                            className="login-btn"
                            linkTo="/auth/login"
                            imgSrc="./assets/dark/right-to-bracket-solid.svg"
                            altSrc="Log In"
                        >
                            Log In
                        </Button>
                      </div>

                    : <div className="header-box">
                        <span className="login">{user.login}</span>
                        <Button 
                            className="logout-btn"
                            imgSrc="./assets/dark/right-from-bracket-solid.svg"
                            altSrc="Log Out"
                            clickHandler={logoutUserHandler}
                        >
                            Log Out
                        </Button>
                      </div>
                }
            </div>
        </div>
    );
}

export default Header;