import React, { useState } from "react";
import NavBar from "./NavBar.jsx";
import Button from "../Button.jsx";
import SwitchThemeBox from "../SwitchThemeBox.jsx";
import NavItem from "./NavItem.jsx";
import { useDispatch, useSelector } from "react-redux";
import { openForm } from "../../redux/slices/formsSlice.js";
import { useNavigate } from "react-router";

const Sidebar = ({ boardsLinks, onToggle, isHidden }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();

    let boardsCount = 0;
    if (boardsLinks.length) {
        boardsCount = boardsLinks.length && boardsLinks.length;
    }

    let classNameBtnToggleHide = "sidebar-options__togglebtn"; 
    let altToggleHide;
    if (!isHidden) {
        altToggleHide = "Hide Sidebar";
    } else {
        classNameBtnToggleHide += " hidden";
        altToggleHide = "Show Sidebar";
    }

    const openBoardForm = () => {
        if (!user) {
            alert('You are not authorized. Log in to add/edit board');
            navigate('/auth/login');
        } else {
            dispatch(openForm({
                form: "boardForm", 
                variant: 'add'
            }));
        }
    }

    return (
        <div className="sidebar">
            {!isHidden ? 
                <div className="sidebar__box">
                    <h1 className="sidebar__logo">kanban</h1>
                    <span className="sidebar__countboards">{`ALL BOARDS (${boardsCount})`}</span>
                    <NavBar>
                        {boardsLinks.map(board => <NavItem to={board.id} title={board.title} key={board.id}/>)}
                    </NavBar>
                    <Button
                        className="sidebar-nav__addboard"
                        imgSrc="./assets/dark/table-list-solid-create.svg"
                        altSrc="Board"
                        clickHandler={openBoardForm}
                    >
                        + Create New Board
                    </Button>
                </div>
                : <div className="sidebar__box" />
            }

            <div className="sidebar-options">
                {!isHidden && <SwitchThemeBox />}
                <Button
                    className={classNameBtnToggleHide}
                    imgSrc="./assets/dark/eye-slash-regular.svg"
                    altSrc={altToggleHide}
                    clickHandler={onToggle}
                >
                    {!isHidden && "Hide Sidebar"}
                </Button>
            </div>
        </div>
    );
}

export default Sidebar;