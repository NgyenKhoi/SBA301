import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { accountService } from '../../services/accountService';
import toast from 'react-hot-toast';
import AccountModal from '../../components/modals/AccountModal';
import ConfirmModal from '../../components/modals/ConfirmModal';

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const data = await accountService.getAllAccounts();
      setAccounts(data);
    } catch (error) {
      toast.error('Không thể tải danh sách tài khoản');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadAccounts();
      return;
    }
    
    try {
      const data = await accountService.searchAccounts(searchTerm);
      setAccounts(data);
    } catch (error) {
      toast.error('Lỗi khi tìm kiếm');
    }
  };

  const handleCreate = () => {
    setSelectedAccount(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (account) => {
    setSelectedAccount(account);
    setShowConfirm(true);
  };

  const handleSave = async (accountData) => {
    try {
      if (isEditing) {
        await accountService.updateAccount(selectedAccount.id, accountData);
        toast.success('Cập nhật tài khoản thành công');
      } else {
        await accountService.createAccount(accountData);
        toast.success('Tạo tài khoản thành công');
      }
      setShowModal(false);
      loadAccounts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const confirmDelete = async () => {
    try {
      await accountService.deleteAccount(selectedAccount.id);
      toast.success('Xóa tài khoản thành công');
      setShowConfirm(false);
      loadAccounts();
    } catch (error) {
      toast.error('Không thể xóa tài khoản');
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Quản lý tài khoản</h4>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={6}>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Tìm kiếm tài khoản..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button variant="outline-secondary" onClick={handleSearch}>
                      Tìm kiếm
                    </Button>
                  </InputGroup>
                </Col>
                <Col md={6} className="text-end">
                  <Button variant="success" onClick={handleCreate} className="hover-effect">
                    + Thêm tài khoản
                  </Button>
                </Col>
              </Row>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên đăng nhập</th>
                    <th>Email</th>
                    <th>Vai trò</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account) => (
                    <tr key={account.id}>
                      <td>{account.id}</td>
                      <td>{account.username}</td>
                      <td>{account.email}</td>
                      <td>
                        <span className={`badge ${account.role === 'ADMIN' ? 'bg-danger' : 'bg-info'}`}>
                          {account.role}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${account.active ? 'bg-success' : 'bg-secondary'}`}>
                          {account.active ? 'Hoạt động' : 'Không hoạt động'}
                        </span>
                      </td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2 hover-effect"
                          onClick={() => handleEdit(account)}
                        >
                          Sửa
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="hover-effect"
                          onClick={() => handleDelete(account)}
                        >
                          Xóa
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {accounts.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-muted">Không có tài khoản nào</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <AccountModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        account={selectedAccount}
        isEditing={isEditing}
      />

      <ConfirmModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa tài khoản "${selectedAccount?.username}"?`}
      />
    </Container>
  );
};

export default AccountManagement;