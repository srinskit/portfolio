import React from "react";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";


const styles = theme => ({
    root: {
        padding: theme.spacing(2),
    }
});

class Comp extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Typography variant={"h2"} align={"center"}>
                    To 4 or !4
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Comp);