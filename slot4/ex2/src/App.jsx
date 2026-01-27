import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";
import ListOrchid from "./ListOrchid";
import OrchidDetail from "./pages/OrchidDetail";
import Navbar from "./components/Navbar";
import CarouselComponent from "./components/Carousel";

// Layout cho các trang đã đăng nhập
function MainLayout({ children, showCarousel = false }) {
  const { user, logout } = useAuth();
  
  return (
    <div>
      <Navbar user={user} onLogout={logout} />
      {showCarousel && <CarouselComponent />}
      {children}
    </div>
  );
}

// Component chính của ứng dụng
function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Route đăng nhập */}
        <Route path="/login" element={<LoginForm />} />
        
        {/* Routes được bảo vệ */}
        <Route 
          path="/orchids" 
          element={
            isAuthenticated ? (
              <MainLayout showCarousel={true}>
                <ListOrchid />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        <Route 
          path="/orchids/:id" 
          element={
            isAuthenticated ? (
              <MainLayout>
                <OrchidDetail />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        {/* Redirect mặc định */}
        <Route 
          path="/" 
          element={<Navigate to={isAuthenticated ? "/orchids" : "/login"} replace />} 
        />
        
        <Route 
          path="*" 
          element={<Navigate to={isAuthenticated ? "/orchids" : "/login"} replace />} 
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;