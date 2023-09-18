import React, { useState } from "react";
import axios from "../axios";
import AuthForm from "../components/Forms/AuthForm.jsx";
import Control from "../components/Control.jsx";
import { Navigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Loader from "../components/Loader.jsx";

const RegisterPage = () => {
    const [requestStatus, setRequestStatus] = useState("idle");
    const [error, setError] = useState(null);

    const onSubmitHandle = async (e) => {
        e.preventDefault();

        const form = e.target;
        const data = {
            login: form.login.value,
            password: form.password.value,
            passwordConfirm: form.r_password.value
        };

        setRequestStatus('loading');
        try {
            const res = await axios.post("/users/register", data);
            localStorage.setItem("token", res.data.token);
            setRequestStatus("succeeded");
        } catch (err) {
            const { error } = err.response.data;
            setError(error);
            setRequestStatus("rejected");
        }
    }

    if (requestStatus === 'succeeded') {
        return <Navigate to="/" />
    }

    return (
        <AuthForm
            variant="register"
            onSubmit={e => onSubmitHandle(e)}
        >
            <Control
                type="text"
                id="login"
                placeholder="e.g. mylogin"
                error={error && error.path === "login" && error.message}
            >
                Login
            </Control>

            <Control
                type="text"
                id="password"
                placeholder="e.g. qwert12345"
                error={error && error.path === "password" && error.message}
            >
                Password
            </Control>

            <Control
                type="text"
                id="r_password"
                placeholder="e.g. qwert12345"
                error={error && error.path === "passwordConfirm" && error.message}
            >
                Repeat Password
            </Control>

            <Button 
                type="submit" 
                className="form__submit"
                isDisabled={requestStatus === "loading" ? true : false}
            >
                {requestStatus === "loading" ? <Loader /> : "Registration"}
            </Button>
        </AuthForm>
    );
}

export default RegisterPage;