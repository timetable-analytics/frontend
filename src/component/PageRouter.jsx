import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {Routes} from "../routes/routes";

const PageRouter = () => {

    return (
        <Switch>
            {Routes.map(route =>
                <Route
                    component={route.component}
                    path={route.path}
                    exact={route.exact}
                    key = {route.key}
                />
            )}
            <Redirect to="/main"/>
        </Switch>
    );
};

export default PageRouter;