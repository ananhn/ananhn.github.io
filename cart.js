document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartSummary = document.querySelector(".cart-summary");
  const cartEmpty = document.querySelector(".cart-empty");
  const totalPriceEl = document.querySelector(".cart-total span:last-child");

  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Render cart items
  function renderCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.style.display = "none";
      cartSummary.style.display = "none";
      cartEmpty.style.display = "block";
      return;
    }

    cart.forEach(item => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-image">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.title}</h4>
          <div class="cart-item-price">AED ${item.price.toFixed(2)}</div>
          <div class="cart-item-quantity">
            <button class="quantity-btn">-</button>
            <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99">
            <button class="quantity-btn">+</button>
          </div>
          <div class="cart-item-subtotal">AED ${(item.price * item.quantity).toFixed(2)}</div>
          <button class="cart-item-remove">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    cartItemsContainer.style.display = "block";
    cartSummary.style.display = "block";
    cartEmpty.style.display = "none";
    updateCart();
  }

  // Handle clicks on cart (remove, +, -)
  cartItemsContainer.addEventListener("click", e => {
    const itemEl = e.target.closest(".cart-item");
    if (!itemEl) return;

    const title = itemEl.querySelector(".cart-item-title").textContent;
    const cartIndex = cart.findIndex(item => item.title === title);

    if (e.target.classList.contains("cart-item-remove")) {
      cart.splice(cartIndex, 1);
      localStorage.setItem("cartItems", JSON.stringify(cart));
      renderCart();
    }

    if (e.target.classList.contains("quantity-btn")) {
      const input = itemEl.querySelector(".quantity-input");
      let quantity = parseInt(input.value);
      if (isNaN(quantity)) quantity = 1;

      if (e.target.textContent === "+" && quantity < 99) quantity++;
      if (e.target.textContent === "-" && quantity > 1) quantity--;

      cart[cartIndex].quantity = quantity;
      localStorage.setItem("cartItems", JSON.stringify(cart));
      renderCart();
    }
  });

  // Update subtotal + total
  function updateCart() {
    let total = 0;
    const items = document.querySelectorAll(".cart-item");

    items.forEach(item => {
      const price = parseFloat(item.querySelector(".cart-item-price").textContent.replace("AED", "").trim());
      const quantity = parseInt(item.querySelector(".quantity-input").value);
      const subtotal = price * quantity;

      item.querySelector(".cart-item-subtotal").textContent = `AED ${subtotal.toFixed(2)}`;
      total += subtotal;
    });

    totalPriceEl.textContent = `AED ${total.toFixed(2)}`;
  }

  // Checkout button
  document.querySelector(".btn-checkout").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add some items first.");
    } else {
      alert("Proceeding to checkout...");
      // window.location.href = "checkout.html";
    }
  });

  // Add-to-Cart from Fast Selling Section
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const title = button.getAttribute("data-title");
      const price = parseFloat(button.getAttribute("data-price"));
      const image = button.getAttribute("data-image");

      const existingItemIndex = cart.findIndex(item => item.title === title);

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        cart.push({ title, price, image, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(cart));
      renderCart();
      alert(`${title} added to cart!`);
    });
  });

  // Initial render
  renderCart();
});