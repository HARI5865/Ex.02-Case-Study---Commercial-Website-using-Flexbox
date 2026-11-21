
let cart = JSON.parse(localStorage.getItem("shopCart")) || [];

function saveCart() {
    localStorage.setItem("shopCart", JSON.stringify(cart));
}

function updateCart() {
    let count = 0;
    let total = 0;

    cart.forEach(item => {
        count += item.quantity;
        total += item.price * item.quantity;
    });

    document.getElementById("cart-count").textContent = count;
    document.getElementById("cart-total").textContent = total.toLocaleString("en-IN");

    let items = document.getElementById("cart-items");

    if (cart.length === 0) {
        items.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        items.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price.toLocaleString("en-IN")} × ${item.quantity}</p>
                </div>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `).join("");
    }

    saveCart();
}

function addToCart(name, price) {
    let item = cart.find(product => product.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    alert(name + " added to cart!");
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("active");
}

updateCart();
