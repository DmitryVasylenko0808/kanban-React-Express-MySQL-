import React, { useEffect, useState } from "react";

import Sidebar from "../components/SideBar/SideBar.jsx";
import BoardForm from "../components/Forms/BoardForm.jsx";
import TaskForm from "../components/Forms/TaskForm.jsx";
import TaskView from "../components/TaskView.jsx";
import { Routes, Route, Outlet, Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../redux/slices/themeSlice.js";
import { selectForms } from "../redux/slices/formsSlice.js";
import { fetchUser } from "../redux/slices/userSlice.js";

const BoardsPage = () => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const formsShowed = useSelector(selectForms);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(fetchUser());
        }
    }, []);

    const classNameApp = `app ${theme}`;
    const boards = [];

    return (
        <>
            <div className={classNameApp}>
                <Sidebar />
                <div className="main">
                    <Outlet />
                </div>
            </div>
            {formsShowed.taskForm && <TaskForm />}
            {formsShowed.boardForm && <BoardForm />}
            {formsShowed.taskView && <TaskView />}
        </>
    );
}

export default BoardsPage;