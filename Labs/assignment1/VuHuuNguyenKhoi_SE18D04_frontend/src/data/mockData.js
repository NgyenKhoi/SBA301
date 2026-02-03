// Mock data cho ứng dụng quản lý tin tức
export const mockUsers = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'ADMIN',
    active: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    username: 'staff1',
    email: 'staff1@example.com',
    password: 'staff123',
    role: 'STAFF',
    active: true,
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 3,
    username: 'staff2',
    email: 'staff2@example.com',
    password: 'staff123',
    role: 'STAFF',
    active: true,
    createdAt: '2024-01-03T00:00:00Z'
  },
  {
    id: 4,
    username: 'editor',
    email: 'editor@example.com',
    password: 'editor123',
    role: 'STAFF',
    active: false,
    createdAt: '2024-01-04T00:00:00Z'
  }
];

export const mockCategories = [
  {
    id: 1,
    name: 'Công nghệ',
    description: 'Tin tức về công nghệ, AI, và phần mềm',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Thể thao',
    description: 'Tin tức thể thao trong và ngoài nước',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 3,
    name: 'Kinh tế',
    description: 'Tin tức kinh tế, tài chính, chứng khoán',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z'
  },
  {
    id: 4,
    name: 'Giải trí',
    description: 'Tin tức giải trí, phim ảnh, âm nhạc',
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z'
  },
  {
    id: 5,
    name: 'Sức khỏe',
    description: 'Tin tức về sức khỏe và y tế',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  }
];

export const mockTags = [
  { id: 1, name: 'AI' },
  { id: 2, name: 'Machine Learning' },
  { id: 3, name: 'React' },
  { id: 4, name: 'JavaScript' },
  { id: 5, name: 'Bóng đá' },
  { id: 6, name: 'World Cup' },
  { id: 7, name: 'Chứng khoán' },
  { id: 8, name: 'Crypto' },
  { id: 9, name: 'Phim' },
  { id: 10, name: 'Âm nhạc' },
  { id: 11, name: 'COVID-19' },
  { id: 12, name: 'Vaccine' }
];

export const mockNews = [
  {
    id: 1,
    title: 'AI và Machine Learning đang thay đổi thế giới công nghệ',
    content: 'Trí tuệ nhân tạo (AI) và Machine Learning đang trở thành những công nghệ then chốt trong việc phát triển các ứng dụng hiện đại. Từ việc tự động hóa quy trình kinh doanh đến việc cải thiện trải nghiệm người dùng, AI đang mở ra những cơ hội mới cho các doanh nghiệp...',
    categoryId: 1,
    category: { id: 1, name: 'Công nghệ' },
    authorId: 2,
    author: { id: 2, username: 'staff1' },
    tags: [
      { id: 1, name: 'AI' },
      { id: 2, name: 'Machine Learning' }
    ],
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z'
  },
  {
    id: 2,
    title: 'React 19 ra mắt với nhiều tính năng mới',
    content: 'React 19 đã chính thức được phát hành với nhiều cải tiến đáng kể. Phiên bản mới này mang đến hiệu suất tốt hơn, API đơn giản hơn và nhiều tính năng mới giúp developers xây dựng ứng dụng web hiệu quả hơn...',
    categoryId: 1,
    category: { id: 1, name: 'Công nghệ' },
    authorId: 3,
    author: { id: 3, username: 'staff2' },
    tags: [
      { id: 3, name: 'React' },
      { id: 4, name: 'JavaScript' }
    ],
    createdAt: '2024-02-02T14:30:00Z',
    updatedAt: '2024-02-02T14:30:00Z'
  },
  {
    id: 3,
    title: 'World Cup 2026: Chuẩn bị cho giải đấu lớn nhất hành tinh',
    content: 'World Cup 2026 sẽ được tổ chức tại Mỹ, Canada và Mexico với format mới 48 đội tham dự. Đây sẽ là giải đấu bóng đá lớn nhất từ trước đến nay với nhiều thay đổi về format và quy mô...',
    categoryId: 2,
    category: { id: 2, name: 'Thể thao' },
    authorId: 2,
    author: { id: 2, username: 'staff1' },
    tags: [
      { id: 5, name: 'Bóng đá' },
      { id: 6, name: 'World Cup' }
    ],
    createdAt: '2024-02-03T09:15:00Z',
    updatedAt: '2024-02-03T09:15:00Z'
  },
  {
    id: 4,
    title: 'Thị trường chứng khoán Việt Nam tăng trưởng mạnh',
    content: 'Thị trường chứng khoán Việt Nam đã có những bước tiến đáng kể trong năm qua. VN-Index liên tục thiết lập các mức đỉnh mới, thu hút nhiều nhà đầu tư trong và ngoài nước...',
    categoryId: 3,
    category: { id: 3, name: 'Kinh tế' },
    authorId: 3,
    author: { id: 3, username: 'staff2' },
    tags: [
      { id: 7, name: 'Chứng khoán' }
    ],
    createdAt: '2024-02-04T16:45:00Z',
    updatedAt: '2024-02-04T16:45:00Z'
  },
  {
    id: 5,
    title: 'Cryptocurrency: Xu hướng đầu tư mới của giới trẻ',
    content: 'Tiền điện tử đang trở thành một kênh đầu tư phổ biến, đặc biệt là trong giới trẻ. Bitcoin, Ethereum và các altcoin khác đang thu hút sự chú ý của nhiều nhà đầu tư...',
    categoryId: 3,
    category: { id: 3, name: 'Kinh tế' },
    authorId: 2,
    author: { id: 2, username: 'staff1' },
    tags: [
      { id: 8, name: 'Crypto' }
    ],
    createdAt: '2024-02-05T11:20:00Z',
    updatedAt: '2024-02-05T11:20:00Z'
  },
  {
    id: 6,
    title: 'Phim Việt Nam thắng lớn tại các liên hoan phim quốc tế',
    content: 'Điện ảnh Việt Nam đang có những bước tiến vượt bậc khi liên tục giành được các giải thưởng tại các liên hoan phim quốc tế. Điều này cho thấy chất lượng và tầm ảnh hưởng của phim Việt đang ngày càng được nâng cao...',
    categoryId: 4,
    category: { id: 4, name: 'Giải trí' },
    authorId: 3,
    author: { id: 3, username: 'staff2' },
    tags: [
      { id: 9, name: 'Phim' }
    ],
    createdAt: '2024-02-06T13:10:00Z',
    updatedAt: '2024-02-06T13:10:00Z'
  },
  {
    id: 7,
    title: 'Vaccine COVID-19 thế hệ mới hiệu quả hơn',
    content: 'Các nhà khoa học đã phát triển thành công vaccine COVID-19 thế hệ mới với hiệu quả cao hơn và ít tác dụng phụ hơn. Vaccine mới này có thể bảo vệ chống lại nhiều biến thể của virus...',
    categoryId: 5,
    category: { id: 5, name: 'Sức khỏe' },
    authorId: 2,
    author: { id: 2, username: 'staff1' },
    tags: [
      { id: 11, name: 'COVID-19' },
      { id: 12, name: 'Vaccine' }
    ],
    createdAt: '2024-02-07T08:30:00Z',
    updatedAt: '2024-02-07T08:30:00Z'
  }
];

// Utility functions để làm việc với mock data
export const generateId = (array) => {
  return Math.max(...array.map(item => item.id), 0) + 1;
};

export const delay = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const searchInArray = (array, searchTerm, fields) => {
  if (!searchTerm) return array;
  
  const term = searchTerm.toLowerCase();
  return array.filter(item => 
    fields.some(field => {
      const value = field.split('.').reduce((obj, key) => obj?.[key], item);
      return value?.toString().toLowerCase().includes(term);
    })
  );
};