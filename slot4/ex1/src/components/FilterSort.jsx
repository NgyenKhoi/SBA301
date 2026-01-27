import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import './FilterSort.css';

function FilterSort({ categories, onFilterChange, onSortChange }) {
    const handleFilterChange = (e) => {
        onFilterChange(e.target.value);
    };

    const handleSortChange = (e) => {
        onSortChange(e.target.value);
    };

    return (
        <div className="filter-sort-container">
            <Form className="mb-0">
                <Row className="g-3">
                    <Col md={6}>
                        <Form.Group controlId="filterCategory" className="form-group">
                            <Form.Label className="filter-label">
                                🔍 Filter by Category
                            </Form.Label>
                            <Form.Control 
                                as="select" 
                                onChange={handleFilterChange}
                                className="filter-select"
                            >
                                <option value="">
                                    All Categories
                                </option>
                                {categories.map((category, index) => (
                                    <option 
                                        key={index} 
                                        value={category}
                                    >
                                        {category}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="sortOrchids" className="form-group">
                            <Form.Label className="filter-label">
                                📊 Sort by
                            </Form.Label>
                            <Form.Control 
                                as="select" 
                                onChange={handleSortChange}
                                className="sort-select"
                            >
                                <option value="">
                                    No Sorting
                                </option>
                                <option value="price-asc">
                                    Price: Low to High
                                </option>
                                <option value="price-desc">
                                    Price: High to Low
                                </option>
                                <option value="name-asc">
                                    Name: A to Z
                                </option>
                                <option value="name-desc">
                                    Name: Z to A
                                </option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default FilterSort;