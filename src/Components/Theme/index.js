import {createMuiTheme} from "@material-ui/core";
import {grey, blue} from "@material-ui/core/colors";

const paperColor = "rgba(30,30,30)";

const DarkTheme = createMuiTheme({
    palette: {
        type: "dark",
        background: {
            default: "#121212"
        },
        primary: {
            main: blue[500]
        },
        secondary: {
            main: grey[500]
        },
    },
    overrides: {
        MuiPaper: {
            root: {
                backgroundColor: paperColor,
            }
        },
        MuiContainer: {
            root: {
                paddingTop: "16px",
                paddingBottom: "16px",
            }
        }
    }
});

export {DarkTheme};
