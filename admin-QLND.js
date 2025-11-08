// file: admin-QLND.js (Da sua loi dieu huong)

document.addEventListener('DOMContentLoaded', function() {
    
    // === BẢO VỆ TRANG ADMIN ===
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    
    if (!loggedInUser || loggedInUser.role !== 'admin') {
        alert('Bạn không có quyền truy cập trang này. Vui lòng đăng nhập với tư cách Admin.');
        
        // === SUA LOI 1: Dieu huong ve trang admin-login.html ===
        // (Gia su admin-login.html cung thu muc voi admin-QLND.html)
        window.location.href = 'admin-login.html'; // Loi cu: '../Dangnhap.html'
        
        return; 
    }

    // Hiển thị tên Admin trên Header
    document.querySelector('.user-greeting').textContent = 'Chào, ' + loggedInUser.hoTen + '!';

    // Xử lý nút Đăng xuất
    document.querySelector('.logout-btn').addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.removeItem('loggedInUser'); // Xóa session
        
        // === SUA LOI 2: Dieu huong ve trang admin-login.html ===
        window.location.href = 'admin-login.html'; // Loi cu: '../Dangnhap.html'
    });
    // ===========================


    // === QUẢN LÝ USER ===
    let allUsers = []; 
    const tableBody = document.querySelector('.data-table tbody');
    // Sửa lại selector cho ô tìm kiếm
    const searchInput = document.querySelector('.search-bar input'); 

    // 1. HÀM TẢI VÀ HIỂN THỊ DỮ LIỆU RA BẢNG (RENDER)
    function renderTable(usersToRender) {
        tableBody.innerHTML = ''; 

        // Loc ra chi hien thi 'customer', khong hien thi admin
        const customers = usersToRender.filter(user => user.role === 'customer');

        if (!customers || customers.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5">Không tìm thấy khách hàng nào.</td></tr>';
            return;
        }

        customers.forEach(user => {
            const row = document.createElement('tr');
            const statusClass = user.trangThai === 'Hoạt động' ? 'active' : 'locked';
            
            // Nút Khoá/Mở khoá
            const lockUnlockBtn = user.trangThai === 'Hoạt động'
                ? `<a href="#" class="action-link lock btn-lock" data-id="${user.id}">Khoá TK</a>`
                : `<a href="#" class="action-link unlock btn-unlock" data-id="${user.id}">Mở khoá</a>`;
            
            const actionButtons = `
                <a href="#" class="action-link reset btn-reset" data-id="${user.id}">Reset Pass</a>
                ${lockUnlockBtn}
            `;

            row.innerHTML = `
                <td>${user.hoTen}</td>
                <td>${user.email}</td>
                <td>${user.sdt}</td>
                <td><span class="status ${statusClass}">${user.trangThai}</span></td>
                <td>${actionButtons}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // 2. HÀM LẤY DỮ LIỆU TỪ LOCALSTORAGE
    function loadUsers() {
        allUsers = JSON.parse(localStorage.getItem('users')) || [];
        renderTable(allUsers);
    }

    // 3. HÀM LƯU DỮ LIỆU VÀO LOCALSTORAGE
    function saveUsers() {
        localStorage.setItem('users', JSON.stringify(allUsers));
    }

    // 4. XỬ LÝ CÁC HÀNH ĐỘNG (RESET, KHOÁ, MỞ KHOÁ)
    tableBody.addEventListener('click', function(e) {
        e.preventDefault(); 
        const target = e.target;
        const id = target.dataset.id; 

        if (!id) return; 

        const userId = parseInt(id); 

        // A. Xử lý Reset Mật khẩu
        if (target.classList.contains('btn-reset')) {
            if (confirm(`Bạn có chắc muốn reset mật khẩu cho user ID ${userId} về "123456" không?`)) {
                const user = allUsers.find(u => u.id === userId);
                if (user) {
                    user.matKhau = '123456';
                    saveUsers(); 
                    alert('Reset mật khẩu thành công!');
                }
            }
        }
        
        // B. Xử lý Khoá TK
        if (target.classList.contains('btn-lock')) {
             if (confirm(`Bạn có chắc muốn KHOÁ tài khoản cho user ID ${userId}?`)) {
                const user = allUsers.find(u => u.id === userId);
                if (user) {
                    user.trangThai = 'Bị khoá';
                    saveUsers();
                    renderTable(allUsers); // Ve lai bang
                }
             }
        }

        // C. Xử lý Mở khoá TK
        if (target.classList.contains('btn-unlock')) {
            if (confirm(`Bạn có chắc muốn MỞ KHOÁ tài khoản cho user ID ${userId}?`)) {
                const user = allUsers.find(u => u.id === userId);
                if (user) {
                    user.trangThai = 'Hoạt động';
                    saveUsers();
                    renderTable(allUsers); // Ve lai bang
                }
            }
        }
    });

    // 5. XỬ LÝ TÌM KIẾM (CLICK VAO NUT)
    
    // Ham tim kiem chinh
    function handleSearch() {
        const query = searchInput.value.toLowerCase().trim();

        const filteredUsers = allUsers.filter(user => {
            // Logic loc van giu nguyen
            return (
                user.hoTen.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.sdt.includes(query)
            );
        });
        renderTable(filteredUsers);
    }
    
    // A. Tim khi nhan vao nut
    const searchButton = document.querySelector('.search-bar button');
    searchButton.addEventListener('click', function() {
        handleSearch();
    });

    // B. Tim khi nhan Enter trong o tim kiem
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // C. (Quan trong) Khi xoa het chu trong o tim kiem, tu dong tai lai bang
    searchInput.addEventListener('input', function(e) {
        if (e.target.value === "") {
            handleSearch(); // Goi ham voi query rong ""
        }
    });

    // === KHỞI CHẠY ===
    loadUsers();
});