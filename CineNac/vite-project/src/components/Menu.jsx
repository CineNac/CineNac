import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function BaseMenu() {
            return (
              <>
                <Navbar fixed="top" bg="light" variant="light">
                  <Container>
                    <Navbar.Brand href="/"><img
                                    src="../imagens/logo.png"
                                    width="70"
                                    height="28"
                                    className="d-inline-block align-top"
                                    alt="CineNac"
                                        /></Navbar.Brand>
                    <Nav className="me-auto">
                     <Nav.Link href="/filmes">
                        Filmes
                    </Nav.Link>{"    "}
                      <Nav.Link href="/doces">Doces</Nav.Link>{"    "}
                      <Nav.Link href="/funcionarios">Funcionários</Nav.Link>{"    "}
                    </Nav>
                  </Container>
                </Navbar>
                </>
    )
};

export default BaseMenu;
