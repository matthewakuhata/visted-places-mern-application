import React, { useState, useCallback, useEffect } from "react";
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
    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState(null);

    const login = useCallback((id, token, expiration) => {
        setToken(token);
        setUserId(id);
        const tokenExpiration =
            expiration || new Date(new Date().getTime() + 1000 * 60 * 60);

        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId: id,
                token,
                expiration: tokenExpiration.getTime(),
            })
        );
    }, []);

    useEffect(() => {
        const { userId, token, expiration } =
            JSON.parse(localStorage.getItem("userData")) || {};
        if (!userId || !token || !expiration) return;

        const crrTime = new Date().getTime();
        const isValid = expiration > crrTime;
        if (isValid) {
            login(userId, token, new Date(expiration));
        }
    }, [login]);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem("userData");
    }, []);

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
