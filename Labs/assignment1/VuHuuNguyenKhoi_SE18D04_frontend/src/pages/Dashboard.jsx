import { useAuth } from '../context/AuthContext';
import AdminDashboard from './admin/AdminDashboard';
import StaffDashboard from './staff/StaffDashboard';

const Dashboard = () => {
  const { user, isAdmin, isStaff } = useAuth();
  
  if (isAdmin) {
    return <AdminDashboard user={user} />;
  }
  
  if (isStaff) {
    return <StaffDashboard user={user} />;
  }
  
  return (
    <div className="text-center py-5">
      <h2>Chào mừng, {user?.username}!</h2>
      <p className="text-muted">Vai trò: {user?.role}</p>
      <div className="alert alert-warning mt-4">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Không xác định được vai trò của bạn trong hệ thống.
      </div>
    </div>
  );
};

export default Dashboard;