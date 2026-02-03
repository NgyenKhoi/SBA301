import { Card, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const StaffDashboard = ({ user }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Chào buổi sáng');
    } else if (hour < 18) {
      setGreeting('Chào buổi chiều');
    } else {
      setGreeting('Chào buổi tối');
    }

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

  // Mock data for demonstration
  const todayStats = {
    articlesCreated: 3,
    articlesEdited: 5,
    categoriesManaged: 2
  };

  return (
    <div className="staff-dashboard">
      {/* Welcome Header */}
      <div className="welcome-header mb-5 text-center">
        <div className="welcome-card p-5 rounded-4 shadow-lg" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <div className="mb-3">
            <i className="bi bi-person-badge display-1 mb-3"></i>
          </div>
          <h1 className="display-4 fw-bold mb-3">
            {greeting}, {user?.username}!
          </h1>
          <p className="lead mb-3">
            <i className="bi bi-pencil-square me-2"></i>
            Biên tập viên nội dung
          </p>
          <div className="time-display">
            <i className="bi bi-clock me-2"></i>
            {formatTime(currentTime)}
          </div>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="today-stats mb-5">
        <h3 className="mb-4">
          <i className="bi bi-calendar-check me-2 text-primary"></i>
          Hoạt động hôm nay
        </h3>
        <Row>
          <Col md={4}>
            <Card className="stat-card h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="stat-number display-4 text-success fw-bold mb-2">
                  {todayStats.articlesCreated}
                </div>
                <h6 className="text-muted">Bài viết đã tạo</h6>
                <ProgressBar 
                  variant="success" 
                  now={75} 
                  className="mt-3"
                  style={{ height: '6px' }}
                />
                <small className="text-muted">75% mục tiêu ngày</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="stat-card h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="stat-number display-4 text-warning fw-bold mb-2">
                  {todayStats.articlesEdited}
                </div>
                <h6 className="text-muted">Bài viết đã chỉnh sửa</h6>
                <ProgressBar 
                  variant="warning" 
                  now={60} 
                  className="mt-3"
                  style={{ height: '6px' }}
                />
                <small className="text-muted">60% mục tiêu ngày</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="stat-card h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="stat-number display-4 text-info fw-bold mb-2">
                  {todayStats.categoriesManaged}
                </div>
                <h6 className="text-muted">Danh mục đã quản lý</h6>
                <ProgressBar 
                  variant="info" 
                  now={40} 
                  className="mt-3"
                  style={{ height: '6px' }}
                />
                <small className="text-muted">40% mục tiêu ngày</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions mb-5">
        <h3 className="mb-4">
          <i className="bi bi-lightning-fill me-2 text-warning"></i>
          Thao tác nhanh
        </h3>
        <Row>
          <Col md={6} lg={3} className="mb-3">
            <Card className="action-card h-100 border-0 shadow-sm hover-card">
              <Card.Body className="text-center p-4">
                <div className="action-icon mb-3">
                  <i className="bi bi-plus-circle-fill fs-1 text-success"></i>
                </div>
                <h6 className="mb-2">Tạo bài viết mới</h6>
                <p className="text-muted small mb-3">Viết và xuất bản tin tức</p>
                <Button 
                  as={Link} 
                  to="/staff/news" 
                  variant="success" 
                  size="sm"
                  className="hover-effect w-100"
                >
                  <i className="bi bi-plus me-1"></i>
                  Tạo ngay
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3} className="mb-3">
            <Card className="action-card h-100 border-0 shadow-sm hover-card">
              <Card.Body className="text-center p-4">
                <div className="action-icon mb-3">
                  <i className="bi bi-newspaper fs-1 text-primary"></i>
                </div>
                <h6 className="mb-2">Quản lý tin tức</h6>
                <p className="text-muted small mb-3">Xem và chỉnh sửa bài viết</p>
                <Button 
                  as={Link} 
                  to="/staff/news" 
                  variant="primary" 
                  size="sm"
                  className="hover-effect w-100"
                >
                  <i className="bi bi-arrow-right me-1"></i>
                  Xem tất cả
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3} className="mb-3">
            <Card className="action-card h-100 border-0 shadow-sm hover-card">
              <Card.Body className="text-center p-4">
                <div className="action-icon mb-3">
                  <i className="bi bi-bookmark-fill fs-1 text-warning"></i>
                </div>
                <h6 className="mb-2">Tin tức của tôi</h6>
                <p className="text-muted small mb-3">Xem bài viết đã tạo</p>
                <Button 
                  as={Link} 
                  to="/staff/my-news" 
                  variant="warning" 
                  size="sm"
                  className="hover-effect w-100"
                >
                  <i className="bi bi-eye me-1"></i>
                  Xem ngay
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3} className="mb-3">
            <Card className="action-card h-100 border-0 shadow-sm hover-card">
              <Card.Body className="text-center p-4">
                <div className="action-icon mb-3">
                  <i className="bi bi-tags-fill fs-1 text-info"></i>
                </div>
                <h6 className="mb-2">Quản lý danh mục</h6>
                <p className="text-muted small mb-3">Tổ chức nội dung</p>
                <Button 
                  as={Link} 
                  to="/staff/categories" 
                  variant="info" 
                  size="sm"
                  className="hover-effect w-100"
                >
                  <i className="bi bi-gear me-1"></i>
                  Quản lý
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Recent Activity & Profile */}
      <Row>
        <Col md={8}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-transparent border-0 pb-0">
              <h5 className="mb-0">
                <i className="bi bi-clock-history me-2 text-primary"></i>
                Hoạt động gần đây
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="activity-item d-flex align-items-center mb-3 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="activity-icon me-3">
                  <i className="bi bi-plus-circle-fill text-success fs-5"></i>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1 text-dark">Tạo bài viết mới</h6>
                  <p className="text-muted small mb-0">Tin tức về công nghệ AI - 2 giờ trước</p>
                </div>
              </div>
              <div className="activity-item d-flex align-items-center mb-3 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="activity-icon me-3">
                  <i className="bi bi-pencil-fill text-warning fs-5"></i>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1 text-dark">Chỉnh sửa bài viết</h6>
                  <p className="text-muted small mb-0">Cập nhật tin tức thể thao - 4 giờ trước</p>
                </div>
              </div>
              <div className="activity-item d-flex align-items-center mb-3 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="activity-icon me-3">
                  <i className="bi bi-tag-fill text-info fs-5"></i>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1 text-dark">Tạo danh mục mới</h6>
                  <p className="text-muted small mb-0">Danh mục "Giải trí" - Hôm qua</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-transparent border-0 pb-0">
              <h5 className="mb-0">
                <i className="bi bi-person-circle me-2 text-success"></i>
                Thông tin cá nhân
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="profile-info">
                <div className="text-center mb-4">
                  <div className="profile-avatar mb-3">
                    <i className="bi bi-person-circle display-3 text-primary"></i>
                  </div>
                  <h6 className="mb-1">{user?.username}</h6>
                  <span className="badge bg-success">
                    <i className="bi bi-check-circle me-1"></i>
                    Biên tập viên
                  </span>
                </div>
                <div className="profile-stats">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Tổng bài viết:</span>
                    <strong>24</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Đã xuất bản:</span>
                    <strong>20</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Nháp:</span>
                    <strong>4</strong>
                  </div>
                </div>
                <Button 
                  as={Link} 
                  to="/staff/profile" 
                  variant="outline-primary" 
                  size="sm"
                  className="w-100 hover-effect"
                >
                  <i className="bi bi-gear me-1"></i>
                  Cập nhật hồ sơ
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StaffDashboard;