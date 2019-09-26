import React from "react";
import {withStyles} from "@material-ui/core";

const styles = theme => ({});

class Contact extends React.Component {
    render() {
        return (
            <div>
                Contact.
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Contact);