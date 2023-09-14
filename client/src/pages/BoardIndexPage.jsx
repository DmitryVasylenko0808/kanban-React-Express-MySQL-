import React from "react";
import Header from "../components/Main/Header.jsx";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const BoardIndexPage = () => {
    const boards = useSelector(state => state.boards.items);

    if (boards.length) {
        return <Navigate to={`${boards[0].id}`} />
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