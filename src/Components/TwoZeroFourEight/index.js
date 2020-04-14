import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {Paper} from "@material-ui/core";
import Tile from "./Tile";
import {Swipeable} from "react-swipeable"
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from '@material-ui/icons/Settings';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';


const styles = theme => ({
    root: {
        padding: theme.spacing(0, 2),
    },
    header: {
        margin: theme.spacing(4, 0, 2, 0),
        padding: theme.spacing(0, 1),
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    title: {},
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
    },
    settingsPaper: {
        margin: theme.spacing(2, 0, 2, 0),
        padding: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 80,
    },
    gridSizeSelectorWrapper: {
        display: "flex",
        alignItems: "center",
    },
});

const dirs = ["Up", "Down", "Left", "Right"];


class TwoZeroFourEight extends React.Component {
    constructor(props) {
        super(props);
        const defaultN = 4, defaultM = 4;
        this.swipeConfig = {};
        for (let i = 0; i < dirs.length; ++i) {
            this.swipeConfig[`onSwiped${dirs[i]}`] = this.onMove.bind(this, dirs[i]);
        }
        this.state = {
            stage: "",
            settingsOpen: false,
            gridN: defaultN,
            gridM: defaultM,
            tiles: initTiles(defaultN, defaultM),
        };
        document.addEventListener("keyup", (event) => {
            const keyName = event.key;
            this.handleKeyUp(keyName);
        }, false);

    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Container className={classes.root} maxWidth={"sm"}>
                    <div className={classes.header}>
                        <div><Typography className={classes.title} variant={"h2"}>2048</Typography></div>
                        <div>
                            <Grid container>
                                <Grid item>
                                    <IconButton>
                                        <InfoOutlinedIcon fontSize={"large"}/>
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={this.onSettingOpen}>
                                        <SettingsIcon fontSize={"large"}/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    {this.gameView()}
                </Container>
                {this.settingsView()}
            </React.Fragment>
        );
    }

    gameView() {
        const {classes} = this.props;
        const {tiles} = this.state;
        return (
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
        );
    }

    settingsView() {
        const {classes} = this.props;
        const {settingsOpen, gridN, gridM} = this.state;
        return (
            <Dialog open={settingsOpen} onClose={this.onSettingClose} maxWidth={"sm"} fullWidth>
                <DialogTitle>Settings</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Grid size
                    </DialogContentText>
                    <div className={classes.gridSizeSelectorWrapper}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <Select
                                value={gridN}
                                onChange={this.onChangeGridN}
                            >
                                {getGridSizeMenuItems()}
                            </Select>
                        </FormControl>
                        <ClearIcon fontSize={"large"}/>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <Select
                                value={gridM}
                                onChange={this.onChangeGridM}
                            >
                                {getGridSizeMenuItems()}
                            </Select>
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant={"outlined"} onClick={this.onSettingClose} color="primary">
                        Back
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    onSettingOpen = () => {
        this.setState({settingsOpen: true});
    };

    onSettingClose = () => {
        this.setState({settingsOpen: false});
    };

    onChangeGridN = (event) => {
        const gridN = event.target.value;
        this.setState(prev => ({gridN, tiles: initTiles(gridN, prev.gridM)}));
    };

    onChangeGridM = (event) => {
        const gridM = event.target.value;
        this.setState(prev => ({gridM, tiles: initTiles(prev.gridN, gridM)}));
    };

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
        const r = tiles.length, c = tiles[0].length;
        let n = dir === "Up" || dir === "Down" ? c : r;
        const newTiles = makeTiles(r, c);
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

function getGridSizeMenuItems() {
    const items = [];
    for (let i = 2; i <= 8; ++i) {
        items.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
    }
    return items;
}

function getRandomTileValue() {
    return 2;
}

function initTiles(n, m) {
    const tiles = [];
    for (let i = 0; i < n; ++i) {
        tiles.push([]);
        for (let j = 0; j < m; ++j) {
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
            if (!tiles[i][j]) {
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