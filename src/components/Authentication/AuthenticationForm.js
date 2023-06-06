import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { textFieldStyle } from "../../styles/AuthStyle";
import GoogleIcon from "@mui/icons-material/Google";
import { auth } from "../../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

function AuthenticationForm({ isLogin, submitTrigger }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const googleSignIn = async () => {
        const googleAuth = new GoogleAuthProvider();
        await signInWithPopup(auth, googleAuth)
            .then(() => {
                if (isLogin) {
                    toast("Logged in successfully");
                } else {
                    toast("Signed in successfully");
                }
            })
            .catch((error) => {
                toast("Something went wrong. Please try again later");
            });
    };

    const clickSubmit = async () => {
        const credentials = {
            email,
            username,
            password,
            confirmPassword,
        };
        await submitTrigger(credentials);
    };
    return (
        <Box
            sx={{
                width: {
                    xs: "90%",
                    sm: "60%",
                    lg: "40%",
                },
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
                borderRadius: "5px",
                margin: "10px auto",
                paddingTop: "10px",
                paddingBottom: "10px",
            }}
        >
            <Toaster />
            <Typography variant={"h4"} sx={{ textAlign: "center" }}>
                {isLogin ? "Login" : "Sign Up"}
            </Typography>
            <TextField
                sx={textFieldStyle}
                variant={"outlined"}
                label={"Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            {!isLogin && (
                <TextField
                    sx={textFieldStyle}
                    variant={"outlined"}
                    label={"Username"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            )}
            <TextField
                type={"password"}
                sx={textFieldStyle}
                variant={"outlined"}
                label={"Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {!isLogin && (
                <TextField
                    type={"password"}
                    sx={textFieldStyle}
                    variant={"outlined"}
                    label={"Confirm Password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            )}

            <Button
                sx={{
                    width: "90%",
                    margin: "10px auto",
                    background: "#08C5AE",
                    color: "white",
                    "&:hover": {
                        background: "#09AC99",
                    },
                    padding: "10px",
                }}
                variant="contained"
                onClick={() => {
                    clickSubmit();
                }}
            >
                {isLogin ? " Login " : " Sign up "}
            </Button>

            <Typography
                variant="subtitle2"
                sx={{
                    width: "90%",
                    borderBottom: "1px solid grey",
                    margin: "10px auto",
                    lineHeight: "1px",
                }}
            >
                <span style={{ padding: "1px", background: "white" }}>Or</span>
            </Typography>
            <Button
                sx={{
                    width: "90%",
                    margin: "10px auto",
                    background: "white",
                    color: "black",
                    "&:hover": {
                        background: "white",
                    },
                    padding: "10px",
                }}
                variant="contained"
                onClick={() => {
                    googleSignIn();
                }}
            >
                <GoogleIcon />
                {isLogin ? " Login " : " Sign up "}
                with Google
            </Button>
            <br />
            {isLogin ? (
                <>
                    Don't have an account? Sign up{" "}
                    <Link style={{ color: "#07AE9A" }} to="/register">
                        here
                    </Link>{" "}
                </>
            ) : (
                <>
                    Already have an account? Sign in{" "}
                    <Link style={{ color: "#07AE9A" }} to="/login">
                        here
                    </Link>{" "}
                </>
            )}
        </Box>
    );
}

export default AuthenticationForm;
