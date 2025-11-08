// file: dangnhap.js (Chi danh cho User)

document.addEventListener('DOMContentLoaded', function() {
    
    // KHONG CON HAM initAdmin()

    // 1. Chọn form đăng nhập
    const loginForm = document.querySelector('form');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // 2. Lấy giá trị
        const sdt = document.getElementById('phone').value.trim();
        const matKhau = document.getElementById('password').value;

        // 3. Validate nhanh
        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(sdt)) {
            alert('Số điện thoại không hợp lệ. Phải bắt đầu bằng 0 và có 10 chữ số.');
            return;
        }
        if (matKhau.length < 6) {
            alert('Mật khẩu phải có ít nhất 6 ký tự.');
            return;
        }

        // 4. Lấy danh sách user từ localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // 5. Tìm user
        const user = users.find(u => u.sdt === sdt && u.matKhau === matKhau);

        // 6. Xử lý logic đăng nhập
        if (!user) {
            alert('Sai số điện thoại hoặc mật khẩu!');
        } else if (user.role === 'admin') {
            alert('Đây là tài khoản Admin. Vui lòng sử dụng trang đăng nhập Admin!');
        } else if (user.trangThai === 'Bị khoá') {
            alert('Tài khoản của bạn đã bị khoá. Vui lòng liên hệ admin.');
        } else if (user.role === 'customer') {
            // Đăng nhập thành công
            alert('Đăng nhập thành công! Chào mừng ' + user.hoTen);

            sessionStorage.setItem('loggedInUser', JSON.stringify(user));

            // Chuyen den trang chu (Ban sua link nay neu can)
            window.location.href = 'Layout-TrangChu.html'; 
        }
    });

    // Xử lý link "Đăng ký ngay"
    const registerLink = document.querySelector('.register a');
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'dangky.html';
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