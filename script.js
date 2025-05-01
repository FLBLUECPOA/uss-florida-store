let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".product button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const product = btn.closest(".product");
    const name = product.getAttribute("data-name");
    const price = parseFloat(product.getAttribute("data-price"));

    const existing = cart.find((item) => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  });
});

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").innerText = count;
}