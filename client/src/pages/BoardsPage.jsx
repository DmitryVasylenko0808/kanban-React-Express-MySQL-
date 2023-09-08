import React, { useEffect, useState } from "react";

import Sidebar from "../components/SideBar/SideBar.jsx";
import BoardForm from "../components/Forms/BoardForm.jsx";
import TaskForm from "../components/Forms/TaskForm.jsx";
import TaskView from "../components/TaskView.jsx";
import { Routes, Route, Outlet, Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../redux/slices/themeSlice.js";
import { selectBoardId, selectForms, selectTaskId } from "../redux/slices/formsSlice.js";
import { fetchUser } from "../redux/slices/userSlice.js";
import { fetchBoards } from "../redux/slices/boardsSlice.js";

const BoardsPage = () => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const formsShowed = useSelector(selectForms);
    const boardId = useSelector(selectBoardId);
    const taskId = useSelector(selectTaskId);
    const boards = useSelector(state => state.boards.items);

    console.log(boards);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(fetchUser());
            dispatch(fetchBoards());
        }
    }, []);

    const classNameApp = `app ${theme}`;

    return (
        <>
            <div className={classNameApp}>
                <Sidebar boardsLinks={boards} />
                <div className="main">
                    <Outlet />
                </div>
            </div>
            {formsShowed.taskForm && <TaskForm boardId={boardId} taskId={taskId} />}
            {formsShowed.boardForm && <BoardForm />}
            {formsShowed.taskView && <TaskView boardId={boardId} taskId={taskId} />}
        </>
    );
}

export default BoardsPage;