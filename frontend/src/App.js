import React, { useState, useCallback } from "react";
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

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    const login = useCallback((id) => {
        setIsLoggedIn(true);
        setUserId(id);
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUserId(null);
    }, []);

    const routes = getRoutes(isLoggedIn);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
            <Router>
                <MainNavigation />
                <main>{routes}</main>
            </Router>
        </AuthContext.Provider>
    );
};

const getRoutes = (isLoggedIn) => {
    return isLoggedIn ? (
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
