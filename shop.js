document.addEventListener("DOMContentLoaded", () => {
  const buyButtons = document.querySelectorAll(".btn-buy");

  buyButtons.forEach(button => {
    button.addEventListener("click", () => {
      const title = button.dataset.title;
      const price = parseFloat(button.dataset.price);
      const image = button.dataset.image;

      let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

      const existingItem = cart.find(item => item.title === title);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          title,
          price,
          image,
          quantity: 1
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(cart));
      window.location.href = "cart.html";
    });
  });
});
