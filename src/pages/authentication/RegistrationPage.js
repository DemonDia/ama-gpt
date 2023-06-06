import React, { useEffect } from "react";
import { auth } from "../../firebaseConfig";
import AuthenticationForm from "../../components/Authentication/AuthenticationForm";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function RegistrationPage() {
    const nav = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                nav("/");
            }
        });
    }, []);
    const registerUser = async (credentials) => {
        const { email, password, username, confirmPassword } = credentials;
        let currErrors = [];
        if (username.length == 0) {
            currErrors.push("Username cannot be empty");
        }
        if (password.length < 6) {
            currErrors.push("Password must be at least 6 characters");
        }
        if (password != confirmPassword) {
            currErrors.push("Passwords do not match");
        }
        if (currErrors.length > 0) {
            toast(currErrors.join("\n"));
        } else {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(async () => {
                    const currUser = auth.currentUser;
                    if (currUser) {
                        await updateProfile(currUser, {
                            displayName: username,
                        })
                            .then(() => {
                                toast("Signed up successfully");
                            })
                            .catch((error) => {
                                toast(
                                    "Something went wrong. Please try again later"
                                );
                            });
                    } else {
                        toast("Something went wrong. Please try again later");
                    }
                })
                .catch((err) => {
                    console.log("err", err);
                    toast(err.message);
                });
        }
    };
    return (
        <div>
            <div>
                <Toaster />
                <AuthenticationForm
                    isLogin={false}
                    submitTrigger={registerUser}
                />
            </div>
        </div>
    );
}

export default RegistrationPage;
