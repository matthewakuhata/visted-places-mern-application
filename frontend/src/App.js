import React, { Suspense } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";

import { MainNavigation } from "./shared/components/Navigation";
import { LoadingSpinner } from "./shared/components/UI";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const Users = React.lazy(() => import("./user/pages/Users"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

const App = () => {
    const { login, logout, token, userId } = useAuth();
    const routes = getRoutes(token);

    return (
        <AuthContext.Provider
            value={{ isLoggedIn: !!token, token, login, logout, userId }}
        >
            <Router>
                <MainNavigation />
                <main>
                    <Suspense
                        fallback={
                            <div className="center">
                                <LoadingSpinner />
                            </div>
                        }
                    >
                        {routes}
                    </Suspense>
                </main>
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
