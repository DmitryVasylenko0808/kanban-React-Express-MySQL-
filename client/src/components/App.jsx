import React from "react";
import Sidebar from "./SideBar/SideBar.jsx";
import Header from "./Main/Header.jsx";
import Button from "./Button.jsx";
import Column from "./Main/Column.jsx";
import BoardForm from "./Forms/BoardForm.jsx";
import TaskForm from "./Forms/TaskForm.jsx";
import TaskView from "./TaskView.jsx";
import SwitchThemeBox from "./SwitchThemeBox.jsx";

import AuthForm from "./Forms/AuthForm.jsx";
import Control from "./Control.jsx";
import { Link, Route, Routes } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout.jsx";
import BoardSinglePage from "../pages/BoardSinglePage.jsx";
import AuthLayout from "./Layouts/AuthLayout.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import BoardsPage from "../pages/BoardsPage.jsx";
import BoardIndexPage from "../pages/BoardIndexPage.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<BoardsPage />}>
                <Route index element={<BoardIndexPage />} />
                <Route path=":id" element={<BoardSinglePage />} />
            </Route>
            <Route path="auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Route>
        </Routes>
    )
}

export default App;