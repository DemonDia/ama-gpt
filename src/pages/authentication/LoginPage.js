import React, { useEffect } from "react";
import { auth } from "../../firebaseConfig";
import AuthenticationForm from "../../components/Authentication/AuthenticationForm";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function LoginPage() {
    const nav = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                nav("/");
            }
        });
    }, []);
    const loginUser = async (credentials) => {
        const { email, password } = credentials;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                toast("Logged in successfully");
            })
            .catch((err) => {
                toast(err.message);
            });
    };

    return (
        <div>
            <Toaster />
            <AuthenticationForm isLogin={true} submitTrigger={loginUser} />
        </div>
    );
}

export default LoginPage;
