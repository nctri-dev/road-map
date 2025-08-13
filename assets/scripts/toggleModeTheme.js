// Lấy thẻ button và body
const toggleButton = document.getElementById("theme-toggle");
const body = document.body;

// Hàm để chuyển đổi class 'light-mode'
function toggleLightMode() {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
  const isLight = body.classList.contains("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

// Kiểm tra trạng thái đã lưu khi tải trang
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
} else {
  body.classList.add("light-mode");
}

// Thêm sự kiện click cho button
toggleButton.addEventListener("click", toggleLightMode);
