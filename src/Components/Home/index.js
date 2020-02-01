import React from "react";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        padding: theme.spacing(2),
    }
});

class Home extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Typography variant={"h1"}>
                    Hi.
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Home);