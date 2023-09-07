import React from "react";

import Sidebar from "../components/SideBar/SideBar.jsx";
import Header from "../components/Main/Header.jsx";
import Button from "../components/Button.jsx";
import Column from "../components/Main/Column.jsx";
import BoardForm from "../components/Forms/BoardForm.jsx";
import TaskForm from "../components/Forms/TaskForm.jsx";
import TaskView from "../components/TaskView.jsx";
import { Routes, Route, Navigate } from "react-router";
import BoardSinglePage from "./BoardSinglePage.jsx";

const BoardIndexPage = () => {
    const boards = [];
    if (boards.length) {
        return <Navigate to="/1" />
    } else {
        return (
            <>
                <Header />
                <div className="main-box">
                    Tasks are not found
                </div>
            </>
        );
    }
}

export default BoardIndexPage;