let products = [];
let sortState = {
  priceAsc: true,
  storageAsc: true
};

// -------------------- //
// ĐỌC FILE SẢN PHẨM
// -------------------- //
fetch('products.json')
  .then(response => response.json()) // đọc file JSON
  .then(data => {
    products = data; // gán trực tiếp danh sách sản phẩm
    displayProducts(products); // hiển thị
  })
  .catch(error => console.error('Lỗi khi đọc file JSON:', error));


// -------------------- //
// HIỂN THỊ SẢN PHẨM
// -------------------- //
function displayProducts(list) {
  const container = document.querySelector('.pro-container');
  container.innerHTML = "";

  list.forEach((p, index) => {
    const div = document.createElement('div');
    div.classList.add('pro');
    if (index >= 20) {
      div.classList.add('hidden');
      div.style.display = "none";
    }

    div.innerHTML = `
      <span class="discount">Giảm giá ${p.discount}</span>
      <span class="installment">Trả góp ${p.installment}</span>
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p class="price">${p.price.toLocaleString()}đ</p>
      <div class="info">
        <span>${p.screen}</span>
        <span>${p.storage}GB</span>
      </div>
      <div class="promotion">${p.promo.replace('|', '<br>')}</div>
      <div class="bottom">
        <span class="rating">${p.rating}</span>
        <a href="#" class="favorite">Yêu thích</a>
      </div>
    `;
    container.appendChild(div);
  });
}


// -------------------- //
// NÚT XEM THÊM
// -------------------- //
function seemoreFunc() {
  const hiddenProducts = document.querySelectorAll(".pro.hidden");
  hiddenProducts.forEach(pro => (pro.style.display = "block"));
  document.getElementById("seeMoreBtn").style.display = "none";
}


// -------------------- //
// THUẬT TOÁN SẮP XẾP
// -------------------- //
function bubbleSort(arr, key, ascending = true) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const a = arr[j][key];
      const b = arr[j + 1][key];
      const condition = ascending ? a > b : a < b;
      if (condition) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}


// -------------------- //
// GẮN SỰ KIỆN CHO NÚT
// -------------------- //
document.addEventListener("DOMContentLoaded", () => {
  // Nút “Xem theo giá”
  const btnPrice = document.querySelector('.filter-btn:nth-child(4)');
  if (btnPrice) {
    btnPrice.addEventListener('click', () => {
      bubbleSort(products, "price", sortState.priceAsc);
      displayProducts(products);
      sortState.priceAsc = !sortState.priceAsc; // Đảo chiều sau mỗi lần bấm

      // Thêm biểu tượng chỉ hướng ↑ hoặc ↓
      btnPrice.innerHTML = `Xem theo giá ${sortState.priceAsc ? "↑" : "↓"}`;
    });
  }

  // Nút “Bộ nhớ trong”
  const btnStorage = document.querySelector('.filter-btn:nth-child(5)');
  if (btnStorage) {
    btnStorage.addEventListener('click', () => {
      bubbleSort(products, "storage", sortState.storageAsc);
      displayProducts(products);
      sortState.storageAsc = !sortState.storageAsc;

      btnStorage.innerHTML = `Bộ nhớ trong ${sortState.storageAsc ? "↑" : "↓"}`;
    });
  }
  // Sort theo "Dung lượng RAM"
  const btnRam = document.querySelector('.filter-btn:nth-child(6)');
  if (btnRam) {
    btnRam.addEventListener('click', () => {
      bubbleSort(products, "storage", sortState.storageAsc);
      displayProducts(products);
      sortState.storageAsc = !sortState.storageAsc;

      btnRam.innerHTML = `Dung Lượng Ram ${sortState.storageAsc ? "↑" : "↓"}`;
    });
  }
  const btnSrceenSize = document.querySelector('.filter-btn:nth-child(7)');
  if (btnSrceenSize) {
    btnSrceenSize.addEventListener('click', () => {
      bubbleSort(products, "storage", sortState.storageAsc);
      displayProducts(products);
      sortState.storageAsc = !sortState.storageAsc;

      btnSrceenSize.innerHTML = `Kích thước màn hình ${sortState.storageAsc ? "↑" : "↓"}`;
    });
  }
});
