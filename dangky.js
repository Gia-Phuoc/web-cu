// file: dangky.js (Nang cap co Validate)

document.addEventListener('DOMContentLoaded', function() {
    
    // === HAM PHU TRO: Kiem tra ngay thang hop le ===
    // (Vi du: 30/02/2000 la sai, 31/04/2001 la sai)
    function isValidDate(day, month, year) {
        // Giam thang di 1 (vi thang trong JS bat dau tu 0 -> 11)
        const date = new Date(year, month - 1, day);
        
        // Kiem tra xem ngay, thang, nam co bi "tran" khong
        // Vi du: 30/2/2000 -> JS se tu hieu la 1/3/2000
        return (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
        );
    }
    // ===================================================

    // 1. Chọn form đăng ký
    const registerForm = document.querySelector('.register-form');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn form gửi đi

        // 2. Lấy giá trị từ các ô input
        // (Luu y: dam bao cac ID nay ton tai trong file dangky.html)
        const hoTen = document.querySelector('input[placeholder="Nhập họ và tên"]').value.trim();
        const ngaySinh = document.querySelector('input[placeholder="dd/mm/yy"]').value.trim();
        const sdt = document.querySelector('input[placeholder="Nhập số điện thoại"]').value.trim();
        const email = document.querySelector('input[placeholder="Nhập email"]').value.trim();
        const matKhau = document.querySelector('input[placeholder="Nhập mật khẩu của bạn"]').value;
        const nhapLaiMatKhau = document.querySelector('input[placeholder="Nhập lại mật khẩu của bạn"]').value;

        // 3. Kiểm tra (Validate) dữ liệu
        if (!hoTen || !sdt || !matKhau || !nhapLaiMatKhau) {
            alert('Vui lòng điền các trường bắt buộc (Họ tên, SĐT, Mật khẩu).');
            return;
        }

        // === 4. VALIDATE MOI: KIEM TRA SO DIEN THOAI (10 so) ===
        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(sdt)) {
            alert('Số điện thoại không hợp lệ. Phải bắt đầu bằng 0 và có 10 chữ số.');
            return;
        }
        // ======================================================

        // === 5. VALIDATE MOI: KIEM TRA NGAY SINH (dd/mm/yyyy) ===
        // Su dung dinh dang dd/mm/yy ma ban yeu cau
        if (ngaySinh) { // Chi kiem tra neu nguoi dung co nhap
            const dateRegex = /^\d{2}\/\d{2}\/\d{2,4}$/; // Cho phep yy hoac yyyy
            if (!dateRegex.test(ngaySinh)) {
                alert('Định dạng ngày sinh không hợp lệ. Vui lòng nhập theo dạng dd/mm/yy (ví dụ: 20/05/02).');
                return;
            }

            const parts = ngaySinh.split('/');
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10);
            let year = parseInt(parts[2], 10);

            // Chuan hoa nam (vi du: 02 -> 2002, 98 -> 1998)
            if (year < 100) {
                year += (year > 30) ? 1900 : 2000; // Gia su nam > 30 la 19xx, con lai la 20xx
            }
            
            if (!isValidDate(day, month, year)) {
                alert('Ngày sinh không hợp lệ (Ví dụ: 30/02 là sai). Vui lòng kiểm tra lại.');
                return;
            }
        }
        // ======================================================

        if (matKhau !== nhapLaiMatKhau) {
            alert('Mật khẩu nhập lại không khớp!');
            return;
        }
        if (matKhau.length < 6) {
            alert('Mật khẩu phải có ít nhất 6 ký tự.');
            return;
        }

        // 6. Lấy danh sách user cũ từ localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // 7. Kiểm tra SĐT đã tồn tại chưa
        const userDaTonTai = users.find(user => user.sdt === sdt);
        if (userDaTonTai) {
            alert('Số điện thoại này đã được đăng ký!');
            return;
        }

        // 8. Tạo đối tượng user mới (Chi tao 'customer')
        const newUser = {
            id: Date.now(), 
            hoTen: hoTen,
            ngaySinh: ngaySinh, 
            sdt: sdt,
            email: email || '', 
            matKhau: matKhau,
            trangThai: 'Hoạt động', 
            role: 'customer' // Luon la customer
        };

        // 9. Thêm user mới vào danh sách
        users.push(newUser);

        // 10. Lưu lại toàn bộ danh sách vào localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // 11. Thông báo và chuyển hướng
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        window.location.href = 'Dangnhap.html'; 
    });

    // Xử lý nút "Quay lại đăng nhập"
    const backBtn = document.querySelector('.back-btn');
    backBtn.addEventListener('click', function() {
        window.location.href = 'Dangnhap.html';
    });
});