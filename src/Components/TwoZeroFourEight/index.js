import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {blue, grey, red} from "@material-ui/core/colors";
import classNames from "classnames";
import LinearProgress from "@material-ui/core/LinearProgress";
import withWidth from "@material-ui/core/withWidth";
import {TextField} from "@material-ui/core";

const styles = theme => ({
    root: {
        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(4, 4),
        },
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(4, 4),
        },
    },
    phrase: {
        padding: theme.spacing(4, 0),
    },
    done: {
        color: grey[200],
    },
    current: {
        color: blue[500],
    },
    rest: {
        color: grey[800],
    },
    err: {
        color: red[500],
    }
});

class Skyfall extends React.Component {
    constructor(props) {
        super(props);
        const phrase = getPhrase();
        this.state = {
            stage: 0,
            index: 0,
            phrase: phrase,
            typographyVariant: this.getVariant(phrase),
            err: false,
        };
        document.addEventListener("keyup", (event) => {
            const keyName = event.key;
            this.handleKeyUp(keyName);
        }, false);

    }

    render() {
        const {classes} = this.props;
        const {phrase, index, stage, err, typographyVariant} = this.state;
        return (
            <Container className={classes.root}>
                <LinearProgress variant="determinate" value={100 * index / phrase.length}/>
                <Typography
                    className={classes.phrase}
                    variant={typographyVariant}
                    align={"center"}
                >
                    <span className={classes.done}>{phrase.slice(0, index)}</span>
                    <span className={classNames({[classes.current]: true, [classes.err]: err})}>{phrase[index]}</span>
                    <span className={classes.rest}>{phrase.slice(index + 1)}</span>
                </Typography>
                <TextField autoFocus fullWidth style={{display: "none"}}/>
            </Container>
        );
    }

    handleKeyUp(key) {
        this.setState(({phrase, index}) => {
            if (phrase && index < phrase.length) {
                if (key.toLowerCase() === phrase[index].toLowerCase()) {
                    ++index;
                    if (index === phrase.length) {
                        return {index, stage: 2};
                    }
                    return {index, err: false};
                } else {
                    return {err: true};
                }

            }
        })
    }

    onPhraseDone() {

    }

    getVariant(phrase) {
        const {width} = this.props;
        const length = phrase.length;
        const desktopBP = [95, 65, 47, 37, 23, 0];
        const mobileBP = [22, 16, 0, 0, 0, 0];
        let breakpoints;
        if (/xs/.test(width)) {
            breakpoints = mobileBP;
        } else {
            breakpoints = desktopBP;
        }
        for (let i = 0; i < 6; ++i) {
            if (length > breakpoints[i]) {
                return `h${6 - i}`;
            }
        }
    }
}

function getPhrase() {
    const phrases = [
        "Age cannot wither her, nor custom stale her infinite variety",
        "Batten down the hatches",
        "Channel surfing",
        "Dead as a doornail",
        "Eeny, meeny, miny, mo",
        "From sea to shining sea",
        "srinskit",
        "The plot of Skyfall is unlike previous Bond films",
    ];
    return phrases[getRandomInt(phrases.length)];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


export default withWidth()(withStyles(styles, {withTheme: true})(Skyfall));