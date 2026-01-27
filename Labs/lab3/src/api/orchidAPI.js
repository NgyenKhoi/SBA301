import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Tạo axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Orchid API
export const orchidAPI = {
  // GET - Lấy tất cả orchids
  getAllOrchids: async () => {
    try {
      const response = await api.get('/orchids');
      return response.data;
    } catch (error) {
      console.error('Error fetching orchids:', error);
      throw error;
    }
  },

  // GET - Lấy orchid theo ID
  getOrchidById: async (id) => {
    try {
      const response = await api.get(`/orchids/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching orchid with id ${id}:`, error);
      throw error;
    }
  },

  // POST - Tạo orchid mới (chỉ admin)
  createOrchid: async (orchidData) => {
    try {
      const response = await api.post('/orchids', orchidData);
      return response.data;
    } catch (error) {
      console.error('Error creating orchid:', error);
      throw error;
    }
  },

  // PUT - Cập nhật orchid (chỉ admin)
  updateOrchid: async (id, orchidData) => {
    try {
      const response = await api.put(`/orchids/${id}`, orchidData);
      return response.data;
    } catch (error) {
      console.error(`Error updating orchid with id ${id}:`, error);
      throw error;
    }
  },

  // DELETE - Xóa orchid (chỉ admin)
  deleteOrchid: async (id) => {
    try {
      await api.delete(`/orchids/${id}`);
      return { success: true, message: 'Orchid deleted successfully' };
    } catch (error) {
      console.error(`Error deleting orchid with id ${id}:`, error);
      throw error;
    }
  },

  // GET - Tìm kiếm orchids theo category
  getOrchidsByCategory: async (category) => {
    try {
      const response = await api.get(`/orchids?category=${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching orchids by category ${category}:`, error);
      throw error;
    }
  },

  // GET - Lấy orchids đặc biệt
  getSpecialOrchids: async () => {
    try {
      const response = await api.get('/orchids?isSpecial=true');
      return response.data;
    } catch (error) {
      console.error('Error fetching special orchids:', error);
      throw error;
    }
  },

  // GET - Tìm kiếm orchids theo tên
  searchOrchids: async (keyword) => {
    try {
      const response = await api.get(`/orchids?orchidName_like=${keyword}`);
      return response.data;
    } catch (error) {
      console.error(`Error searching orchids with keyword ${keyword}:`, error);
      throw error;
    }
  }
};

export default orchidAPI;