import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Toolbar() {
  return (

      <div>
      <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">ISBELASOFT</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/buses">Buses</Nav.Link>
                <Nav.Link href="/rutas">Rutas</Nav.Link>
                <Nav.Link href="/ciudades">Ciudades</Nav.Link>
                <Nav.Link href="/paradas">Paradas</Nav.Link>
                <Nav.Link href="/reportes">Reportes</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
</Navbar>
        
    </div>
  );
}
