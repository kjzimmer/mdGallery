import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { userServices } from '../../services/userServices';

export function AdminHeader() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary  sticky-top">
      <Container>
        <Navbar.Brand>Administration</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link href="/admin/contacts/">Inquiries</Nav.Link>
          <Nav.Link href="/admin/artwork/">Art</Nav.Link>
            <Nav.Link href="/admin/artwork/add/">Add Art</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/underConstruction">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/underConstruction">Security</NavDropdown.Item>
              <NavDropdown.Item href="/underConstruction">Other</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={userServices.logout}>Sign Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
