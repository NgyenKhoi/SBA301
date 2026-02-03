import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

const AccountModal = ({ show, onHide, onSave, account, isEditing }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'STAFF',
    active: true
  });

  useEffect(() => {
    if (account && isEditing) {
      setFormData({
        username: account.username || '',
        email: account.email || '',
        password: '',
        role: account.role || 'STAFF',
        active: account.active !== undefined ? account.active : true
      });
    } else {
      setFormData({
        username: '',
        email: '',
        password: '',
        role: 'STAFF',
        active: true
      });
    }
  }, [account, isEditing, show]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert role from string to number for backend
    const submitData = {
      ...formData,
      role: formData.role === 'ADMIN' ? 1 : 2
    };
    
    onSave(submitData);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          {isEditing ? 'Cập nhật tài khoản' : 'Thêm tài khoản mới'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tên đăng nhập *</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  disabled={isEditing}
                  style={{
                    backgroundColor: isEditing ? '#e9ecef' : '',
                    color: isEditing ? '#6c757d' : '',
                    cursor: isEditing ? 'not-allowed' : 'text'
                  }}
                  placeholder={isEditing ? 'Không thể thay đổi tên đăng nhập' : 'Nhập tên đăng nhập'}
                />
                {isEditing && (
                  <Form.Text className="text-muted">
                    <small>⚠️ Tên đăng nhập không thể thay đổi sau khi tạo</small>
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Nhập email"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  {isEditing ? 'Mật khẩu mới (để trống nếu không đổi)' : 'Mật khẩu *'}
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required={!isEditing}
                  placeholder={isEditing ? 'Để trống nếu không đổi mật khẩu' : 'Nhập mật khẩu'}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Vai trò *</Form.Label>
                <Form.Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="STAFF">Staff</option>
                  <option value="ADMIN">Admin</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="active"
              label="Tài khoản hoạt động"
              checked={formData.active}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Hủy
          </Button>
          <Button variant="primary" type="submit" className="hover-effect">
            {isEditing ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AccountModal;