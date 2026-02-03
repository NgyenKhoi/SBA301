import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orchidApi, categoryApi  } from '../services/api';
import type { Orchid, Category } from '../services/api'

const EditOrchids: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const [orchid, setOrchid] = useState<Orchid>({
    name: '',
    isAttractive: false,
    isNatural: false,
    orchidDescription: '',
    orchidUrl: '',
    category: { id: 0, categoryName: '' },
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchCategories();
    if (isEdit && id) {
      fetchOrchid(parseInt(id));
    }
  }, [id, isEdit]);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAll();
      setCategories(response.data.result);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    }
  };

  const fetchOrchid = async (orchidId: number) => {
    try {
      setLoading(true);
      const response = await orchidApi.getById(orchidId);
      setOrchid(response.data.result);
    } catch (error) {
      console.error('Error fetching orchid:', error);
      toast.error('Failed to load orchid details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!orchid.name.trim()) {
      newErrors.name = 'Orchid name is required';
    }

    if (!orchid.category.id || orchid.category.id === 0) {
      newErrors.category = 'Category is required';
    }

    if (!orchid.orchidUrl.trim()) {
      newErrors.orchidUrl = 'Image URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    try {
      setLoading(true);

      if (isEdit && id) {
        await orchidApi.update(parseInt(id), orchid);
        toast.success('Orchid updated successfully!');
      } else {
        await orchidApi.create(orchid);
        toast.success('Orchid created successfully!');
      }

      navigate('/');
    } catch (error) {
      console.error('Error saving orchid:', error);
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} orchid`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof Orchid, value: any) => {
    console.log(`Updating ${field}:`, value);
    setOrchid(prev => ({ ...prev, [field]: value }));
    
    // Reset image states when URL changes
    if (field === 'orchidUrl') {
      setImageError(false);
      setImageLoaded(false);
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCategoryChange = (categoryId: number) => {
    if (!categories) return;
    
    const selectedCategory = categories.find(cat => cat.id === categoryId);
    if (selectedCategory) {
      handleInputChange('category', selectedCategory);
    }
    // Clear category error
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: '' }));
    }
  };

  if (loading && isEdit) {
    return (
      <Container fluid className="py-4">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="fade-in">
              <Card.Header>
                <div className="skeleton skeleton-text" style={{ width: '150px', height: '1.5rem' }}></div>
              </Card.Header>
              <Card.Body>
                <div className="loading-container">
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading orchid details...</p>
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
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="fade-in">
            <Card.Header>
              <h4 className="mb-0">
                <i className={`bi ${isEdit ? 'bi-pencil-square' : 'bi-plus-circle'} me-2 text-primary`}></i>
                {isEdit ? 'Edit Orchid' : 'Add New Orchid'}
              </h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Orchid Name *</Form.Label>
                      <Form.Control
                        type="text"
                        value={orchid.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        isInvalid={!!errors.name}
                        placeholder="Enter orchid name"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category *</Form.Label>
                      <Form.Select
                        value={orchid.category.id}
                        onChange={(e) => handleCategoryChange(parseInt(e.target.value))}
                        isInvalid={!!errors.category}
                      >
                        <option value={0}>Select a category</option>
                        {categories && categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.categoryName}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.category}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={orchid.orchidDescription || ''}
                        onChange={(e) => handleInputChange('orchidDescription', e.target.value)}
                        placeholder="Enter orchid description"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Image URL *</Form.Label>
                      <Form.Control
                        type="url"
                        value={orchid.orchidUrl}
                        onChange={(e) => handleInputChange('orchidUrl', e.target.value)}
                        isInvalid={!!errors.orchidUrl}
                        placeholder="Enter image URL"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.orchidUrl}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        id="isAttractive"
                        label="Is Attractive"
                        checked={orchid.isAttractive || false}
                        onChange={(e) => handleInputChange('isAttractive', e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        id="isNatural"
                        label="Is Natural"
                        checked={orchid.isNatural || false}
                        onChange={(e) => handleInputChange('isNatural', e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-4">
                      <Form.Label className="d-flex align-items-center">
                        <i className="bi bi-image me-2"></i>
                        Image Preview
                      </Form.Label>
                      <div className="preview-container text-center p-3 border rounded bg-light">
                        {orchid.orchidUrl && orchid.orchidUrl.trim() ? (
                          <div className="position-relative d-inline-block">
                            {imageError ? (
                              <div className="text-center p-4">
                                <i className="bi bi-exclamation-triangle-fill text-warning" style={{ fontSize: '3rem' }}></i>
                                <p className="text-muted mt-2 mb-0">Invalid image URL</p>
                                <small className="text-muted">Please check the URL and try again</small>
                              </div>
                            ) : (
                              <img
                                src={orchid.orchidUrl.trim()}
                                alt=""
                                style={{ 
                                  maxWidth: '300px', 
                                  maxHeight: '300px', 
                                  objectFit: 'cover',
                                  borderRadius: '8px',
                                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                  opacity: imageLoaded ? '1' : '0',
                                  transition: 'opacity 0.3s ease-in-out'
                                }}
                                className="img-fluid"
                                onError={() => {
                                  console.log('Image failed to load:', orchid.orchidUrl);
                                  setImageError(true);
                                  setImageLoaded(false);
                                }}
                                onLoad={() => {
                                  console.log('Image loaded successfully:', orchid.orchidUrl);
                                  setImageError(false);
                                  setImageLoaded(true);
                                }}
                              />
                            )}
                          </div>
                        ) : (
                          <div className="text-center p-5">
                            <i className="bi bi-cloud-upload text-muted" style={{ fontSize: '4rem' }}></i>
                            <p className="text-muted mt-3 mb-1">No image URL provided</p>
                            <small className="text-muted">Enter an image URL above to see preview</small>
                          </div>
                        )}
                        <div className="mt-2">
                          <small className="text-muted">
                            <i className="bi bi-info-circle me-1"></i>
                            Preview updates automatically when you change the URL
                          </small>
                        </div>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-between">
                  <Button
                    variant="secondary"
                    onClick={() => navigate('/')}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        {isEdit ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      isEdit ? 'Update Orchid' : 'Create Orchid'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditOrchids;