import React from "react";

import AuthForm from "../components/Forms/AuthForm.jsx";
import Control from "../components/Control.jsx";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";

const LoginPage = () => {
    return (
        <AuthForm
            variant="login"
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

            <span className="form-question">
                Dont have an account?
                <Link className="form__link" to="/auth/register">Sign Up</Link>
            </span>

            <Button type="submit" className="form__submit">
                Log In
            </Button>
        </AuthForm>
    );
}

export default LoginPage;