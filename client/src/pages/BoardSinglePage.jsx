import React from "react";

import Header from "../components/Main/Header.jsx";
import Column from "../components/Main/Column.jsx";
import Button from "../components/Button.jsx";
import { useDispatch } from "react-redux";
import { openForm } from "../redux/slices/formsSlice.js";
import Loader from "../components/Loader.jsx";

const BoardSinglePage = () => {
    const dispatch = useDispatch();

    const openBoardForm = () => {
        dispatch(openForm({form: "boardForm", variant: 'edit'}))
    }

    return (
        <>
            <Header />
            <div className="columns">
                <Column title="COLUMN" tasks={null} />
                <Column title="COLUMN" tasks={null} />
                <Column title="COLUMN" tasks={null} />
                <Button className="addcolumn-btn" clickHandler={openBoardForm}>+ New Column</Button>
                {/* <Loader variant="big" /> */}
            </div>
        </>
    );
}

export default BoardSinglePage;