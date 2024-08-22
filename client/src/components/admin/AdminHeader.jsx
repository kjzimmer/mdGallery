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
          <Nav.Link href="/admin/gllery/">Gallery</Nav.Link>
            <Nav.Link href="/admin/artwork/add/">Add Art</Nav.Link>
          <Nav.Link href="/admin/contacts/">Inquiries</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/admin/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/admin/security">Security</NavDropdown.Item>
              <NavDropdown.Item href="/admin/other">Other</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={userServices.logout}>Sign Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
