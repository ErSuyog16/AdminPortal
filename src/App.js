import React from "react";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import Container from "react-bootstrap/Container";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import { Divider } from "rsuite";
import "../node_modules/rsuite/dist/rsuite.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import NewsArticles from "./components/NewsArticles/NewsArticles";
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
                <Navbar.Brand
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "30px",
                      paddingLeft: "39%",
                    }}>
                    News Admin Portal
                  </div>
                  <Navbar.Toggle aria-controls='basic-navbar-nav' />
                  <Navbar.Collapse
                    id='basic-navbar-nav'
                    className='justify-content-end'>
                    <Nav>
                      {/* <Button
                        variant='outline-light'
                        style={{ cursor: "pointer" }}>
                        Logout
                      </Button> */}
                    </Nav>
                  </Navbar.Collapse>
                </Navbar.Brand>
              </Container>
            </Navbar>
          </div>
        </header>

        <div>
          <div
            style={{
              position: "fixed",
              top: "40px",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: "20px",
              width: "100%",
              zIndex: "1000",
              backgroundColor: "white",
              paddingTop: "10px",
              paddingBottom: "10px",
              paddingLeft: "45%",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}>
            {/* <Link
              to='/create-user'
              style={{ textDecoration: "none", marginRight: "20px" }}>
              <b style={{ color: "green", cursor: "pointer" }}>Form</b>
            </Link>
            <Divider
              vertical
              style={{ display: "inline-block", height: "20px" }}
            />
            <Link
              to='/database'
              style={{ textDecoration: "none", marginLeft: "20px" }}>
              <b style={{ color: "green", cursor: "pointer" }}>Database</b>
            </Link> */}
            <NavLink
              to='/create-user'
              style={{
                textDecoration: "none",
                marginRight: "20px",
                color: "grey",
              }}
              activeStyle={{ color: "Black" }}>
              <b style={{ cursor: "pointer" }}>Form</b>
            </NavLink>
            <Divider vertical style={{ height: "20px" }} />
            <NavLink
              to='/NewsArticles'
              style={{
                textDecoration: "none",
                marginLeft: "20px",
                color: "grey",
              }}
              activeStyle={{ color: "black" }}>
              <b style={{ cursor: "pointer" }}>NewsArticles</b>
            </NavLink>
          </div>

          <div
            className='content-wrapper'
            style={{ paddingTop: "80px", marginTop: "60px" }}>
            <div style={{ marginLeft: "30px", marginRight: "30px" }}>
              <Switch>
                <Route path='/create-user' component={CreateUser} />
                <Route path='/NewsArticles' component={NewsArticles} />
                <Route path='/' exact component={CreateUser} />{" "}
                {/* Default route */}
              </Switch>
            </div>
          </div>
        </div>
        {/* <div className='content-wrapper' style={{ paddingTop: "80px" }}>
          {" "}
          <div style={{ marginLeft: "30px", marginRight: "30px" }}>
            <CreateUser />
          </div>
        </div> */}
      </div>
    </Router>
  );
}

export default App;
