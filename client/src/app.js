import React from 'react'
import './scss/app.scss'

import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Home } from './pages/home'
import { Header } from './components/header'
import { GuestRoute } from './components/auth'

export function App () {
  return (
    <div className='container'>
      <Router>
        <Header />
        <Switch>
          <GuestRoute exact path='/' component={Home} />
        </Switch>
      </Router>
    </div>
  )
}
