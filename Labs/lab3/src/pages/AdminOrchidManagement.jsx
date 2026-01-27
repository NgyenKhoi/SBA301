import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert, Table } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { orchidAPI } from '../api/orchidAPI';

const AdminOrchidManagement = () => {
  const { state } = useAuth();
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingOrchid, setEditingOrchid] = useState(null);
  const [formData, setFormData] = useState({
    orchidName: '',
    description: '',
    category: '',
    isSpecial: false,
    price: 0,
    image: ''
  });

  // Kiểm tra quyền admin
  if (!state.isAuthenticated || state.role !== 'ADMIN') {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <h4>Access Denied</h4>
          <p>You need admin privileges to access this page.</p>
        </Alert>
      </Container>
    );
  }

  // Fetch all orchids
  const fetchOrchids = async () => {
    setLoading(true);
    try {
      const data = await orchidAPI.getAllOrchids();
      setOrchids(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orchids');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingOrchid) {
        // Update existing orchid
        await orchidAPI.updateOrchid(editingOrchid.id, formData);
        setSuccess('Orchid updated successfully!');
      } else {
        // Create new orchid
        await orchidAPI.createOrchid(formData);
        setSuccess('Orchid created successfully!');
      }
      
      setShowModal(false);
      setEditingOrchid(null);
      resetForm();
      fetchOrchids();
    } catch (err) {
      setError(editingOrchid ? 'Failed to update orchid' : 'Failed to create orchid');
      console.error(err);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this orchid?')) {
      try {
        await orchidAPI.deleteOrchid(id);
        setSuccess('Orchid deleted successfully!');
        fetchOrchids();
      } catch (err) {
        setError('Failed to delete orchid');
        console.error(err);
      }
    }
  };

  // Handle edit
  const handleEdit = (orchid) => {
    setEditingOrchid(orchid);
    setFormData({
      orchidName: orchid.orchidName,
      description: orchid.description,
      category: orchid.category,
      isSpecial: orchid.isSpecial,
      price: orchid.price,
      image: orchid.image
    });
    setShowModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      orchidName: '',
      description: '',
      category: '',
      isSpecial: false,
      price: 0,
      image: ''
    });
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingOrchid(null);
    resetForm();
  };

  useEffect(() => {
    fetchOrchids();
  }, []);

  // Auto hide alerts
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>🌸 Orchid Management (Admin)</h2>
            <Button 
              variant="primary" 
              onClick={() => setShowModal(true)}
            >
              Add New Orchid
            </Button>
          </div>

          {/* Alerts */}
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          {/* Orchids Table */}
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5>Orchids List</h5>
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={fetchOrchids} 
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Refresh'}
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center">Loading orchids...</div>
              ) : (
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Special</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orchids.map(orchid => (
                      <tr key={orchid.id}>
                        <td>{orchid.id}</td>
                        <td>
                          <img 
                            src={orchid.image} 
                            alt={orchid.orchidName}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = '/images/placeholder.jpg';
                            }}
                          />
                        </td>
                        <td>{orchid.orchidName}</td>
                        <td>{orchid.category}</td>
                        <td>{orchid.price?.toLocaleString()} VND</td>
                        <td>
                          {orchid.isSpecial ? 
                            <span className="badge bg-warning">Special</span> : 
                            <span className="badge bg-secondary">Normal</span>
                          }
                        </td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-2"
                            onClick={() => handleEdit(orchid)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDelete(orchid.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingOrchid ? 'Edit Orchid' : 'Add New Orchid'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Orchid Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.orchidName}
                    onChange={(e) => setFormData({...formData, orchidName: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category *</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Dendrobium">Dendrobium</option>
                    <option value="Phalaenopsis">Phalaenopsis</option>
                    <option value="Cattleya">Cattleya</option>
                    <option value="Oncidium">Oncidium</option>
                    <option value="Vanda">Vanda</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price (VND) *</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Special Orchid"
                    checked={formData.isSpecial}
                    onChange={(e) => setFormData({...formData, isSpecial: e.target.checked})}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingOrchid ? 'Update' : 'Create'} Orchid
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminOrchidManagement;