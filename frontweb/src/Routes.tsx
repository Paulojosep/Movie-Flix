import {Route, Router, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Auth";
import Catalog from "./pages/Catalog";
import history from "./util/history";

const Routes = () => {
    return (
        <Router history={history}>
            <NavBar />
            <Switch>
                <Redirect from="/" to="/auth/login" exact />
                <Route path="/auth">
                    <Home />
                </Route>
                <Route path="/movies" exact>
                    <Catalog />
                </Route>
            </Switch>
        </Router>
    );
}

export default Routes;