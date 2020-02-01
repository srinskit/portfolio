import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Attachment';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(.5, 1),
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: theme.spacing(1),
    },
    divider: {
        height: 28,
        margin: theme.spacing(.5),
    },
}));

export default function CustomizedInputBase() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Your message"
                inputProps={{'aria-label': 'type your message'}}
            />
            <IconButton className={classes.iconButton} aria-label="search">
                <SearchIcon/>
            </IconButton>
            <Divider className={classes.divider} orientation="vertical"/>
            <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                <SendIcon/>
            </IconButton>
        </Paper>
    );
}