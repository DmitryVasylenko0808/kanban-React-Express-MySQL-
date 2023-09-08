import React, { useState } from "react";
import NavBar from "./NavBar.jsx";
import Button from "../Button.jsx";
import SwitchThemeBox from "../SwitchThemeBox.jsx";
import NavItem from "./NavItem.jsx";
import { useDispatch } from "react-redux";
import { openForm } from "../../redux/slices/formsSlice.js";

const Sidebar = ({ boardsLinks }) => {
    const dispatch = useDispatch();
    const [hidden, setHidden] = useState(false);

    console.log(boardsLinks);

    let boardsCount = 0;
    if (boardsLinks.length) {
        boardsCount = boardsLinks.length && boardsLinks.length;
    }

    let classNameBtnToggleHide = "sidebar-options__togglebtn"; 
    let altToggleHide;

    if (!hidden) {
        altToggleHide = "Hide Sidebar";
    } else {
        classNameBtnToggleHide += " hidden";
        altToggleHide = "Show Sidebar";
    }

    const openBoardForm = () => {
        dispatch(openForm({form: "boardForm", variant: 'add'}));
    }

    const onHideHandler = () => {
        setHidden(!hidden);
    }

    return (
        <div className="sidebar">
            {!hidden ? 
                <div className="sidebar__box">
                    <h1 className="sidebar__logo">kanban</h1>
                    <span className="sidebar__countboards">ALL BOARDS {boardsCount}</span>
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
                {!hidden && <SwitchThemeBox />}
                <Button
                    className={classNameBtnToggleHide}
                    imgSrc="./assets/dark/eye-slash-regular.svg"
                    altSrc={altToggleHide}
                    clickHandler={onHideHandler}
                >
                    {!hidden && "Hide Sidebar"}
                </Button>
            </div>
        </div>
    );
}

export default Sidebar;