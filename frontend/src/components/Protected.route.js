import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Utils from '../util/Utils';

export default function ProtectedRoute({
    component: Component,
    ...rest
}) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (Utils.isAuthenticated()) {
                    return <Component {...props} />;
                }
                return (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {
                                from: props.location,
                            },
                        }}
                    />
                );
            }}
        />
    )
}
