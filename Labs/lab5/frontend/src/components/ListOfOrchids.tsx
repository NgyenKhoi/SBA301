import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orchidApi } from '../services/api';
import type { Orchid } from '../services/api'

const ListOfOrchids: React.FC = () => {
  const [orchids, setOrchids] = useState<Orchid[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState<Orchid | null>(null);

  useEffect(() => {
    fetchOrchids();
  }, []);

  const fetchOrchids = async () => {
    try {
      setLoading(true);
      const response = await orchidApi.getAll();
      setOrchids(response.data.result);
    } catch (error) {
      console.error('Error fetching orchids:', error);
      toast.error('Failed to load orchids');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orchid: Orchid) => {
    setSelectedOrchid(orchid);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedOrchid?.id) return;

    try {
      await orchidApi.delete(selectedOrchid.id);
      toast.success('Orchid deleted successfully!');
      fetchOrchids(); // Refresh the list
      setShowDeleteModal(false);
      setSelectedOrchid(null);
    } catch (error) {
      console.error('Error deleting orchid:', error);
      toast.error('Failed to delete orchid');
    }
  };

  if (loading) {
    return (
      <Container fluid className="py-4">
        <Row>
          <Col>
            <Card className="fade-in">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Orchid Management</h4>
                <div className="skeleton skeleton-text" style={{ width: '120px', height: '38px' }}></div>
              </Card.Header>
              <Card.Body>
                <div className="loading-container">
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading orchids...</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row>
        <Col>
          <Card className="fade-in">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">
                <i className="bi bi-flower1 me-2 text-primary"></i>
                Orchid Management
              </h4>
              <Link to="/edit" className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>
                Add New Orchid
              </Link>
            </Card.Header>
            <Card.Body className="p-0">
              {!orchids || orchids.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-flower1 text-muted" style={{ fontSize: '3rem' }}></i>
                  <p className="text-muted mt-3 mb-0">No orchids found. Add your first orchid!</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th style={{ width: '80px' }}>ID</th>
                        <th style={{ width: '80px' }}>Image</th>
                        <th>Name</th>
                        <th style={{ width: '120px' }}>Category</th>
                        <th style={{ width: '100px' }}>Attractive</th>
                        <th style={{ width: '100px' }}>Natural</th>
                        <th style={{ width: '150px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {orchids && orchids.map((orchid) => (
                      <tr key={orchid.id}>
                        <td>{orchid.id}</td>
                        <td>
                          {orchid.orchidUrl && (
                            <img
                              src={orchid.orchidUrl}
                              alt=""
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                              className="rounded"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://via.placeholder.com/50x50?text=No+Image';
                              }}
                            />
                          )}
                        </td>
                        <td>
                          <div>
                            <strong>{orchid.name}</strong>
                            {orchid.orchidDescription && (
                              <div className="text-muted small">
                                {orchid.orchidDescription.length > 50 
                                  ? orchid.orchidDescription.substring(0, 50) + '...'
                                  : orchid.orchidDescription
                                }
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-secondary">{orchid.category.categoryName}</span>
                        </td>
                        <td>
                          <span className={`badge ${orchid.isAttractive ? 'bg-success' : 'bg-secondary'}`}>
                            {orchid.isAttractive ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${orchid.isNatural ? 'bg-success' : 'bg-secondary'}`}>
                            {orchid.isNatural ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link
                              to={`/edit/${orchid.id}`}
                              className="btn btn-outline-primary btn-sm"
                            >
                              <i className="bi bi-pencil"></i> Edit
                            </Link>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(orchid)}
                            >
                              <i className="bi bi-trash"></i> Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the orchid "{selectedOrchid?.name}"?
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ListOfOrchids;