// Đợi cho tất cả nội dung HTML được tải xong rồi mới chạy script
document.addEventListener("DOMContentLoaded", function() {

  // --- SLIDER 1 (GROUP 1) ---
  // Lấy các phần tử của slider 1 dựa trên ID và class của group1
  const slider1 = document.getElementById("slider");
  const items1 = document.querySelectorAll("#slider .item"); // Chỉ tìm item bên trong #slider
  const prevBtn1 = document.querySelector(".group1 .prev"); // Chỉ tìm nút prev trong group1
  const nextBtn1 = document.querySelector(".group1 .next");

  // Kiểm tra xem tất cả các phần tử có tồn tại không
  if (slider1 && items1.length > 0 && prevBtn1 && nextBtn1) {
    let index1 = 0;
    const slide1Width = 1210; // Chiều rộng slide (như code gốc của bạn)

    function showSlide1() {
      slider1.style.transform = `translateX(${-index1 * slide1Width}px)`;
    }

    // Nút Next
    nextBtn1.addEventListener("click", () => {
      if (index1 < items1.length - 1) { // Dừng ở ảnh cuối
        index1++;
        showSlide1();
      }
    });

    // Nút Prev
    prevBtn1.addEventListener("click", () => {
      if (index1 > 0) { // Dừng ở ảnh đầu
        index1--;
        showSlide1();
      }
    });
  }

  // --- SLIDER 2 (GROUP 4 - TRONG CLASS "slide") ---
  // Lấy các phần tử của slider 2
  const slider2 = document.getElementById("slider2"); // Lấy theo ID mới ta thêm vào HTML
  const items2 = document.querySelectorAll("#slider2 .item");
  const prevBtn2 = document.querySelector(".group4 .prev2"); // Lấy theo class mới
  const nextBtn2 = document.querySelector(".group4 .next2"); // Lấy theo class mới

  if (slider2 && items2.length > 0 && prevBtn2 && nextBtn2) {
    let index2 = 0;
    // Từ CSS: width 400px + margin 0 10px (tức là 10px trái, 10px phải) = 420px
    const slide2Width = 420; 
    
    // Giả định ta muốn thấy 3 ảnh một lúc (1260px / 420px = 3)
    const numVisible = 3; 
    // Tính toán index tối đa có thể trượt
    const maxIndex = items2.length > numVisible ? items2.length - numVisible : 0;

    function showSlide2() {
      slider2.style.transform = `translateX(${-index2 * slide2Width}px)`;
    }

    nextBtn2.addEventListener("click", () => {
      if (index2 < maxIndex) { // Dừng khi đến cuối
        index2++;
        showSlide2();
      }
    });

    prevBtn2.addEventListener("click", () => {
      if (index2 > 0) { // Dừng khi về đầu
        index2--;
        showSlide2();
      }
    });
  }

});