import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {Paper} from "@material-ui/core";
import Tile from "./Tile";
import {Swipeable} from "react-swipeable"
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        padding: theme.spacing(0, 2),
    },
    title: {
        padding: theme.spacing(4, 0),
    },
    grid: {
        touchAction: "none",
        padding: theme.spacing(1),
    },
    row: {
        display: "flex",
        width: "100%",
    },
    tileContainer: {
        flexGrow: 1,
    }
});

const dirs = ["Up", "Down", "Left", "Right"];


class TwoZeroFourEight extends React.Component {
    constructor(props) {
        super(props);
        const n = 4;
        this.swipeConfig = {};
        for (let i = 0; i < dirs.length; ++i) {
            this.swipeConfig[`onSwiped${dirs[i]}`] = this.onMove.bind(this, dirs[i]);
        }
        this.state = {
            stage: "",
            tiles: initTiles(n),
        };
        document.addEventListener("keyup", (event) => {
            const keyName = event.key;
            this.handleKeyUp(keyName);
        }, false);

    }

    render() {
        const {classes} = this.props;
        const {tiles} = this.state;
        return (
            <Container className={classes.root} maxWidth={"sm"}>
                <Typography className={classes.title} align={"center"} variant={"h1"}>2048</Typography>
                <Swipeable {...this.swipeConfig}>
                    <Paper className={classes.grid} variant={"outlined"}>
                        {
                            tiles.map((row, i) => (
                                    <div key={`${i}`} className={classes.row}>
                                        {
                                            row.map((tile, j) =>
                                                <div className={classes.tileContainer} key={`${i},${j}`}>
                                                    <Tile val={tile}/>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            )
                        }
                    </Paper>
                </Swipeable>
            </Container>
        );
    }


    handleKeyUp(key) {
        switch (key) {
            case "ArrowUp":
            case "ArrowDown":
            case "ArrowLeft":
            case "ArrowRight":
                return this.onMove(key.slice(5));
            default:
        }
    }


    onMove(dir) {
        const {tiles} = this.state;
        const r = tiles.length, c = tiles.length;
        let n = dir === "Up" || dir === "Down" ? c : r;
        const newTiles = makeTiles(tiles.length, tiles.length);
        for (let i = 0; i < n; ++i) {
            merge(newTiles, tiles, i, dir);
        }
        if (!tilesAreEqual(tiles, newTiles)) {
            if (!addRandomTile(newTiles)) {
                this.setState({stage: "gameOver"});
            }
            this.setState({tiles: newTiles});
        }
    }


}

function getRandomTileValue() {
    return 2;
}

function initTiles(n) {
    const tiles = [];
    for (let i = 0; i < n; ++i) {
        tiles.push([]);
        for (let j = 0; j < n; ++j) {
            tiles[i].push(randInt(2) ? Math.pow(2, 1 + randInt(3)) : 0);
        }
    }
    return tiles;
}

function tilesAreEqual(tiles1, tiles2) {
    for (let i = 0; i < tiles1.length; ++i) {
        for (let j = 0; j < tiles2.length; ++j) {
            if (tiles1[i][j] !== tiles2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function addRandomTile(tiles) {
    const zeros_i = [], zeros_j = [];
    for (let i = 0; i < tiles.length; ++i) {
        for (let j = 0; j < tiles[i].length; ++j) {
            if (tiles[i][j]) {
                tiles[i][j] = tiles[i][j];
            } else {
                zeros_i.push(i);
                zeros_j.push(j);
            }
        }
    }
    if (zeros_j.length === 0) {
        return false;
    }
    const k = randInt(zeros_i.length);
    tiles[zeros_i[k]][zeros_j[k]] = getRandomTileValue();
    return true;
}

function makeTiles(r, c) {
    const ret = [];
    for (let i = 0; i < r; ++i) {
        ret.push([]);
        for (let j = 0; j < c; ++j) {
            ret[i].push(0);
        }
    }
    return ret;
}

function top(stack) {
    if (stack.length > 0) {
        return stack[stack.length - 1];
    }
    return null;
}

function push(stack, val) {
    stack.push(val);
}

function updateTop(stack, val) {
    stack[stack.length - 1] = val;
}

function push_n(stack, n, val) {
    for (let i = 0; i < n; ++i) {
        push(stack, val);
    }
}

function overlay(tiles, values, i, type) {
    if (type === "row") {
        for (let j = 0; j < tiles[i].length; ++j) {
            tiles[i][j] = values[j];
        }
    } else {
        for (let j = 0; j < tiles.length; ++j) {
            tiles[j][i] = values[j];
        }
    }
}

function magic(stack, tile, plain_push) {
    if (tile !== 0) {
        if (plain_push) {
            push(stack, tile);
            plain_push = false;
        } else {
            if (top(stack) === tile) {
                updateTop(stack, 2 * tile);
                plain_push = true;
            } else {
                push(stack, tile);
                plain_push = false;
            }
        }
    }
    return plain_push;
}

function merge(newTiles, tiles, rc, dir) {
    let stack = [], plain_push = true;
    if (dir === "Left") {
        for (let i = 0; i < tiles[rc].length; ++i) {
            plain_push = magic(stack, tiles[rc][i], plain_push);
        }
        push_n(stack, tiles[rc].length - stack.length, 0);
        overlay(newTiles, stack, rc, "row");
    } else if (dir === "Right") {
        for (let i = tiles[rc].length - 1; i >= 0; --i) {
            plain_push = magic(stack, tiles[rc][i], plain_push);
        }
        push_n(stack, tiles[rc].length - stack.length, 0);
        stack.reverse();
        overlay(newTiles, stack, rc, "row");
    } else if (dir === "Up") {
        for (let i = 0; i < tiles.length; ++i) {
            plain_push = magic(stack, tiles[i][rc], plain_push);
        }
        push_n(stack, tiles.length - stack.length, 0);
        overlay(newTiles, stack, rc, "col");
    } else if (dir === "Down") {
        for (let i = tiles.length - 1; i >= 0; --i) {
            plain_push = magic(stack, tiles[i][rc], plain_push);
        }
        push_n(stack, tiles.length - stack.length, 0);
        stack.reverse();
        overlay(newTiles, stack, rc, "col");
    }
}

function randInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function shuffle(arr) {
    let tmp, j;
    for (let i = 0; i < arr.length; ++i) {
        j = randInt(arr.length);
        tmp = arr[j];
        arr[j] = arr[i];
        arr[i] = tmp;
    }
}

export default withStyles(styles, {withTheme: true})(TwoZeroFourEight);