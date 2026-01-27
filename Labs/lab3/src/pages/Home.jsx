
import React, { useState, useEffect } from 'react';
import ListOrchids from "../components/ListOrchids";
import { orchidAPI } from "../api/orchidAPI";

function Home({ searchKeyword }) {
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orchids from API
  const fetchOrchids = async () => {
    try {
      setLoading(true);
      const data = await orchidAPI.getAllOrchids();
      setOrchids(data);
      setError(null);
    } catch (err) {
      setError('Failed to load orchids');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrchids();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading orchids...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-3">
        <h4>Error</h4>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={fetchOrchids}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <h1>🌸 Orchid Store</h1>
      <h3>Chào mừng bạn đến với cửa hàng hoa lan của chúng tôi!</h3>
      <ListOrchids orchids={orchids} searchKeyword={searchKeyword} />
    </>
  );
}

export default Home;
