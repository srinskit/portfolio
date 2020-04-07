import React from "react";
import {withStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";


const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
    }
});

class Comp extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <Container maxWidth={"md"}>
                <Paper className={classes.paper}>
                    <Typography align={"center"}>
                        A concept calculator will come up here. One day.
                    </Typography>
                </Paper>
            </Container>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Comp);