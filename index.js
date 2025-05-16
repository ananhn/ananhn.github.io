document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const title = button.getAttribute("data-title");
      const price = parseFloat(button.getAttribute("data-price"));
      const image = button.getAttribute("data-image");

      let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

      const existingItemIndex = cart.findIndex(item => item.title === title && item.image === image);

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        cart.push({ title, price, image, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(cart));

      // Redirect to cart page after adding item
      window.location.href = "cart.html";
    });
  });
});