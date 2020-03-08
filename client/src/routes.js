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
                <Route path="/users" exact component={UsersPage}/>
                <Route path="/notes" exact component={NotesPage} />
                <Redirect to="/notes"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact component={AuthPage}/>
            <Route path="/register" exact component={RegPage}/>

            <Redirect to="/"/>
        </Switch>
    )
}
