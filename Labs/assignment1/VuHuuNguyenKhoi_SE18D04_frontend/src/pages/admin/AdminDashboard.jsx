import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AdminDashboard = ({ user }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="admin-dashboard">
      {/* Welcome Header */}
      <div className="welcome-header mb-5 text-center">
        <div className="welcome-card p-5 rounded-4 shadow-lg" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <div className="mb-3">
            <i className="bi bi-shield-check display-1 mb-3"></i>
          </div>
          <h1 className="display-4 fw-bold mb-3">
            Chào mừng, {user?.username}!
          </h1>
          <p className="lead mb-3">
            <i className="bi bi-star-fill me-2"></i>
            Quản trị viên hệ thống
          </p>
          <div className="time-display">
            <i className="bi bi-clock me-2"></i>
            {formatTime(currentTime)}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <Row className="mb-5">
        <Col md={4}>
          <Card className="stat-card h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div className="stat-icon mb-3">
                <i className="bi bi-people-fill display-4 text-primary"></i>
              </div>
              <h5 className="card-title">Quản lý tài khoản</h5>
              <p className="text-muted">Tạo, chỉnh sửa và quản lý tài khoản người dùng</p>
              <div className="mt-3">
                <span className="badge bg-primary fs-6">Quyền cao nhất</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div className="stat-icon mb-3">
                <i className="bi bi-gear-fill display-4 text-success"></i>
              </div>
              <h5 className="card-title">Cấu hình hệ thống</h5>
              <p className="text-muted">Thiết lập và điều chỉnh các tham số hệ thống</p>
              <div className="mt-3">
                <span className="badge bg-success fs-6">Toàn quyền</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div className="stat-icon mb-3">
                <i className="bi bi-bar-chart-fill display-4 text-warning"></i>
              </div>
              <h5 className="card-title">Báo cáo & Thống kê</h5>
              <p className="text-muted">Xem báo cáo chi tiết về hoạt động hệ thống</p>
              <div className="mt-3">
                <span className="badge bg-warning fs-6">Sắp có</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3 className="mb-4">
          <i className="bi bi-lightning-fill me-2 text-warning"></i>
          Thao tác nhanh
        </h3>
        <Row>
          <Col md={6} lg={4} className="mb-3">
            <Card className="action-card h-100 border-0 shadow-sm">
              <Card.Body className="d-flex align-items-center p-4">
                <div className="action-icon me-3">
                  <i className="bi bi-person-plus-fill fs-2 text-primary"></i>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1">Tạo tài khoản mới</h6>
                  <p className="text-muted small mb-2">Thêm người dùng vào hệ thống</p>
                  <Button 
                    as={Link} 
                    to="/admin/accounts" 
                    variant="primary" 
                    size="sm"
                    className="hover-effect"
                  >
                    <i className="bi bi-arrow-right me-1"></i>
                    Đi tới
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-3">
            <Card className="action-card h-100 border-0 shadow-sm">
              <Card.Body className="d-flex align-items-center p-4">
                <div className="action-icon me-3">
                  <i className="bi bi-list-ul fs-2 text-success"></i>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1">Xem danh sách tài khoản</h6>
                  <p className="text-muted small mb-2">Quản lý tất cả người dùng</p>
                  <Button 
                    as={Link} 
                    to="/admin/accounts" 
                    variant="success" 
                    size="sm"
                    className="hover-effect"
                  >
                    <i className="bi bi-arrow-right me-1"></i>
                    Xem ngay
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-3">
            <Card className="action-card h-100 border-0 shadow-sm">
              <Card.Body className="d-flex align-items-center p-4">
                <div className="action-icon me-3">
                  <i className="bi bi-shield-lock-fill fs-2 text-danger"></i>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1">Bảo mật hệ thống</h6>
                  <p className="text-muted small mb-2">Kiểm tra và cập nhật bảo mật</p>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    disabled
                    className="hover-effect"
                  >
                    <i className="bi bi-clock me-1"></i>
                    Sắp có
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* System Info */}
      <div className="system-info mt-5">
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-transparent border-0 pb-0">
            <h5 className="mb-0">
              <i className="bi bi-info-circle-fill me-2 text-info"></i>
              Thông tin hệ thống
            </h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="info-item mb-3">
                  <strong>Phiên bản:</strong> <span className="text-muted">v1.0.0</span>
                </div>
                <div className="info-item mb-3">
                  <strong>Trạng thái:</strong> 
                  <span className="badge bg-success ms-2">
                    <i className="bi bi-check-circle me-1"></i>
                    Hoạt động bình thường
                  </span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-item mb-3">
                  <strong>Đăng nhập lần cuối:</strong> 
                  <span className="text-muted"> Hôm nay</span>
                </div>
                <div className="info-item mb-3">
                  <strong>Quyền truy cập:</strong> 
                  <span className="badge bg-danger ms-2">
                    <i className="bi bi-shield-fill-check me-1"></i>
                    Quản trị viên
                  </span>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;