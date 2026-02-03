import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AccountManagement from './pages/admin/AccountManagement';
import CategoryManagement from './pages/staff/CategoryManagement';
import NewsManagement from './pages/staff/NewsManagement';
import MyNews from './pages/staff/MyNews';
import Profile from './pages/staff/Profile';

// Import Bootstrap CSS and Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const Unauthorized = () => (
  <div className="text-center py-5">
    <h2>Không có quyền truy cập</h2>
    <p>Bạn không có quyền truy cập vào trang này.</p>
  </div>
);

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/" replace />} 
        />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/accounts" element={
          <ProtectedRoute requiredRole="ADMIN">
            <Layout>
              <AccountManagement />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Staff Routes */}
        <Route path="/staff/categories" element={
          <ProtectedRoute requiredRole="STAFF">
            <Layout>
              <CategoryManagement />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/staff/news" element={
          <ProtectedRoute requiredRole="STAFF">
            <Layout>
              <NewsManagement />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/staff/my-news" element={
          <ProtectedRoute requiredRole="STAFF">
            <Layout>
              <MyNews />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/staff/profile" element={
          <ProtectedRoute requiredRole="STAFF">
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/unauthorized" element={
          <Layout>
            <Unauthorized />
          </Layout>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
