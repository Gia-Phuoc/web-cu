// file: admin-login.js (Moi - Chi danh cho Admin)

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Chọn form đăng nhập
    const loginForm = document.getElementById('admin-login-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // 2. Lấy giá trị (tu ID trong admin-login.html)
        const username = document.getElementById('username').value.trim();
        const matKhau = document.getElementById('password').value;

        // 3. Lấy danh sách user từ localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // 4. Tìm user ADMIN
        // (Luu y: username o day dang duoc check voi 'sdt' trong localStorage)
        const user = users.find(u => u.sdt === username && u.matKhau === matKhau);

        // 5. Xử lý logic đăng nhập
        if (!user || user.role !== 'admin') {
            alert('Sai tên đăng nhập, mật khẩu, hoặc bạn không phải Admin!');
        } else if (user.trangThai === 'Bị khoá') {
            alert('Tài khoản Admin này đã bị khoá!');
        } else {
            // Đăng nhập thành công
            alert('Đăng nhập Admin thành công! Chào mừng ' + user.hoTen);

            // Lưu thông tin đăng nhập vào sessionStorage
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));

            // === 6. ĐIỀU HƯỚNG SANG TRANG QLND ===
            window.location.href = 'admin-Dashboard.html'; 
        }
    });

    // Xử lý con mắt show/hide password
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    togglePassword.addEventListener('click', function () {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
        this.classList.toggle('fa-eye');
    });
});