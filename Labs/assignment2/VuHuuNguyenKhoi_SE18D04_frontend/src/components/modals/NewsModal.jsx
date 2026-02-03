import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { categoryService } from '../../services/categoryService';

const NewsModal = ({ show, onHide, onSave, news, isEditing }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: '',
    tags: ''
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (show) {
      loadCategories();
    }
  }, [show]);

  useEffect(() => {
    if (news && isEditing) {
      setFormData({
        title: news.title || '',
        content: news.content || '',
        categoryId: news.category?.id || '',
        tags: news.tags?.map(tag => tag.name).join(', ') || ''
      });
    } else {
      setFormData({
        title: '',
        content: '',
        categoryId: '',
        tags: ''
      });
    }
  }, [news, isEditing, show]);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    onSave(submitData);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title>
          {isEditing ? 'Cập nhật tin tức' : 'Thêm tin tức mới'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tiêu đề *</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Nhập tiêu đề tin tức"
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Danh mục *</Form.Label>
                <Form.Select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Nhập tags, cách nhau bằng dấu phẩy"
                />
                <Form.Text className="text-muted">
                  <small>Ví dụ: công nghệ, tin tức, thể thao</small>
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Nội dung *</Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              placeholder="Nhập nội dung tin tức"
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

export default NewsModal;