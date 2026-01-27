import React, { useReducer } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ConfirmModal from './ConfirmModal';

// 1. Khởi tạo trạng thái ban đầu cho form
const initialFormState = {
  identifier: '', // username hoặc email
  password: '',
  errors: {},
  showSuccessModal: false
};

// 2. Định nghĩa reducer cho form
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message }
      };
    case 'CLEAR_ERROR':
      const { [action.field]: removed, ...restErrors } = state.errors;
      return {
        ...state,
        errors: restErrors
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors
      };
    case 'SHOW_SUCCESS_MODAL':
      return {
        ...state,
        showSuccessModal: true
      };
    case 'HIDE_SUCCESS_MODAL':
      return {
        ...state,
        showSuccessModal: false
      };
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
}

function LoginForm() {
  // 3. Sử dụng useReducer cho form state
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  // 4. Sử dụng AuthContext và navigation
  const { login, loading, error, clearError, user } = useAuth();
  const navigate = useNavigate();

  // 5. Validation helpers
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = (v) => v.includes('@');

  // 6. Validation form
  const validateForm = () => {
    const errors = {};

    if (!formState.identifier.trim()) {
      errors.identifier = 'Username or Email is required.';
    } else if (isEmail(formState.identifier) && !emailRe.test(formState.identifier)) {
      errors.identifier = 'Email is invalid format.';
    }

    if (!formState.password.trim()) {
      errors.password = 'Password is required.';
    }

    return errors;
  };

  // 7. Xử lý thay đổi input
  const handleInputChange = (field, value) => {
    // Cập nhật giá trị field
    dispatch({ type: 'SET_FIELD', field, value });

    // Clear auth error khi user nhập
    clearError();

    // Clear validation error khi user nhập
    if (formState.errors[field]) {
      dispatch({ type: 'CLEAR_ERROR', field });
    }
  };

  // 8. Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    // Validate form
    const validationErrors = validateForm();
    dispatch({ type: 'SET_ERRORS', errors: validationErrors });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      // Gọi login từ AuthContext
      const result = await login(formState.identifier.trim(), formState.password);

      if (result.ok) {
        // Hiển thị modal thành công
        dispatch({ type: 'SHOW_SUCCESS_MODAL' });
      }
      // Lỗi sẽ được hiển thị qua AuthContext error
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  // 9. Xử lý reset form
  const handleCancel = () => {
    dispatch({ type: 'RESET_FORM' });
    clearError();
  };

  // 10. Xử lý đóng modal thành công
  const handleCloseSuccessModal = () => {
    dispatch({ type: 'HIDE_SUCCESS_MODAL' });
    dispatch({ type: 'RESET_FORM' });
    // Chuyển hướng đến trang list orchid
    navigate('/orchids');
  };

  return (
    <div className="login-container">
      <Container fluid>
        <Row className="justify-content-center h-100">
          <Col xs={12} sm={10} md={8} lg={6} xl={4}>
            <Card className="login-card shadow-lg">
              <Card.Body>
                <div className="text-center mb-4">
                  <h2 className="login-title">🌺 Orchid Shop</h2>
                  <p className="text-muted">Please sign in to continue</p>
                </div>
                
                {/* Hiển thị lỗi từ AuthContext */}
                {error && (
                  <div className="custom-error-alert">
                    <div className="error-icon">
                      <span>⚠️</span>
                    </div>
                    <div className="error-content">
                      <div className="error-title">Oops! Something went wrong</div>
                      <div className="error-message">{error}</div>
                    </div>
                    <button 
                      type="button" 
                      className="error-close-btn"
                      onClick={clearError}
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username or Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username or email"
                      value={formState.identifier}
                      onChange={(e) => handleInputChange('identifier', e.target.value)}
                      isInvalid={!!formState.errors.identifier}
                      disabled={loading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formState.errors.identifier}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={formState.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      isInvalid={!!formState.errors.password}
                      disabled={loading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formState.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button 
                      variant="primary" 
                      type="submit"
                      className="btn-login"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Signing in...
                        </>
                      ) : (
                        'Login'
                      )}
                    </Button>
                    <Button 
                      variant="secondary" 
                      type="button"
                      className="btn-cancel"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>

                <div className="demo-credentials-card">
                  <small className="text-muted d-block text-center">
                    <strong>Demo accounts:</strong><br/>
                    Admin: <strong>admin</strong> / <strong>123456</strong><br/>
                    User: <strong>user1</strong> / <strong>123456</strong> (access denied)<br/>
                    Locked: <strong>user2</strong> / <strong>123456</strong> (locked account)
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Modal thông báo thành công */}
        <ConfirmModal
          show={formState.showSuccessModal}
          title="Login Successful"
          message={`Welcome, ${user?.username}! You have successfully logged in as ${user?.role}.`}
          onConfirm={handleCloseSuccessModal}
          onHide={handleCloseSuccessModal}
        />
      </Container>
    </div>
  );
}

export default LoginForm;