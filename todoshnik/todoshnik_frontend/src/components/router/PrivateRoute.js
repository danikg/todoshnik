import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

export function PrivateRoute({ component: Component, loggedIn, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                loggedIn === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{ pathname: "/login/", state: { from: props.location } }}
                    />
                )
            }
        />
    );
}

PrivateRoute.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
};

export default PrivateRoute;
