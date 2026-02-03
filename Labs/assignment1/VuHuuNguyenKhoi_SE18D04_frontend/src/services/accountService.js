import api from './api';
import { mockUsers, generateId, delay, searchInArray } from '../data/mockData';

// Local storage key cho mock accounts
const ACCOUNTS_STORAGE_KEY = 'mockAccounts';

// Khởi tạo mock data trong localStorage nếu chưa có
const initMockAccounts = () => {
  if (!localStorage.getItem(ACCOUNTS_STORAGE_KEY)) {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(mockUsers));
  }
};

// Lấy accounts từ localStorage
const getAccountsFromStorage = () => {
  initMockAccounts();
  return JSON.parse(localStorage.getItem(ACCOUNTS_STORAGE_KEY));
};

// Lưu accounts vào localStorage
const saveAccountsToStorage = (accounts) => {
  localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
};

export const accountService = {
  getAllAccounts: async () => {
    await delay();
    const accounts = getAccountsFromStorage();
    
    // Loại bỏ password khỏi response
    const safeAccounts = accounts.map(({ password, ...account }) => account);
    
    return safeAccounts;
  },

  createAccount: async (accountData) => {
    await delay();
    const accounts = getAccountsFromStorage();
    
    // Kiểm tra email đã tồn tại
    const existingAccount = accounts.find(acc => acc.email === accountData.email);
    if (existingAccount) {
      const error = new Error('Email already exists');
      error.response = {
        data: { message: 'Email đã tồn tại' },
        status: 400
      };
      throw error;
    }
    
    // Kiểm tra username đã tồn tại
    const existingUsername = accounts.find(acc => acc.username === accountData.username);
    if (existingUsername) {
      const error = new Error('Username already exists');
      error.response = {
        data: { message: 'Tên đăng nhập đã tồn tại' },
        status: 400
      };
      throw error;
    }
    
    // Tạo account mới
    const newAccount = {
      id: generateId(accounts),
      username: accountData.username,
      email: accountData.email,
      password: accountData.password,
      role: accountData.role === 1 ? 'ADMIN' : 'STAFF', // Convert number to string
      active: accountData.active,
      createdAt: new Date().toISOString()
    };
    
    accounts.push(newAccount);
    saveAccountsToStorage(accounts);
    
    // Trả về account không có password
    const { password, ...safeAccount } = newAccount;
    return safeAccount;
  },

  updateAccount: async (id, accountData) => {
    await delay();
    const accounts = getAccountsFromStorage();
    const accountIndex = accounts.findIndex(acc => acc.id === parseInt(id));
    
    if (accountIndex === -1) {
      const error = new Error('Account not found');
      error.response = {
        data: { message: 'Không tìm thấy tài khoản' },
        status: 404
      };
      throw error;
    }
    
    // Kiểm tra email đã tồn tại (trừ account hiện tại)
    const existingAccount = accounts.find(acc => 
      acc.email === accountData.email && acc.id !== parseInt(id)
    );
    if (existingAccount) {
      const error = new Error('Email already exists');
      error.response = {
        data: { message: 'Email đã tồn tại' },
        status: 400
      };
      throw error;
    }
    
    // Cập nhật account
    const updatedAccount = {
      ...accounts[accountIndex],
      email: accountData.email,
      role: accountData.role === 1 ? 'ADMIN' : 'STAFF', // Convert number to string
      active: accountData.active,
      updatedAt: new Date().toISOString()
    };
    
    // Chỉ cập nhật password nếu có
    if (accountData.password && accountData.password.trim()) {
      updatedAccount.password = accountData.password;
    }
    
    accounts[accountIndex] = updatedAccount;
    saveAccountsToStorage(accounts);
    
    // Trả về account không có password
    const { password, ...safeAccount } = updatedAccount;
    return safeAccount;
  },

  deleteAccount: async (id) => {
    await delay();
    const accounts = getAccountsFromStorage();
    const accountIndex = accounts.findIndex(acc => acc.id === parseInt(id));
    
    if (accountIndex === -1) {
      const error = new Error('Account not found');
      error.response = {
        data: { message: 'Không tìm thấy tài khoản' },
        status: 404
      };
      throw error;
    }
    
    // Không cho phép xóa tài khoản admin cuối cùng
    const adminAccounts = accounts.filter(acc => acc.role === 'ADMIN' && acc.id !== parseInt(id));
    if (accounts[accountIndex].role === 'ADMIN' && adminAccounts.length === 0) {
      const error = new Error('Cannot delete last admin');
      error.response = {
        data: { message: 'Không thể xóa tài khoản admin cuối cùng' },
        status: 400
      };
      throw error;
    }
    
    accounts.splice(accountIndex, 1);
    saveAccountsToStorage(accounts);
    
    return { message: 'Xóa tài khoản thành công' };
  },

  searchAccounts: async (searchTerm) => {
    await delay();
    const accounts = getAccountsFromStorage();
    
    // Tìm kiếm theo username, email
    const filteredAccounts = searchInArray(accounts, searchTerm, ['username', 'email']);
    
    // Loại bỏ password khỏi response
    const safeAccounts = filteredAccounts.map(({ password, ...account }) => account);
    
    return safeAccounts;
  }
};