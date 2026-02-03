import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Layout = ({ children }) => {
  const { user, logout, isAdmin, isStaff } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Đăng xuất thành công');
    navigate('/login');
  };

  return (
    <div className="vh-100 d-flex flex-column" data-bs-theme="dark" style={{ backgroundColor: '#212529' }}>
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm flex-shrink-0">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">News Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isAdmin && (
                <Nav.Link as={Link} to="/admin/accounts">
                  Quản lý tài khoản
                </Nav.Link>
              )}
              {isStaff && (
                <>
                  <Nav.Link as={Link} to="/staff/categories">
                    Quản lý danh mục
                  </Nav.Link>
                  <Nav.Link as={Link} to="/staff/news">
                    Quản lý tin tức
                  </Nav.Link>
                  <Nav.Link as={Link} to="/staff/my-news">
                    Tin tức của tôi
                  </Nav.Link>
                  <Nav.Link as={Link} to="/staff/profile">
                    Hồ sơ
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              <Navbar.Text className="me-3">
                Xin chào, {user?.username} ({user?.role})
              </Navbar.Text>
              <Button 
                variant="outline-light" 
                size="sm" 
                onClick={handleLogout}
                className="hover-effect"
              >
                Đăng xuất
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="flex-grow-1 overflow-auto">
        <Container fluid className="py-4 h-100">
          {children}
        </Container>
      </div>
    </div>
  );
};

export default Layout;