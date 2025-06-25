const form = document.getElementById("productForm");
const productList = document.getElementById("products");
const loginBtn = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");
const adminPanel = document.getElementById("adminPanel");
const submitLogin = document.getElementById("submitLogin");
const logoutBtn = document.getElementById("logoutBtn");
const adminPass = document.getElementById("adminPass");

let isAdmin = false;

// Load products from localStorage
let products = JSON.parse(localStorage.getItem("products")) || [];
renderProducts();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const desc = document.getElementById("desc").value;
  const imageFile = document.getElementById("image").files[0];

  const reader = new FileReader();
  reader.onload = function () {
    const image = reader.result;

    const newProduct = { name, price, desc, image };
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    form.reset();
    renderProducts();
  };

  if (imageFile) {
    reader.readAsDataURL(imageFile);
  }
});

// Show login form
loginBtn.addEventListener("click", () => {
  loginForm.classList.toggle("hidden");
});

// Admin login (password is "admin123")
submitLogin.addEventListener("click", () => {
  if (adminPass.value === "admin123") {
    isAdmin = true;
    adminPanel.classList.remove("hidden");
    loginForm.classList.add("hidden");
    loginBtn.classList.add("hidden");
    renderProducts();
  } else {
    alert("Wrong password!");
  }
});

// Admin logout
logoutBtn.addEventListener("click", () => {
  isAdmin = false;
  adminPanel.classList.add("hidden");
  loginBtn.classList.remove("hidden");
  renderProducts();
});

// Delete product
function deleteProduct(index) {
  if (confirm("Delete this product?")) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  }
}

// Show products
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product";
    if (isAdmin) div.classList.add("admin");

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <p>${product.desc}</p>
      ${isAdmin ? `<button class="delete-btn" onclick="deleteProduct(${index})">X</button>` : ""}
    `;

    productList.appendChild(div);
  });
}
