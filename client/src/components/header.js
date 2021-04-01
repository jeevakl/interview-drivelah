import React from 'react'
import { Link } from 'react-router-dom'

export function Header (props) {
  return (
    <div className='row'>
      <div className='col-sm-12'>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <ul className='navbar-nav navbar-right'>
            <li className='nav-item'>
              <Link to='/' className='nav-link'>Contact Us</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
