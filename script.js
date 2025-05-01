let cart = [];

document.querySelectorAll(".product button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const product = btn.closest(".product");
    const name = product.getAttribute("data-name");
    const price = parseFloat(product.getAttribute("data-price"));

    const existing = cart.find((item) => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCartCount();
  });
});

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").innerText = count;
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  fetch("/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cart }),
  })
    .then((res) => res.json())
    .then((data) => {
      return stripe.redirectToCheckout({ sessionId: data.id });
    })
    .then((result) => {
      if (result.error) alert(result.error.message);
    });
}

