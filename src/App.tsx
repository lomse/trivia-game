import * as React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './components/Home'
import { Quizz } from './components/Quizz'

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/">
          <Home />
        </Route>
        <Route exact={true} path="/quizz">
          <Quizz />
        </Route>
      </Switch>
    </Router>
  )
}
