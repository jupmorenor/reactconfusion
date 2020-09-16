import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap'
import Menu from './components/Menu'
import './App.css';

function App() {
  return (
    <>
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">Ristorante Confusion</NavbarBrand>
        </div>
      </Navbar>
      <header className="jumbotron">
        <Menu />
      </header>

    </>
  );
}

export default App;
