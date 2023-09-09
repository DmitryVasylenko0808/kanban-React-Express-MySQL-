import React, { useEffect, useState } from "react";
import Button from "../Button.jsx";
import Control from "../Control.jsx";
import FormList from "./FormList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../redux/slices/themeSlice.js";
import { closeForm, selectVariant } from "../../redux/slices/formsSlice.js";
import { createBoard } from "../../redux/slices/boardsSlice.js";
import Loader from "../Loader.jsx";

const BoardForm = ({ boardId = null }) => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const variant = useSelector(selectVariant);
    const [boardName, setBoardName] = useState('');
    const [categories, setCategories] = useState([]);
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
        const categories = [
            { value: '' },
            { value: '' }
        ];
        setCategories(categories);
    }, []);

    const addBoard = async (e) => {
        e.preventDefault();
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
        <form className={classNameForm} onSubmit={addBoard}>
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