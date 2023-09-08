import React, { useState } from "react";
import axios from "../axios";

import AuthForm from "../components/Forms/AuthForm.jsx";
import Control from "../components/Control.jsx";
import { Link, Navigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Loader from "../components/Loader.jsx";

const LoginPage = () => {
    const [requestStatus, setRequestStatus] = useState("idle");
    const [error, setError] = useState("");

    const onSubmitHandle = async (e) => {
        e.preventDefault();

        const form = e.target;
        const data = {
            login: form.login.value,
            password: form.password.value
        };

        setRequestStatus('loading');
        try {
            const res = await axios.post("/users/login", data);
            localStorage.setItem("token", res.data.token);
            setRequestStatus("succeeded");
        } catch (err) {
            const { message } = err.response.data;
            setError(message);
            setRequestStatus("rejected");
        }
    }

    if (requestStatus === "succeeded") {
        return <Navigate to="/" />
    }

    return (
        <AuthForm
            variant="login"
            onSubmit={e => onSubmitHandle(e)}
        >
            <Control
                type="text"
                id="login"
                onChange={null}
                placeholder="e.g. mylogin"
                error={error === "This login doesn't exists" && error}
            >
                Login
            </Control>

            <Control
                type="text"
                id="password"
                onChange={null}
                placeholder="e.g. qwert12345"
                error={error === "Invalid login or password" && error}
            >
                Password
            </Control>

            <span className="form-question">
                Dont have an account?
                <Link className="form__link" to="/auth/register">Sign Up</Link>
            </span>

            <Button type="submit" className="form__submit">
                {requestStatus === "loading" ? <Loader /> : "Log In"}
            </Button>
        </AuthForm>
    );
}

export default LoginPage;