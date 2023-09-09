import React, { useEffect, useState } from "react";

import Header from "../components/Main/Header.jsx";
import Column from "../components/Main/Column.jsx";
import Button from "../components/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { openForm } from "../redux/slices/formsSlice.js";
import Loader from "../components/Loader.jsx";
import { useParams } from "react-router";
import { fetchColumns } from "../redux/slices/boardsSlice.js";

const BoardSinglePage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const board = useSelector(state => state.boards.items.find(item => item.id === parseFloat(params.id)));
    const columns = useSelector(state => state.boards.columns);
    const requestStatus = useSelector(state => state.boards.statusColumns);

    const content = columns.length 
        ? columns.map(col => 
            <Column 
                boardId={params.id}
                title={col.column_title} 
                tasks={col.tasks} 
            />)
        : <div className="main-box">
            Tasks are not found
          </div>;

    useEffect(() => {
        dispatch(fetchColumns(params.id));
    }, [params.id]);

    const openBoardForm = () => {
        dispatch(openForm({form: "boardForm", variant: 'edit'}))
    }

    return (
        <>
            <Header board={board && board} />
            <div className="columns">
                {requestStatus === 'loading' 
                    ? <Loader variant="big" /> 
                    : <>
                        {content}
                        <Button className="addcolumn-btn" clickHandler={openBoardForm}>+ New Column</Button>
                      </> 
                }
            </div>
        </>
    );
}

export default BoardSinglePage;