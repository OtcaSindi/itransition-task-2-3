import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import UsersPage from './pages/UsersPage'
import RegPage from './pages/RegPage'
import AuthPage from "./pages/AuthPage"
import NotesPage from "./pages/NotesPage"

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/users" exact>
                    <UsersPage />
                </Route>
                <Route path="/notes" exact>
                    <NotesPage />
                </Route>
                <Redirect to="/notes" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Route path="/register" exact>
                <RegPage />
            </Route>

            <Redirect to="/" />
        </Switch>
    )
}
