import React from "react";
import AuthForm from "../components/Forms/AuthForm.jsx";
import Control from "../components/Control.jsx";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import Loader from "../components/Loader.jsx";

const RegisterPage = () => {
    return (
        <AuthForm
            variant="register"
            onSubmit={null}
        >
            <Control
                type="text"
                id="login"
                onChange={null}
                placeholder="e.g. mylogin"
            >
                Login
            </Control>

            <Control
                type="text"
                id="password"
                onChange={null}
                placeholder="e.g. qwert12345"
            >
                Password
            </Control>

            <Control
                type="text"
                id="r_password"
                onChange={null}
                placeholder="e.g. qwert12345"
            >
                Password
            </Control>

            <Button type="submit" className="form__submit">
                Registration
            </Button>
        </AuthForm>
    );
}

export default RegisterPage;