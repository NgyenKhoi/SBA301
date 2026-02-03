import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import { newsService } from '../../services/newsService';
import toast from 'react-hot-toast';
import NewsModal from '../../components/modals/NewsModal';
import ConfirmModal from '../../components/modals/ConfirmModal';

const NewsManagement = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const data = await newsService.getAllNews();
      setNews(data);
    } catch (error) {
      toast.error('Không thể tải danh sách tin tức');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadNews();
      return;
    }
    
    try {
      const data = await newsService.searchNews(searchTerm);
      setNews(data);
    } catch (error) {
      toast.error('Lỗi khi tìm kiếm');
    }
  };

  const handleCreate = () => {
    setSelectedNews(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (newsItem) => {
    setSelectedNews(newsItem);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (newsItem) => {
    setSelectedNews(newsItem);
    setShowConfirm(true);
  };

  const handleSave = async (newsData) => {
    try {
      if (isEditing) {
        await newsService.updateNews(selectedNews.id, newsData);
        toast.success('Cập nhật tin tức thành công');
      } else {
        await newsService.createNews(newsData);
        toast.success('Tạo tin tức thành công');
      }
      setShowModal(false);
      loadNews();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const confirmDelete = async () => {
    try {
      await newsService.deleteNews(selectedNews.id);
      toast.success('Xóa tin tức thành công');
      setShowConfirm(false);
      loadNews();
    } catch (error) {
      toast.error('Không thể xóa tin tức');
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-success text-white">
              <h4 className="mb-0">Quản lý tin tức</h4>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={6}>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Tìm kiếm tin tức..."
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
                    + Thêm tin tức
                  </Button>
                </Col>
              </Row>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tiêu đề</th>
                    <th>Danh mục</th>
                    <th>Tác giả</th>
                    <th>Tags</th>
                    <th>Ngày tạo</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((newsItem) => (
                    <tr key={newsItem.id}>
                      <td>{newsItem.id}</td>
                      <td>{newsItem.title}</td>
                      <td>{newsItem.category?.name}</td>
                      <td>{newsItem.author?.username}</td>
                      <td>
                        {newsItem.tags?.map((tag, index) => (
                          <Badge key={index} bg="secondary" className="me-1">
                            {tag.name}
                          </Badge>
                        ))}
                      </td>
                      <td>{new Date(newsItem.createdAt).toLocaleDateString('vi-VN')}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2 hover-effect"
                          onClick={() => handleEdit(newsItem)}
                        >
                          Sửa
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="hover-effect"
                          onClick={() => handleDelete(newsItem)}
                        >
                          Xóa
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {news.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-muted">Không có tin tức nào</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <NewsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        news={selectedNews}
        isEditing={isEditing}
      />

      <ConfirmModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa tin tức "${selectedNews?.title}"?`}
      />
    </Container>
  );
};

export default NewsManagement;