import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup } from 'react-bootstrap';
import { categoryService } from '../../services/categoryService';
import toast from 'react-hot-toast';
import CategoryModal from '../../components/modals/CategoryModal';
import ConfirmModal from '../../components/modals/ConfirmModal';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      toast.error('Không thể tải danh sách danh mục');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadCategories();
      return;
    }
    
    try {
      const data = await categoryService.searchCategories(searchTerm);
      setCategories(data);
    } catch (error) {
      toast.error('Lỗi khi tìm kiếm');
    }
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setShowConfirm(true);
  };

  const handleSave = async (categoryData) => {
    try {
      if (isEditing) {
        await categoryService.updateCategory(selectedCategory.id, categoryData);
        toast.success('Cập nhật danh mục thành công');
      } else {
        await categoryService.createCategory(categoryData);
        toast.success('Tạo danh mục thành công');
      }
      setShowModal(false);
      loadCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const confirmDelete = async () => {
    try {
      await categoryService.deleteCategory(selectedCategory.id);
      toast.success('Xóa danh mục thành công');
      setShowConfirm(false);
      loadCategories();
    } catch (error) {
      toast.error('Không thể xóa danh mục');
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-info text-white">
              <h4 className="mb-0">Quản lý danh mục</h4>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={6}>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Tìm kiếm danh mục..."
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
                    + Thêm danh mục
                  </Button>
                </Col>
              </Row>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên danh mục</th>
                    <th>Mô tả</th>
                    <th>Ngày tạo</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td>{category.description}</td>
                      <td>{new Date(category.createdAt).toLocaleDateString('vi-VN')}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2 hover-effect"
                          onClick={() => handleEdit(category)}
                        >
                          Sửa
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="hover-effect"
                          onClick={() => handleDelete(category)}
                        >
                          Xóa
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {categories.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-muted">Không có danh mục nào</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <CategoryModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        category={selectedCategory}
        isEditing={isEditing}
      />

      <ConfirmModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa danh mục "${selectedCategory?.name}"?`}
      />
    </Container>
  );
};

export default CategoryManagement;