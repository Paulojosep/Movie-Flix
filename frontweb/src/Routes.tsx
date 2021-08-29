import {Route, Router, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Auth";
import Catalog from "./pages/Catalog";
import MovieDetails from './pages/Catalog/Components/MovieDetails';
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
                <Route path="/movies/:movieId" exact>
                    <MovieDetails />
                </Route>
            </Switch>
        </Router>
    );
}

export default Routes;