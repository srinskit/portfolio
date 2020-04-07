import React from "react";
import {withStyles} from "@material-ui/core";
import {MuiThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import BaseContext from "./BaseContext";
import {DarkTheme} from "./Components/Theme";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import Sacrifice from "./Components/Sacrifice";
import GiveMeSpace from "./Components/GiveMeSpace";
import You from "./Components/You";
import Quora from "./Components/Quora";
import Calc from "./Components/Calc";
import Timetable from "./Components/Timetable";
import FourZeroFour from "./Components/FourZeroFour";
import Skyfall from "./Components/Skyfall";
import TwoZeroFourEight from "./Components/TwoZeroFourEight";

const styles = theme => ({});


class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={DarkTheme}>
                <React.Fragment>
                    <CssBaseline/>
                    <BaseContext.Provider>
                        <Router>
                            <div>
                                <Switch>
                                    <Route exact path="/" component={Home}/>
                                    <Route path="/contact" component={Contact}/>
                                    <Route path="/sacrifice" component={Sacrifice}/>
                                    <Route path="/GiveMeSpace" component={GiveMeSpace}/>
                                    <Route path="/you" component={You}/>
                                    <Route path="/quora/:query?" component={Quora}/>
                                    <Route path="/calc" component={Calc}/>
                                    <Route path="/timetable" component={Timetable}/>
                                    <Route path="/skyfall" component={Skyfall}/>
                                    <Route path="/2048" component={TwoZeroFourEight}/>
                                    <Route path="/" component={FourZeroFour}/>
                                </Switch>
                            </div>
                        </Router>
                    </BaseContext.Provider>
                </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles, {withTheme: true})(App);