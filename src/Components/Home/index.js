import React from "react";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({});

class Home extends React.Component {
    render() {
        return (
            <div>
                <Typography variant={"h1"}>
                    Hi.
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Home);