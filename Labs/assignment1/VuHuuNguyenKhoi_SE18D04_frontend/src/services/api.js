// Mock API service thay thế cho axios
import { delay } from '../data/mockData';

// Mock API class để mô phỏng axios behavior
class MockAPI {
  constructor() {
    this.baseURL = 'mock://api';
  }

  // Mock GET request
  async get(url, config = {}) {
    await delay(); // Simulate network delay
    
    // Mock response structure giống axios
    const response = {
      data: null,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { url, ...config }
    };

    // Sẽ được handle bởi các service cụ thể
    return response;
  }

  // Mock POST request
  async post(url, data = {}, config = {}) {
    await delay();
    
    const response = {
      data: null,
      status: 201,
      statusText: 'Created',
      headers: {},
      config: { url, data, ...config }
    };

    return response;
  }

  // Mock PUT request
  async put(url, data = {}, config = {}) {
    await delay();
    
    const response = {
      data: null,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { url, data, ...config }
    };

    return response;
  }

  // Mock DELETE request
  async delete(url, config = {}) {
    await delay();
    
    const response = {
      data: { message: 'Deleted successfully' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { url, ...config }
    };

    return response;
  }
}

// Create mock api instance
const api = new MockAPI();

export default api;