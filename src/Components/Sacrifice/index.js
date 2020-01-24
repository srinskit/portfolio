import React from "react";
import {withStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from "@material-ui/core/IconButton";
import ClearAllIcon from '@material-ui/icons/ClearAll';
import Tooltip from "@material-ui/core/Tooltip";


const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
    }
});

class Comp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            output: "",
        };
    }

    render() {
        const {classes} = this.props;
        const {output, input} = this.state;
        return (
            <Container maxWidth={"md"}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                value={input}
                                onChange={this.handleChange("input")}
                                label={"Your text"}
                                variant={"outlined"}
                                fullWidth
                                multiline
                            />
                        </Grid>
                        {
                            output ?
                                <Grid item xs={12}>
                                    <TextField
                                        value={output}
                                        onChange={this.handleChange("output")}
                                        variant={"outlined"}
                                        fullWidth
                                        multiline
                                    />
                                </Grid>
                                : null
                        }
                        <Grid item xs={12}>
                            <DialogActions>
                                <Tooltip title={"Clear"}>
                                    <span>
                                        <IconButton
                                            aria-label="clear"
                                            disabled={!(output || input)}
                                            onClick={this.onClickClear.bind(this)}
                                        >
                                            <ClearAllIcon/>
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                {
                                    output ?
                                        <Tooltip title={"Copy"}>
                                            <IconButton
                                                aria-label="copy"
                                                onClick={this.onClickCopy.bind(this)}
                                            >
                                                <FileCopyIcon/>
                                            </IconButton>
                                        </Tooltip>
                                        : null
                                }

                                <Button
                                    onClick={this.onClickRender.bind(this)}
                                    variant={"outlined"}
                                    disabled={!input}
                                >
                                    Render
                                </Button>
                            </DialogActions>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        );
    }

    onClickRender() {
        this.setState({output: sacrifice(this.state.input)});
    }

    onClickClear() {
        this.setState({output: "", input: ""});
    }

    onClickCopy() {
        copyToClipBoard(this.state.output);
    }

    handleChange = name => event => {
        const update = {[name]: event.target.value};
        this.setState(update);
    };
}

function sacrifice(text) {
    let cap = true, op = "", ch, i;
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (i = 0; i < text.length; ++i) {
        ch = text.charAt(i);
        if (letters.includes(ch)) {
            if (cap) {
                ch = ch.toUpperCase();
            } else {
                ch = ch.toLowerCase();
            }
            cap = !cap;
        }
        op += ch;
    }
    return op;
}

function copyToClipBoard(content) {
    navigator.clipboard.writeText(content);
}

export default withStyles(styles, {withTheme: true})(Comp);