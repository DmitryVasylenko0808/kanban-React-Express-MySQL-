import React, { useEffect, useState } from "react";
import Button from "../Button.jsx";
import Control from "../Control.jsx";
import FormList from "./FormList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../redux/slices/themeSlice.js";
import { closeForm, selectBoardId, selectVariant } from "../../redux/slices/formsSlice.js";
import { createBoard, fetchBoards, fetchColumns } from "../../redux/slices/boardsSlice.js";
import axios from "../../axios.js";
import Loader from "../Loader.jsx";

const BoardForm = () => {
    const dispatch = useDispatch();
    
    const theme = useSelector(selectTheme);
    const variant = useSelector(selectVariant);
    const boardId = useSelector(selectBoardId);

    const [boardName, setBoardName] = useState('');
    const [categories, setCategories] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [subtasks, setSubtasks] = useState([]);
    const [requestStatus, setRequestStatus] = useState('idle');

    const classNameForm = `form absolute ${theme}`;
    let title, titleSubmitBtn;
    if (variant === "add") {
        title = "Add New Board";
        titleSubmitBtn = "Create Board";
    } else if (variant === "edit") {
        title = "Edit Board";
        titleSubmitBtn = "Edit Board";
    }

    useEffect(() => {
        if (variant === "add") {
            const categories = [
                { value: '' },
                { value: '' }
            ];
            setCategories(categories);
        } else if (variant === "edit") {
            getBoard();
        }
    }, []);

    const getBoard = async () => {
        try {
            console.log(boardId);
            const res = await axios.get(`/boards/for_editing/${boardId}`);
            const { title, columns, tasks, subtasks } = res.data;

            setBoardName(title);
            setCategories(columns.map(col => ({ ...col, value: col.title })));
            setTasks(tasks);
            setSubtasks(subtasks);
        } catch (err) {
            console.log(err);
        }
    }

    const onSubmitHandle = (e) => {
        e.preventDefault();
        if (variant === "add") {
            addBoard();
        } else if (variant === "edit") {
            editBoard();
        }
    }

    const addBoard = async () => {
        setRequestStatus('loading');
        try {
            const data = {
                title: boardName,
                columns: categories.map(c => c.value)
            };
            await dispatch(createBoard(data));
        } catch (err) {
            alert('Error');
        } finally {
            setRequestStatus('idle');
        }
    }

    const editBoard = async () => {
        setRequestStatus('loading');
        try {
            const data = {
                title: boardName,
                columns: categories.map(c => ({ ...c, title: c.value })),
                tasks: tasks,
                subtasks: subtasks
            };
            console.log(data);
            await axios.put(`/boards/edit/${boardId}`, data);
            dispatch(fetchBoards());
            dispatch(fetchColumns(boardId));
        } catch (err) {
            console.log(err);
        } finally {
            setRequestStatus('idle');
        }
    }

    const onChangeBoardName = e => {
        setBoardName(e.target.value);
    }

    const addCategory = () => {
        const newCategories = [...categories, { value: '' }];
        setCategories(newCategories);
    }

    const deleteCategory = id => {
        const newCategories = categories.filter((c, index) => index !== id);
        setCategories(newCategories);
    }

    const onChangeCategory = (id, value) => {
        const newCategories = categories.map((c, index) => {
            if (index === id) {
                return { ...c, value }
            } else {
                return c;
            }
        });
        setCategories(newCategories);
    }

    const onCloseHandler = e => {
        e.preventDefault();
        dispatch(closeForm('boardForm'));
    }

    return (
        <form className={classNameForm} onSubmit={onSubmitHandle}>
            <div className="form-box">
                <Button
                    className="form__close"
                    imgSrc="./assets/dark/xmark-solid.svg"
                    altSrc="Close"
                    clickHandler={onCloseHandler}
                />
            </div>

            <div className="form-heading">
                {title}
            </div>

            <Control
                type="text"
                id="board"
                value={boardName}
                onChange={e => onChangeBoardName(e)}
                placeholder="e.g. Wish Design"
            >
                Board Name
            </Control>

            <FormList
                type="boards"
                items={categories}
                onAdd={addCategory}
                onDeleteItem={deleteCategory}
                onChangeItem={onChangeCategory}
            />

            <Button
                type="submit"
                className="form__submit"
            >
                {requestStatus === 'loading' 
                    ? <Loader />
                    : titleSubmitBtn
                }
            </Button>
        </form>
    );
}

export default BoardForm;