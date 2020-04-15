import React from "react";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Typewriter from "../Typewriter";

const styles = theme => ({
    root: {
        padding: theme.spacing(2),
    },
    tree: {
        flexGrow: 1,
        maxWidth: 400,
    },
});

class Home extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Typography variant={"h1"}>
                    Hi,
                </Typography>
                <Typography variant={"h3"} align={"left"}>
                    <Typewriter
                        prefix={"I speak "}
                        words={["C", "C++", "Python", "Javascript", "Tulu"]}
                        cursor={"blink"}
                        loop
                        clear
                    />
                </Typography>
                <TreeView
                    className={classes.tree}
                    defaultCollapseIcon={<ExpandMoreIcon/>}
                    defaultExpandIcon={<ChevronRightIcon/>}
                    onNodeToggle={this.handleChange}
                >
                    <TreeItem nodeId="1" label="Demos">
                        <TreeItem nodeId="8" label="2048" onClick={() => this.navigate("/2048")}/>
                        <TreeItem nodeId="9" label="Skyfall" onClick={() => this.navigate("/skyfall")}/>
                        <TreeItem nodeId="2" label="Sacrifice" onClick={() => this.navigate("/sacrifice")}/>
                        <TreeItem nodeId="7" label="Give me space" onClick={() => this.navigate("/GiveMeSpace")}/>
                        <TreeItem nodeId="3" label="Timetable" onClick={() => this.navigate("/timetable")}/>
                        <TreeItem nodeId="4" label="Chat" onClick={() => this.navigate("/you")}/>
                        <TreeItem nodeId="5" label="Calc" onClick={() => this.navigate("/calc")}/>
                        <TreeItem nodeId="6" label="Quora" onClick={() => this.navigate("/quora")}/>
                    </TreeItem>
                </TreeView>
            </div>
        );
    }

    navigate = (route) => this.props.history.push(route);
}

export default withStyles(styles, {withTheme: true})(Home);