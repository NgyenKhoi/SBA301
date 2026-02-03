# Mock Data Setup - Hướng dẫn sử dụng

## Tổng quan
Frontend đã được chuyển đổi hoàn toàn từ việc sử dụng API thực sang mock data. Tất cả dữ liệu được lưu trữ trong localStorage của trình duyệt.

## Tài khoản mặc định

### Admin Account
- **Email**: admin@example.com
- **Password**: admin123
- **Role**: ADMIN
- **Quyền**: Quản lý tài khoản, xem tất cả tin tức

### Staff Accounts
1. **Staff 1**
   - **Email**: staff1@example.com
   - **Password**: staff123
   - **Role**: STAFF

2. **Staff 2**
   - **Email**: staff2@example.com
   - **Password**: staff123
   - **Role**: STAFF

3. **Editor (Inactive)**
   - **Email**: editor@example.com
   - **Password**: editor123
   - **Role**: STAFF
   - **Status**: Không hoạt động

## Dữ liệu mẫu

### Categories (Danh mục)
- Công nghệ
- Thể thao
- Kinh tế
- Giải trí
- Sức khỏe

### News (Tin tức)
- 7 bài tin tức mẫu với đầy đủ thông tin
- Được phân bổ cho các staff khác nhau
- Có tags và categories đầy đủ

### Tags
- AI, Machine Learning, React, JavaScript
- Bóng đá, World Cup
- Chứng khoán, Crypto
- Phim, Âm nhạc
- COVID-19, Vaccine

## Cách hoạt động

### Lưu trữ dữ liệu
Tất cả dữ liệu được lưu trong localStorage với các keys:
- `mockAccounts` - Danh sách tài khoản
- `mockCategories` - Danh sách danh mục
- `mockNews` - Danh sách tin tức
- `mockTags` - Danh sách tags
- `user` - Thông tin user đang đăng nhập

### Tính năng được hỗ trợ
✅ **Authentication**
- Đăng nhập/đăng xuất
- Phân quyền Admin/Staff
- Bảo vệ routes

✅ **Account Management (Admin only)**
- Xem danh sách tài khoản
- Tạo tài khoản mới
- Cập nhật thông tin tài khoản
- Xóa tài khoản (có validation)
- Tìm kiếm tài khoản

✅ **Category Management (Staff)**
- Xem danh sách danh mục
- Tạo danh mục mới
- Cập nhật danh mục
- Xóa danh mục (kiểm tra ràng buộc)
- Tìm kiếm danh mục

✅ **News Management (Staff)**
- Xem tất cả tin tức
- Xem tin tức của mình
- Tạo tin tức mới
- Cập nhật tin tức (chỉ của mình hoặc admin)
- Xóa tin tức (chỉ của mình hoặc admin)
- Tìm kiếm tin tức
- Quản lý tags tự động

✅ **Profile Management**
- Cập nhật email
- Đổi mật khẩu
- Validation đầy đủ

### Validation và Business Logic
- **Email unique**: Không cho phép email trùng lặp
- **Username unique**: Không cho phép username trùng lặp
- **Category name unique**: Không cho phép tên danh mục trùng lặp
- **Admin protection**: Không thể xóa admin cuối cùng
- **Category constraint**: Không thể xóa danh mục đang được sử dụng
- **News ownership**: Chỉ author hoặc admin mới có thể sửa/xóa tin tức
- **Password validation**: Kiểm tra mật khẩu hiện tại khi đổi mật khẩu mới

### Tự động tạo Tags
- Tags được tạo tự động khi tạo/cập nhật tin tức
- Không phân biệt hoa thường
- Loại bỏ khoảng trắng thừa

## Reset dữ liệu

### Reset toàn bộ
```javascript
// Mở Developer Tools (F12) và chạy:
localStorage.clear();
// Sau đó refresh trang
```

### Reset từng loại dữ liệu
```javascript
// Reset accounts
localStorage.removeItem('mockAccounts');

// Reset categories  
localStorage.removeItem('mockCategories');

// Reset news
localStorage.removeItem('mockNews');

// Reset tags
localStorage.removeItem('mockTags');

// Logout
localStorage.removeItem('user');
```

## Cấu trúc dữ liệu

### User Object
```javascript
{
  id: number,
  username: string,
  email: string,
  password: string,
  role: 'ADMIN' | 'STAFF',
  active: boolean,
  createdAt: ISO8601,
  updatedAt?: ISO8601
}
```

### Category Object
```javascript
{
  id: number,
  name: string,
  description: string,
  createdAt: ISO8601,
  updatedAt: ISO8601
}
```

### News Object
```javascript
{
  id: number,
  title: string,
  content: string,
  categoryId: number,
  category: { id: number, name: string },
  authorId: number,
  author: { id: number, username: string },
  tags: [{ id: number, name: string }],
  createdAt: ISO8601,
  updatedAt: ISO8601
}
```

### Tag Object
```javascript
{
  id: number,
  name: string
}
```

## Lưu ý quan trọng

1. **Dữ liệu chỉ tồn tại trong localStorage** - Sẽ mất khi clear browser data
2. **Không có persistence** - Dữ liệu sẽ reset về mặc định khi localStorage trống
3. **Network delay simulation** - Có delay 500ms để mô phỏng API calls
4. **Error handling** - Đầy đủ error handling giống như API thực
5. **Toast notifications** - Thông báo success/error như bình thường

## Chuyển đổi về API thực

Khi cần chuyển về API thực, chỉ cần:
1. Thay đổi `src/services/api.js` về axios instance
2. Cập nhật các service files để gọi API endpoints thực
3. Xóa import mock data từ các service files

Tất cả components và UI logic không cần thay đổi gì.