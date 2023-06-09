import React from "react";
import { Box, Typography, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
function Footer() {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100px",
                // background: "black",
                padding: "10px",
                display: "grid",
            }}
        >
            <Typography
                variant="subtitle1"
                component="div"
                sx={{
                    flexGrow: 1,
                    // color: "white",
                    fontFamily: "arial",
                    margin: "auto",
                }}
            >
                Done by{" "}
                <Link
                    href="https://github.com/DemonDia"
                    target="_blank"
                    sx={{
                        color: "black",
                        textDecoration: "none",
                        fontWeight: "bold",
                        "&:hover": {
                            color: "rgba(8, 197, 174, 1)",
                        },
                    }}
                >
                    Siang Meng
                </Link>
            </Typography>

            <Typography
                variant="subtitle2"
                component="div"
                sx={{
                    // color: "white",
                    textDecoration: "none",
                    fontWeight: "bold",
                    margin: "auto",
                    "&:hover": {
                        color: "rgba(8, 197, 174, 1)",
                    },
                }}
            >
                <Link
                    href="https://github.com/DemonDia/ama-gpt"
                    target="_blank"
                    sx={{
                        color: "black",
                        textDecoration: "none",
                        fontWeight: "bold",
                        display: "flex",
                        "&:hover": {
                            color: "rgba(8, 197, 174, 1)",
                        },
                    }}
                >
                    {" "}
                    <GitHubIcon sx={{ alignSelf: "center" }} />
                    Source code
                </Link>
            </Typography>
        </Box>
    );
}

export default Footer;
