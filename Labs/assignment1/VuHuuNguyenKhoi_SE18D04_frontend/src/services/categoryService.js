import api from './api';
import { mockCategories, generateId, delay, searchInArray } from '../data/mockData';

// Local storage key cho mock categories
const CATEGORIES_STORAGE_KEY = 'mockCategories';

// Khởi tạo mock data trong localStorage nếu chưa có
const initMockCategories = () => {
  if (!localStorage.getItem(CATEGORIES_STORAGE_KEY)) {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(mockCategories));
  }
};

// Lấy categories từ localStorage
const getCategoriesFromStorage = () => {
  initMockCategories();
  return JSON.parse(localStorage.getItem(CATEGORIES_STORAGE_KEY));
};

// Lưu categories vào localStorage
const saveCategoriesToStorage = (categories) => {
  localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
};

export const categoryService = {
  getAllCategories: async () => {
    await delay();
    const categories = getCategoriesFromStorage();
    return categories;
  },

  createCategory: async (categoryData) => {
    await delay();
    const categories = getCategoriesFromStorage();
    
    // Kiểm tra tên danh mục đã tồn tại
    const existingCategory = categories.find(cat => 
      cat.name.toLowerCase() === categoryData.name.toLowerCase()
    );
    if (existingCategory) {
      const error = new Error('Category name already exists');
      error.response = {
        data: { message: 'Tên danh mục đã tồn tại' },
        status: 400
      };
      throw error;
    }
    
    // Tạo category mới
    const newCategory = {
      id: generateId(categories),
      name: categoryData.name,
      description: categoryData.description || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    categories.push(newCategory);
    saveCategoriesToStorage(categories);
    
    return newCategory;
  },

  updateCategory: async (id, categoryData) => {
    await delay();
    const categories = getCategoriesFromStorage();
    const categoryIndex = categories.findIndex(cat => cat.id === parseInt(id));
    
    if (categoryIndex === -1) {
      const error = new Error('Category not found');
      error.response = {
        data: { message: 'Không tìm thấy danh mục' },
        status: 404
      };
      throw error;
    }
    
    // Kiểm tra tên danh mục đã tồn tại (trừ category hiện tại)
    const existingCategory = categories.find(cat => 
      cat.name.toLowerCase() === categoryData.name.toLowerCase() && 
      cat.id !== parseInt(id)
    );
    if (existingCategory) {
      const error = new Error('Category name already exists');
      error.response = {
        data: { message: 'Tên danh mục đã tồn tại' },
        status: 400
      };
      throw error;
    }
    
    // Cập nhật category
    const updatedCategory = {
      ...categories[categoryIndex],
      name: categoryData.name,
      description: categoryData.description || '',
      updatedAt: new Date().toISOString()
    };
    
    categories[categoryIndex] = updatedCategory;
    saveCategoriesToStorage(categories);
    
    return updatedCategory;
  },

  deleteCategory: async (id) => {
    await delay();
    const categories = getCategoriesFromStorage();
    const categoryIndex = categories.findIndex(cat => cat.id === parseInt(id));
    
    if (categoryIndex === -1) {
      const error = new Error('Category not found');
      error.response = {
        data: { message: 'Không tìm thấy danh mục' },
        status: 404
      };
      throw error;
    }
    
    // Kiểm tra xem có tin tức nào đang sử dụng category này không
    const newsStorage = localStorage.getItem('mockNews');
    if (newsStorage) {
      const news = JSON.parse(newsStorage);
      const newsUsingCategory = news.find(n => n.categoryId === parseInt(id));
      if (newsUsingCategory) {
        const error = new Error('Category is being used');
        error.response = {
          data: { message: 'Không thể xóa danh mục đang được sử dụng' },
          status: 400
        };
        throw error;
      }
    }
    
    categories.splice(categoryIndex, 1);
    saveCategoriesToStorage(categories);
    
    return { message: 'Xóa danh mục thành công' };
  },

  searchCategories: async (searchTerm) => {
    await delay();
    const categories = getCategoriesFromStorage();
    
    // Tìm kiếm theo name, description
    const filteredCategories = searchInArray(categories, searchTerm, ['name', 'description']);
    
    return filteredCategories;
  }
};