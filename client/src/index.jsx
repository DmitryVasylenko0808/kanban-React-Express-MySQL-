import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App.jsx";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.js";
import { Provider } from "react-redux";

import "./styles/normalize.css";
import "./styles/style.scss";

import "./styles/Sidebar.scss";
import "./styles/Header.scss";
import "./styles/SwitchThemeBox.scss";
import "./styles/Column.scss";
import "./styles/ContextMenu.scss";
import "./styles/Control.scss";
import "./styles/Form.scss";
import "./styles/Loader.scss";
import "./styles/Tasks.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)