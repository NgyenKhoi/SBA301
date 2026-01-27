import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const location = useLocation();

  return (
    <BootstrapNavbar 
      expand="lg" 
      sticky="top"
      style={{ 
        backgroundColor: 'var(--primary-color)',
        borderBottom: '3px solid var(--accent-color)'
      }}
      variant="dark"
    >
      <Container>
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/"
          style={{ 
            color: 'var(--white)',
            fontWeight: '700',
            fontSize: '1.5rem'
          }}
        >
          🌺 Orchid Shop
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              active={location.pathname === '/'}
              style={{ 
                color: location.pathname === '/' ? 'var(--accent-color)' : 'var(--white)',
                fontWeight: location.pathname === '/' ? '600' : '400'
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/orchids" 
              active={location.pathname === '/orchids'}
              style={{ 
                color: location.pathname === '/orchids' ? 'var(--accent-color)' : 'var(--white)',
                fontWeight: location.pathname === '/orchids' ? '600' : '400'
              }}
            >
              Orchids
            </Nav.Link>
          </Nav>
          
          <Nav>
            <BootstrapNavbar.Text 
              className="me-3"
              style={{ 
                color: 'var(--white)',
                fontSize: '0.95rem'
              }}
            >
              Welcome, <strong style={{ color: 'var(--accent-color)' }}>{user?.username || user}</strong>
            </BootstrapNavbar.Text>
            <Button 
              size="sm" 
              onClick={onLogout}
              style={{
                backgroundColor: 'var(--accent-color)',
                borderColor: 'var(--accent-color)',
                color: 'var(--primary-color)',
                fontWeight: '600',
                padding: '0.5rem 1rem'
              }}
            >
              Logout
            </Button>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;