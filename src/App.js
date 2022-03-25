import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  // Switch,
  Routes,
  Route,
  Link
} from "react-router-dom";


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

import List from './University/List'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  componentDidMount = () => {
    // 
  }


  render() {

    let appLayout = <>
        <header className="App-header">
          <p>Xendit Frontend Engineering</p>
        </header>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Xendit</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="me-auto" navbar>
                <NavItem>
                  <NavLink href="/">Universities</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>

        <Router>
          <Routes>
            <Route path='/' exact element={<List/>} />
          </Routes>
        </Router>
      </>

    return (
      <div className="App">
        {appLayout}
      </div>
    );
  }
}

export default App;
