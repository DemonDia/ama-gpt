import React, { useEffect, useState } from "react";
// show profile if logged in
import { Link } from "react-router-dom";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../pictures/AMAGPT copy.png";
// import {MenuIcon} from "@mui/material/icons";
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
    const { window } = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box
            onClick={handleDrawerToggle}
            sx={{ textAlign: "center", boxShadow: "none" }}
        >
            <Typography variant="h6" sx={{ my: 2 }}>
                AMA-GPT
            </Typography>
            <Divider />
            <List>
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
                <ListItem disablePadding>
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
                </ListItem>
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                component="nav"
                sx={{ background: "white", color: "black" }}
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
                                        // color: "black",
                                    }}
                                >
                                    <Button
                                        sx={{
                                            color: "black",
                                            background: "none",
                                            float: "left",
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
