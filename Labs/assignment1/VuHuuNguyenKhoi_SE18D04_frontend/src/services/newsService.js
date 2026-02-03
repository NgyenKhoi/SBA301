import api from './api';
import { mockNews, mockTags, generateId, delay, searchInArray } from '../data/mockData';
import { authService } from './authService';

// Local storage keys
const NEWS_STORAGE_KEY = 'mockNews';
const TAGS_STORAGE_KEY = 'mockTags';

// Khởi tạo mock data trong localStorage nếu chưa có
const initMockNews = () => {
  if (!localStorage.getItem(NEWS_STORAGE_KEY)) {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(mockNews));
  }
};

const initMockTags = () => {
  if (!localStorage.getItem(TAGS_STORAGE_KEY)) {
    localStorage.setItem(TAGS_STORAGE_KEY, JSON.stringify(mockTags));
  }
};

// Lấy data từ localStorage
const getNewsFromStorage = () => {
  initMockNews();
  return JSON.parse(localStorage.getItem(NEWS_STORAGE_KEY));
};

const getTagsFromStorage = () => {
  initMockTags();
  return JSON.parse(localStorage.getItem(TAGS_STORAGE_KEY));
};

const getCategoriesFromStorage = () => {
  const categories = localStorage.getItem('mockCategories');
  return categories ? JSON.parse(categories) : [];
};

const getAccountsFromStorage = () => {
  const accounts = localStorage.getItem('mockAccounts');
  return accounts ? JSON.parse(accounts) : [];
};

// Lưu data vào localStorage
const saveNewsToStorage = (news) => {
  localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news));
};

const saveTagsToStorage = (tags) => {
  localStorage.setItem(TAGS_STORAGE_KEY, JSON.stringify(tags));
};

// Helper function để tạo hoặc lấy tags
const createOrGetTags = (tagNames) => {
  const tags = getTagsFromStorage();
  const resultTags = [];
  
  tagNames.forEach(tagName => {
    if (!tagName.trim()) return;
    
    let tag = tags.find(t => t.name.toLowerCase() === tagName.toLowerCase());
    if (!tag) {
      tag = {
        id: generateId(tags),
        name: tagName.trim()
      };
      tags.push(tag);
    }
    resultTags.push(tag);
  });
  
  saveTagsToStorage(tags);
  return resultTags;
};

// Helper function để populate news với category và author info
const populateNewsData = (news) => {
  const categories = getCategoriesFromStorage();
  const accounts = getAccountsFromStorage();
  
  return news.map(newsItem => {
    const category = categories.find(c => c.id === newsItem.categoryId);
    const author = accounts.find(a => a.id === newsItem.authorId);
    
    return {
      ...newsItem,
      category: category ? { id: category.id, name: category.name } : null,
      author: author ? { id: author.id, username: author.username } : null
    };
  });
};

export const newsService = {
  getAllNews: async () => {
    await delay();
    const news = getNewsFromStorage();
    const populatedNews = populateNewsData(news);
    return populatedNews;
  },

  getMyNews: async () => {
    await delay();
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      const error = new Error('Unauthorized');
      error.response = {
        data: { message: 'Không có quyền truy cập' },
        status: 401
      };
      throw error;
    }
    
    const news = getNewsFromStorage();
    const myNews = news.filter(n => n.authorId === currentUser.id);
    const populatedNews = populateNewsData(myNews);
    return populatedNews;
  },

  createNews: async (newsData) => {
    await delay();
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      const error = new Error('Unauthorized');
      error.response = {
        data: { message: 'Không có quyền truy cập' },
        status: 401
      };
      throw error;
    }
    
    const news = getNewsFromStorage();
    const categories = getCategoriesFromStorage();
    
    // Kiểm tra category tồn tại
    const category = categories.find(c => c.id === parseInt(newsData.categoryId));
    if (!category) {
      const error = new Error('Category not found');
      error.response = {
        data: { message: 'Không tìm thấy danh mục' },
        status: 404
      };
      throw error;
    }
    
    // Tạo hoặc lấy tags
    const tags = createOrGetTags(newsData.tags || []);
    
    // Tạo news mới
    const newNews = {
      id: generateId(news),
      title: newsData.title,
      content: newsData.content,
      categoryId: parseInt(newsData.categoryId),
      authorId: currentUser.id,
      tags: tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    news.push(newNews);
    saveNewsToStorage(news);
    
    // Populate và trả về
    const populatedNews = populateNewsData([newNews]);
    return populatedNews[0];
  },

  updateNews: async (id, newsData) => {
    await delay();
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      const error = new Error('Unauthorized');
      error.response = {
        data: { message: 'Không có quyền truy cập' },
        status: 401
      };
      throw error;
    }
    
    const news = getNewsFromStorage();
    const newsIndex = news.findIndex(n => n.id === parseInt(id));
    
    if (newsIndex === -1) {
      const error = new Error('News not found');
      error.response = {
        data: { message: 'Không tìm thấy tin tức' },
        status: 404
      };
      throw error;
    }
    
    // Kiểm tra quyền sở hữu (chỉ author hoặc admin mới được sửa)
    const newsItem = news[newsIndex];
    if (newsItem.authorId !== currentUser.id && currentUser.role !== 'ADMIN') {
      const error = new Error('Forbidden');
      error.response = {
        data: { message: 'Không có quyền sửa tin tức này' },
        status: 403
      };
      throw error;
    }
    
    const categories = getCategoriesFromStorage();
    
    // Kiểm tra category tồn tại
    const category = categories.find(c => c.id === parseInt(newsData.categoryId));
    if (!category) {
      const error = new Error('Category not found');
      error.response = {
        data: { message: 'Không tìm thấy danh mục' },
        status: 404
      };
      throw error;
    }
    
    // Tạo hoặc lấy tags
    const tags = createOrGetTags(newsData.tags || []);
    
    // Cập nhật news
    const updatedNews = {
      ...newsItem,
      title: newsData.title,
      content: newsData.content,
      categoryId: parseInt(newsData.categoryId),
      tags: tags,
      updatedAt: new Date().toISOString()
    };
    
    news[newsIndex] = updatedNews;
    saveNewsToStorage(news);
    
    // Populate và trả về
    const populatedNews = populateNewsData([updatedNews]);
    return populatedNews[0];
  },

  deleteNews: async (id) => {
    await delay();
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      const error = new Error('Unauthorized');
      error.response = {
        data: { message: 'Không có quyền truy cập' },
        status: 401
      };
      throw error;
    }
    
    const news = getNewsFromStorage();
    const newsIndex = news.findIndex(n => n.id === parseInt(id));
    
    if (newsIndex === -1) {
      const error = new Error('News not found');
      error.response = {
        data: { message: 'Không tìm thấy tin tức' },
        status: 404
      };
      throw error;
    }
    
    // Kiểm tra quyền sở hữu (chỉ author hoặc admin mới được xóa)
    const newsItem = news[newsIndex];
    if (newsItem.authorId !== currentUser.id && currentUser.role !== 'ADMIN') {
      const error = new Error('Forbidden');
      error.response = {
        data: { message: 'Không có quyền xóa tin tức này' },
        status: 403
      };
      throw error;
    }
    
    news.splice(newsIndex, 1);
    saveNewsToStorage(news);
    
    return { message: 'Xóa tin tức thành công' };
  },

  searchNews: async (searchTerm) => {
    await delay();
    const news = getNewsFromStorage();
    
    // Tìm kiếm theo title, content
    const filteredNews = searchInArray(news, searchTerm, ['title', 'content']);
    const populatedNews = populateNewsData(filteredNews);
    
    return populatedNews;
  },

  getAllTags: async () => {
    await delay();
    const tags = getTagsFromStorage();
    return tags;
  }
};