
let cartCount = 0;

document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
        cartCount++;
        document.getElementById("cart-count").innerText = cartCount;
    });
});

function checkout() {
    const items = [
        { name: "Chiefs Coin", price: 20, quantity: 1 },
        { name: "Chiefs Shirt", price: 25, quantity: 1 },
        { name: "Chiefs Buckle", price: 30, quantity: 1 }
    ];

    fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
    })
    .then(res => res.json())
    .then(data => {
        return stripe.redirectToCheckout({ sessionId: data.id });
    })
    .then(result => {
        if (result.error) alert(result.error.message);
    });
}
