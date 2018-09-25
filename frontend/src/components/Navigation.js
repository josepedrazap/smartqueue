import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navigation extends Component {
  render(){
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark">
          <a className="text-white">SmartQueue - Bienvenido José</a>
          <div className="header-right">
            <Link to="/home">
              <button type="button" className="btn btn-outline-primary ml-1" name="button"><i className="fas fa-home"></i></button>
            </Link>
            <Link to="/create_queue">
              <button type="button" className="btn_cq btn btn-outline-success ml-1" name="button"><i className="fas fa-plus-square"></i></button>
            </Link>
            <Link to="/maps">
              <button type="button" className="btn btn-outline-warning ml-1" name="button"><i className="fas fa-map-marked-alt"></i></button>
            </Link>
            <button type="button" className="btn btn-outline-info ml-1" name="button"><i className="fas fa-user"></i></button>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navigation;
