import React from "react";
import {withStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Item from "./Item";

const styles = theme => ({});

const items = [
    {
        startTime: 0, endTime: 50,
        title: "One", description: "Do One. Or don't. YOLO.",
    },
    {
        startTime: 50, endTime: 100,
        title: "Two", description: "Do Two. Or don't. YOLO.",
    },
    {
        startTime: 100, endTime: 200,
        title: "Three", description: "Do Three. Or don't. YOLO.",
    },
    {
        startTime: 200, endTime: 300,
        title: "Four", description: "Do Four. Or don't. YOLO.",
    },
    {
        startTime: 300, endTime: 400,
        title: "Five", description: "Do Five. Or don't. YOLO.",
    },
    {
        startTime: 400, endTime: 500,
        title: "Six", description: "Do Six. Or don't. YOLO.",
    },
    {
        startTime: 500, endTime: 600,
        title: "Seven", description: "Do Seven. Or don't. YOLO.",
    },
    {
        startTime: 600, endTime: 700,
        title: "Eight", description: "Do Eight. Or don't. YOLO.",
    },
    {
        startTime: 700, endTime: 800,
        title: "Nine", description: "Do Nine. Or don't. YOLO.",
    },
    {
        startTime: 800, endTime: 900,
        title: "Ten", description: "Do Ten. Or don't. YOLO.",
    },
    {
        startTime: 900, endTime: 1000,
        title: "Eleven", description: "Do Eleven. Or don't. YOLO.",
    },
    {
        startTime: 1000, endTime: 1440,
        title: "Twelve", description: "Do Twelve. Or don't. YOLO.",
    },
];

class Comp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: items,
            active: {},
            expanded: -1,
        };
    }

    render() {
        const {items, active, expanded} = this.state;
        return (
            <Container maxWidth={"md"}>
                {
                    items.map((item, i) =>
                        <Item
                            index={i}
                            onClick={this.onItemClick}
                            item={item}
                            expanded={i === expanded}
                            active={active[i]}
                            key={i}
                        />
                    )
                }
            </Container>
        );
    }

    componentDidMount() {
        const timeout = 60 * 1000;
        this.updateCompleted();
        this.updateTimer = setInterval(this.updateCompleted.bind(this), timeout);
    }

    componentWillUnmount() {
        clearInterval(this.updateTimer);
    }

    updateCompleted() {
        const {items} = this.state;
        const newItems = [];
        const active = {};
        const d = new Date();
        let curr = d.getHours() * 60 + d.getMinutes();
        for (let i = 0; i < items.length; ++i) {
            let completed = -1, start = items[i].startTime, end = items[i].endTime;
            if (start <= curr && curr < end)
                completed = Math.floor(100 * (curr - start) / (end - start));
            if (completed !== -1) {
                active[i] = true;
                newItems.push({...items[i], completed});
            } else {
                active[i] = false;
                newItems.push(items[i]);
            }
        }
        this.setState({items: newItems, active});
    }

    onItemClick = (index) => {
        this.setState((prev) => ({expanded: prev.expanded === index ? -1 : index}));
    };
}

export default withStyles(styles, {withTheme: true})(Comp);