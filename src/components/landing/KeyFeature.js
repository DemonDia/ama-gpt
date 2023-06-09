import React from "react";
import { Typography, Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
function KeyFeature({ image, title, description, redirect, id }) {
    return (
        <Grid
            container
            spacing={0}
            id={id}
            sx={{ display: "flex", minHeight: "60vh", margin: "10px" }}
        >
            <Grid item xs={12} md={6}>
                <Box
                    sx={{
                        width: "90%",
                        minHeight: "400px",
                        height: "90%",
                        background: image ? `url(${image})` : "#05E0AC",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        borderRadius: "5px",
                        border:"none",
                        margin: "10px auto",
                    }}
                ></Box>
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    display: "block",
                    alignItems: "left",
                    margin: "10px auto",
                }}
            >
                <Box
                    sx={{
                        width: "90%",
                        minHeight: "200px",
                        height: "90%",
                        margin: "10px auto",
                    }}
                >
                    <Typography
                        textAlign={"left"}
                        variant="h3"
                        sx={{ color: "#079E7A" }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        textAlign={"left"}
                        variant="h5"
                        sx={{ margin: "5px " }}
                    >
                        {description}
                    </Typography>

                    <Link to={redirect}>
                        <Button
                            sx={{
                                float: "left",
                                color: "white",
                                background: "#08C5AE",
                                "&:hover": {
                                    background: "#089786",
                                },
                            }}
                        >
                            Try Me
                        </Button>
                    </Link>
                </Box>
            </Grid>
        </Grid>
    );
}

export default KeyFeature;
