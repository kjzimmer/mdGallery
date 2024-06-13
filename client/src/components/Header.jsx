import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Master Chef</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/books/">Recipes</Nav.Link>
            <Nav.Link href="/books/add/">Add Recipe</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/underConstruction">Contact</NavDropdown.Item>
              <NavDropdown.Item href="/underConstruction">Security</NavDropdown.Item>
              <NavDropdown.Item href="/underConstruction">Other</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/underConstruction">Sign Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
