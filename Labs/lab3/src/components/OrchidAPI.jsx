import React, { useState, useEffect } from 'react';
import { orchidService } from '../services/orchidService';

const OrchidAPI = () => {
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newOrchid, setNewOrchid] = useState({
    orchidName: '',
    description: '',
    category: '',
    isSpecial: false,
    price: 0,
    image: ''
  });

  // Fetch all orchids
  const fetchOrchids = async () => {
    setLoading(true);
    try {
      const data = await orchidService.getAllOrchids();
      setOrchids(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orchids');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Create new orchid
  const handleCreateOrchid = async (e) => {
    e.preventDefault();
    try {
      const created = await orchidService.createOrchid(newOrchid);
      setOrchids([...orchids, created]);
      setNewOrchid({
        orchidName: '',
        description: '',
        category: '',
        isSpecial: false,
        price: 0,
        image: ''
      });
      alert('Orchid created successfully!');
    } catch (err) {
      setError('Failed to create orchid');
      console.error(err);
    }
  };

  // Delete orchid
  const handleDeleteOrchid = async (id) => {
    if (window.confirm('Are you sure you want to delete this orchid?')) {
      try {
        await orchidService.deleteOrchid(id);
        setOrchids(orchids.filter(orchid => orchid.id !== id));
        alert('Orchid deleted successfully!');
      } catch (err) {
        setError('Failed to delete orchid');
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchOrchids();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Orchid API Test</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {/* Create Form */}
      <div className="card mb-4">
        <div className="card-header">
          <h4>Add New Orchid</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleCreateOrchid}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Orchid Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newOrchid.orchidName}
                    onChange={(e) => setNewOrchid({...newOrchid, orchidName: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-control"
                    value={newOrchid.category}
                    onChange={(e) => setNewOrchid({...newOrchid, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Dendrobium">Dendrobium</option>
                    <option value="Phalaenopsis">Phalaenopsis</option>
                    <option value="Cattleya">Cattleya</option>
                    <option value="Oncidium">Oncidium</option>
                    <option value="Vanda">Vanda</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newOrchid.price}
                    onChange={(e) => setNewOrchid({...newOrchid, price: parseInt(e.target.value)})}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={newOrchid.description}
                    onChange={(e) => setNewOrchid({...newOrchid, description: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newOrchid.image}
                    onChange={(e) => setNewOrchid({...newOrchid, image: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={newOrchid.isSpecial}
                      onChange={(e) => setNewOrchid({...newOrchid, isSpecial: e.target.checked})}
                    />
                    <label className="form-check-label">Special Orchid</label>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Add Orchid</button>
          </form>
        </div>
      </div>

      {/* Orchids List */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4>Orchids List</h4>
          <button className="btn btn-secondary" onClick={fetchOrchids} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center">Loading orchids...</div>
          ) : (
            <div className="row">
              {orchids.map(orchid => (
                <div key={orchid.id} className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        {orchid.orchidName}
                        {orchid.isSpecial && <span className="badge bg-warning ms-2">Special</span>}
                      </h5>
                      <p className="card-text">
                        <strong>Category:</strong> {orchid.category}<br/>
                        <strong>Price:</strong> {orchid.price?.toLocaleString()} VND
                      </p>
                      <p className="card-text">{orchid.description.substring(0, 100)}...</p>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteOrchid(orchid.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrchidAPI;