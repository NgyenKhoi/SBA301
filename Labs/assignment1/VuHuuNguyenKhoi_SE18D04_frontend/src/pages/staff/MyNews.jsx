import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
import { newsService } from '../../services/newsService';
import toast from 'react-hot-toast';

const MyNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyNews();
  }, []);

  const loadMyNews = async () => {
    try {
      const data = await newsService.getMyNews();
      setNews(data);
    } catch (error) {
      toast.error('Không thể tải danh sách tin tức của bạn');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-warning text-dark">
              <h4 className="mb-0">Tin tức của tôi</h4>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tiêu đề</th>
                    <th>Danh mục</th>
                    <th>Tags</th>
                    <th>Ngày tạo</th>
                    <th>Ngày cập nhật</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((newsItem) => (
                    <tr key={newsItem.id}>
                      <td>{newsItem.id}</td>
                      <td>{newsItem.title}</td>
                      <td>{newsItem.category?.name}</td>
                      <td>
                        {newsItem.tags?.map((tag, index) => (
                          <Badge key={index} bg="secondary" className="me-1">
                            {tag.name}
                          </Badge>
                        ))}
                      </td>
                      <td>{new Date(newsItem.createdAt).toLocaleDateString('vi-VN')}</td>
                      <td>{new Date(newsItem.updatedAt).toLocaleDateString('vi-VN')}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {news.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-muted">Bạn chưa tạo tin tức nào</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyNews;