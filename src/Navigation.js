import React,{Component} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

export class Navigation extends Component{
    render() {
        const value = JSON.parse(localStorage.getItem('user-info'));
        let user= JSON.parse(localStorage.getItem('user-info'))
        //const history=useHistory();
        console.warn(user)
        function logout() {
            localStorage.clear();
            //history.push('register')

        }
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/app">
                            Home
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/app/project">
                            Project
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/app/ticket">
                            Ticket
                        </NavLink>

                        { value.Role === "admin" ? (
                            <NavLink className="d-inline p-2 bg-dark text-white" to="/app/users">
                            Users Management
                            </NavLink>)                      
                        : ( <div /> )
                        }
                             
                    </Nav>
                </Navbar.Collapse>
                    <Nav>
                        <NavDropdown title={user && user.name}>
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
            </Navbar>
        ) 
    }
}