import React from "react";
import {withStyles} from "@material-ui/core";

const styles = theme => ({});

class Home extends React.Component {
    render() {
        return (
            <div>
                Home.
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Home);