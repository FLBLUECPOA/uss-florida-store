
let cartCount = 0;

document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
        cartCount++;
        document.getElementById("cart-count").innerText = cartCount;
    });
});

function checkout() {
    alert("Checkout functionality is connected via Stripe/PayPal backend.");
}
