import React from "react";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const styles = theme => ({
    card: {
        maxWidth: "70%",
        display: "inline-block",
    },
    media: {width: "100%"},
    content: {},
});

class Comp extends React.Component {
    render() {
        const {classes, text, image} = this.props;
        return (
            <Card className={classes.card}>
                {
                    image ?
                        <CardActionArea>
                            <img
                                alt={image}
                                className={classes.media}
                                src={image}
                            />
                        </CardActionArea>
                        : null
                }
                {
                    text ?
                        <CardContent className={classes.content}>
                            <Typography>
                                {text}
                            </Typography>
                        </CardContent>
                        : null
                }

            </Card>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Comp);