import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: "100%",
        position: "relative",
    },
    tile: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        padding: theme.spacing(1),
    },
    paper: {
        width: "100%",
        height: "100%",
        animation: "fadein .1s",
    },
    textWrapper: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
    },
}));

export default function Tile({val}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.tile}>
                {
                    val ?
                        <Paper className={classes.paper} elevation={8}>
                            <div className={classes.textWrapper}>
                                <Typography align={"center"} variant={"h5"}>{val}</Typography>
                            </div>
                        </Paper>
                        : null
                }
            </div>
        </div>
    );
}
