import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateUser from "./components/createUser";

function App() {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
         
          <div className='fixed-top-navbar'>
            {" "}
            <Navbar
              bg='dark'
              variant='dark'
              className='fixed-top-navbar'
              style={{
                position: "fixed",
                top: "0",
                width: "100%",
                zIndex: "1000",
              }}>
              <Container className='d-flex justify-content-center'>
                <Navbar.Brand style={{ fontWeight: "bold", fontSize: "30px" }}>
                  News Admin Portal
                </Navbar.Brand>
              </Container>
            </Navbar>
          </div>
        </header>
        <br />
        <div className='content-wrapper' style={{ paddingTop: "80px" }}>
          {" "}
          <div style={{ marginLeft: "30px", marginRight: "30px" }}>
            <CreateUser />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
