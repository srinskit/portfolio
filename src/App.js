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