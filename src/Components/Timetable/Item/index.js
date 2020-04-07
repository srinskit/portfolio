import React from "react";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";


const styles = theme => ({
    card: {
        margin: theme.spacing(2),
    },
    cardFocused: {
        margin: theme.spacing(2),
    },
    root: {
        padding: theme.spacing(2),
    },
    rootFocused: {
        padding: theme.spacing(2, 2),
    },
    headWrapper: {
        display: "flex",
        alignItems: "center",
    },
    titleWrapper: {
        flex: 1,
    },
    dividerWrapper: {
        padding: theme.spacing(2, 0),
    },
});

class Comp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes, item, active, expanded, onClick, index} = this.props;

        return (
            <Card className={active ? classes.cardFocused : classes.card}>
                <CardActionArea onClick={() => onClick(index)}>
                    <div className={active ? classes.rootFocused : classes.root}>
                        <div className={classes.headWrapper}>
                            <div>
                                <Typography>
                                    {getHumanTime(item.startTime)}
                                </Typography>
                            </div>
                            <div className={classes.titleWrapper}>
                                <Typography variant={"h6"} align={"center"} noWrap={true}>
                                    {item.title}
                                </Typography>
                            </div>
                            <div>
                                <Typography>
                                    {getHumanTime(item.endTime)}
                                </Typography>
                            </div>
                        </div>
                        {
                            expanded ?
                                <div>
                                    <div className={classes.dividerWrapper}>
                                        <Divider/>
                                    </div>
                                    <div><Typography align={"center"}>{item.description}</Typography></div>
                                </div> : null
                        }
                    </div>
                </CardActionArea>
                {
                    active ? <LinearProgress variant="determinate" value={item.completed}/> : null
                }
            </Card>
        );
    }
}

function getHumanTime(min) {
    let minute = min % 60;
    let hour = (min - minute) / 60;
    minute = (minute < 10 ? "0" : "") + minute;
    hour = (hour < 10 ? "0" : "") + hour;
    return `${hour}:${minute}`;
}

export default withStyles(styles, {withTheme: true})(Comp);