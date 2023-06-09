import React, { useEffect, useState, useRef } from "react";
// show profile if logged in
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../configurations/firebaseConfig";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    AppBar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
    Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../pictures/AMAGPT copy.png";
import defaultProfilePic from "../../pictures/defaultProfilePicture.png";
// import {MenuIcon} from "@mui/material/icons";
import toast, { Toaster } from "react-hot-toast";
const drawerWidth = 240;
const pages = [
    {
        label: "AMA",
        to: "/ama",
    },
    {
        label: "Image generator",
        to: "/image-generator",
    },
];

function Navbar(props) {
    const location = useLocation();
    const { window } = props;
    const [hover, setHover] = useState(false);
    const [currUser, setCurrUser] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const nav = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrUser(user);
                localStorage.setItem("userId", user.uid);
            } else {
                setCurrUser(null);
                localStorage.removeItem("userId");
            }
        });
    }, []);
    const ref = useRef(null);

    const drawer = (
        <Box onClick={handleDrawerToggle}>
            <Typography variant="h6" sx={{ my: 2 }}>
                AMA-GPT
            </Typography>
            <Divider />
            <List>
                <ListItem>
                    {currUser ? <>{currUser.displayName}</> : <></>}
                </ListItem>
                {pages.map((item, index) => {
                    const { label, to } = item;

                    return (
                        <ListItem disablePadding key={index}>
                            <Link
                                to={to}
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                    width: "100%",
                                }}
                            >
                                <ListItemButton sx={{ textAlign: "left" }}>
                                    <ListItemText primary={label} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    );
                })}
                {!currUser ? (
                    <Link
                        to={"/login"}
                        style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                        }}
                    >
                        <ListItemButton sx={{ textAlign: "left" }}>
                            <ListItemText primary={"Login"} />
                        </ListItemButton>
                    </Link>
                ) : (
                    <></>
                )}
                {currUser ? (
                    <>
                        <ListItem
                            disablePadding
                            onClick={() => {
                                goToProfile();
                            }}
                        >
                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                    width: "100%",
                                }}
                            >
                                <ListItemButton sx={{ textAlign: "left" }}>
                                    Profile
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem
                            disablePadding
                            onClick={() => {
                                handleLogout();
                            }}
                        >
                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                    width: "100%",
                                }}
                            >
                                <ListItemButton sx={{ textAlign: "left" }}>
                                    Logout
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    </>
                ) : (
                    <></>
                )}
            </List>
        </Box>
    );

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                toast("Logged out");
                nav("/login");
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
                toast("Something went wrong. Please try again later");
            });
    };

    const emptyClickFunction = () => {};

    const goToProfile = () => {
        nav("/profile");
    };

    const container =
        window !== undefined ? () => window().document.body : undefined;

    const profileItems = [
        {
            label: currUser
                ? currUser.displayName
                    ? currUser.displayName
                    : "User"
                : "",
            handleClick: emptyClickFunction,
        },
        { label: "Profile", handleClick: goToProfile },
        { label: "Logout", handleClick: handleLogout },
    ];
    return (
        <Box
            sx={{
                display: "flex",
                textAlign: "center",
                boxShadow: "none",
                // opacity: hover ? "1" : "0.7",
            }}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
        >
            <Toaster />
            <AppBar
                component="nav"
                sx={{
                    background: hover ? "white" : "rgba(255, 255, 255, 0.4)",
                    color: "black",
                    transition: "background 0.5s",
                }}
            >
                <Toolbar>
                    <IconButton
                        color="black"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/">
                        <img src={logo} style={{ height: "50px" }} />
                    </Link>
                    <Box
                        sx={{
                            display: { xs: "none", sm: "block" },
                            width: "100%",
                        }}
                    >
                        {pages.map((item, index) => {
                            const { label, to } = item;
                            return (
                                <Link
                                    to={to}
                                    sx={{
                                        textDecoration: "none",
                                    }}
                                    key={index}
                                >
                                    <Button
                                        sx={{
                                            color:
                                                location &&
                                                location.pathname == to
                                                    ? "#089786"
                                                    : "black",
                                            fontWeight:
                                                location &&
                                                location.pathname == to
                                                    ? "bold"
                                                    : "normal",
                                            textDecoration:
                                                location &&
                                                location.pathname == to
                                                    ? "underline"
                                                    : "none",
                                            scale:
                                                location &&
                                                location.pathname == to
                                                    ? "1.1"
                                                    : "1",
                                            background: "none",
                                            float: "left",
                                            transition: "all 0.5s",
                                            "&:hover": {
                                                color: "#089786",
                                                textDecoration: "underline",
                                                background: "none",
                                            },
                                        }}
                                        key={index}
                                    >
                                        {label}
                                    </Button>
                                </Link>
                            );
                        })}
                        {currUser ? (
                            <>
                                <Box sx={{ flexGrow: 0, float: "right" }}>
                                    <Tooltip title="Profile">
                                        <IconButton
                                            onClick={handleOpenUserMenu}
                                            sx={{ p: 0 }}
                                        >
                                            <img
                                                alt="Profile Picture"
                                                src={
                                                    currUser.photoURL
                                                        ? currUser.photoURL
                                                        : defaultProfilePic
                                                }
                                                style={{
                                                    borderRadius: "50%",
                                                    maxHeight: "40px",
                                                    maxWidth: "40px",
                                                }}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: "45px" }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {profileItems.map((profileItem) => {
                                            const { label, handleClick } =
                                                profileItem;
                                            return (
                                                <MenuItem
                                                    key={label}
                                                    onClick={() => {
                                                        handleCloseUserMenu();
                                                        handleClick();
                                                    }}
                                                >
                                                    <Typography textAlign="center">
                                                        {label}
                                                    </Typography>
                                                </MenuItem>
                                            );
                                        })}
                                    </Menu>
                                </Box>
                            </>
                        ) : (
                            <>
                                {" "}
                                <Link to="/login">
                                    <Button
                                        sx={{
                                            color: "white",
                                            background: "#08C5AE",
                                            float: "right",
                                            "&:hover": {
                                                background: "#089786",
                                            },
                                        }}
                                    >
                                        Login
                                    </Button>
                                </Link>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

export default Navbar;
