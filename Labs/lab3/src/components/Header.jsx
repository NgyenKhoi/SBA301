import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import SearchBar from "./SearchBar";
import HomeCarousel from "./Carousel";
import { useAuth } from "../context/AuthContext"; // ✅ import AuthContext
import { LOGOUT } from "../constants/authActionTypes";

function Header({ onSearch }) {
  const { state, dispatch } = useAuth(); // Lấy trạng thái login từ context

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <>
      {/* CAROUSEL Ở TRÊN HEADER */}
      <HomeCarousel />

      {/* HEADER */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">🌸 Orchid Shop</Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">
            {/* LEFT MENU */}
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
              <Nav.Link href="/api-test">API Test</Nav.Link>
              {/* Admin menu - chỉ hiển thị cho admin */}
              {state.isAuthenticated && state.role === 'ADMIN' && (
                <Nav.Link href="/admin/orchids">Admin Panel</Nav.Link>
              )}
              <Nav.Link href="/gallery">Gallery</Nav.Link>
            </Nav>

            {/* RIGHT SIDE (SEARCH + LOGIN) */}
            <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-2">
              <SearchBar onSearch={onSearch} />

              {/* ✅ Hiển thị nút login nếu chưa đăng nhập */}
              {!state.isAuthenticated && (
                <Button
                  variant="outline-light"
                  href="/login"
                  className="w-100 w-lg-auto"
                >
                  Login
                </Button>
              )}

              {/* Hiển thị thông tin user và nút logout nếu đã đăng nhập */}
              {state.isAuthenticated && (
                <div className="d-flex align-items-center gap-2">
                  <span style={{ color: "white" }}>
                    Hi, {state.username} ({state.role})
                  </span>
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
