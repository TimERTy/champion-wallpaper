import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles(theme => ({
    appBar: {
        top: "auto",
        bottom: 0
    },
    grow: {
        flexGrow: 1
    }
}));

export default function BottomAppBar() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar />
            </AppBar>
        </React.Fragment>
    );
}
