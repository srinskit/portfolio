import React from "react";
import {withStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChatInput from "./ChatInput";
import TextBubble from "./Bubble";
import image from "./1.jpg";

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const m1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const m2 = "Lorem ipsum dolor sit amet.";

class Comp extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <Container maxWidth={"md"}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextBubble text={m1}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextBubble text={m2}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextBubble text={m2} image={image}/>
                    </Grid>
                    <Grid item xs={12}>
                        <ChatInput/>
                    </Grid>
                </Grid>
            </Container>
        );
    }

    handleChange = name => event => {
        const update = {[name]: event.target.value};
        this.setState(update);
    };
}

export default withStyles(styles, {withTheme: true})(Comp);