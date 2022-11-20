import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import { MainNavigation } from "./shared/components/Navigation";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const App = () => {
    const { login, logout, token, userId } = useAuth();
    const routes = getRoutes(token);

    return (
        <AuthContext.Provider
            value={{ isLoggedIn: !!token, token, login, logout, userId }}
        >
            <Router>
                <MainNavigation />
                <main>{routes}</main>
            </Router>
        </AuthContext.Provider>
    );
};

const getRoutes = (token) => {
    return token ? (
        <Switch>
            <Route path="/" exact>
                <Users />
            </Route>
            <Route path="/places/new" exact>
                <NewPlace />
            </Route>
            <Route path="/:userid/places" exact>
                <UserPlaces />
            </Route>
            <Route path="/places/:placeid" exact>
                <UpdatePlace />
            </Route>
            <Redirect to="/" />
        </Switch>
    ) : (
        <Switch>
            <Route path="/" exact>
                <Users />
            </Route>
            <Route path="/:userid/places" exact>
                <UserPlaces />
            </Route>
            <Route path="/auth" exact>
                <Auth />
            </Route>
            <Redirect to="/auth" />
        </Switch>
    );
};

export default App;
