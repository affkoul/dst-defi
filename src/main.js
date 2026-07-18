const products = [
  { id: 1, name: "Classic Burger", price: 12.99, desc: "Juicy beef patty with fresh toppings", emoji: "🍔" },
  { id: 2, name: "Crispy Chicken", price: 11.99, desc: "Golden fried chicken with special sauce", emoji: "🍗" },
  { id: 3, name: "Loaded Fries", price: 6.99, desc: "Fries topped with cheese and jalapeños", emoji: "🍟" },
  { id: 4, name: "Veggie Wrap", price: 9.99, desc: "Fresh veggies in a warm tortilla", emoji: "🌯" },
  { id: 5, name: "BBQ Ribs", price: 18.99, desc: "Slow-cooked ribs with smoky BBQ sauce", emoji: "🍖" },
  { id: 6, name: "Caesar Salad", price: 8.99, desc: "Crisp romaine with parmesan and croutons", emoji: "🥗" },
  { id: 7, name: "Pepperoni Pizza", price: 14.99, desc: "Classic pizza with extra cheese", emoji: "🍕" },
  { id: 8, name: "Chocolate Shake", price: 5.99, desc: "Thick and creamy milkshake", emoji: "🥤" },
];

let cart = [];

function renderProducts() {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = products.map(p => `
    <div class="card">
      <div style="font-size:5rem;text-align:center;padding:1rem;background:#111">${p.emoji}</div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="price">$${p.price.toFixed(2)}</div>
        <button class="btn-primary" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
  toggleCart(true);
}

function updateCart() {
  document.getElementById('cart-count').textContent = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cart-items').innerHTML = cart.map(i => `
    <div class="cart-item">
      <span>${i.emoji} ${i.name} x${i.qty}</span>
      <span>$${(i.price * i.qty).toFixed(2)}</span>
    </div>
  `).join('');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cart-total').textContent = total.toFixed(2);
}

function toggleCart(forceOpen = false) {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('overlay');
  if (forceOpen || !sidebar.classList.contains('open')) {
    sidebar.classList.add('open');
    overlay.classList.add('active');
  } else {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }
}

function closeAll() {
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('checkout-modal').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
}

function goToCheckout() {
  if (cart.length === 0) return alert('Your cart is empty!');
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('checkout-modal').classList.add('open');
  document.getElementById('overlay').classList.add('active');
}

let otpVerified = false;
let generatedOTP = '';

function sendOTP() {
  const phone = document.getElementById('phone').value;
  if (!phone) return alert('Please enter your phone number first');
  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  alert(`Demo mode: Your OTP is ${generatedOTP}`);
}

document.getElementById('checkout-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const otp = document.getElementById('otp').value;
  if (otp !== generatedOTP) return alert('Invalid OTP. Please verify your phone number.');
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  closeAll();
  showOrderConfirmation(phone);
});

function showOrderConfirmation(phone) {
  document.body.innerHTML += `
    <div class="modal open" style="display:block">
      <div style="text-align:center;padding:2rem">
        <div style="font-size:4rem">✅</div>
        <h2 style="color:#ff4500;margin:1rem 0">Order Placed!</h2>
        <p style="color:#aaa">Thank you for your order.</p>
        <p style="color:#aaa;margin-top:0.5rem">Tracking updates will be sent to ${phone}</p>
        <div style="margin-top:2rem;padding:1rem;background:#0f0f0f;border-radius:8px">
          <p style="color:#ff4500;font-size:1.1rem">📦 Estimated delivery: 30-45 mins</p>
        </div>
        <button class="btn-primary" style="margin-top:1.5rem" onclick="location.reload()">Back to Menu</button>
      </div>
    </div>
  `;
}

renderProducts();
