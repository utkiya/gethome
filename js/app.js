// ===== GETHOME APP.JS =====

let cart = {};        // { productId: quantity }
let currentLocation = '';
let currentFilter = 'all';
let selectedPayment = 'UPI';

// ===========================
// INIT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderFeatured();
  renderAllProducts('all');
  setupSearch();
  setupFilters();

  // Auto-open location modal on first visit
  const saved = localStorage.getItem('gethome_location');
  if (saved) {
    currentLocation = saved;
    document.getElementById('location-label').textContent = saved;
  } else {
    setTimeout(() => openLocationModal(), 600);
  }

  // Load cart from storage
  const savedCart = localStorage.getItem('gethome_cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
  }
});

// ===========================
// RENDER CATEGORIES
// ===========================
function renderCategories() {
  const grid = document.getElementById('categories-grid');
  grid.innerHTML = CATEGORIES.map(cat => `
    <div class="cat-card" onclick="filterByCategory('${cat.id}', this)">
      <span class="cat-emoji">${cat.emoji}</span>
      <span class="cat-name">${cat.name}</span>
    </div>
  `).join('');
}

function filterByCategory(catId, el) {
  // Remove active from all category cards
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');

  // Scroll to products
  document.getElementById('all-products').scrollIntoView({ behavior: 'smooth' });

  // Update filter buttons
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === catId);
  });

  currentFilter = catId;
  renderAllProducts(catId);
}

// ===========================
// RENDER PRODUCTS
// ===========================
function renderFeatured() {
  const featured = PRODUCTS.filter(p => p.featured).slice(0, 8);
  const grid = document.getElementById('featured-grid');
  grid.innerHTML = featured.map(p => productCardHTML(p)).join('');
}

function renderAllProducts(cat) {
  const list = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  const grid = document.getElementById('products-grid');

  if (list.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:#6b7280;font-size:1.2rem;">No products found 😢</div>';
    return;
  }

  grid.innerHTML = list.map(p => productCardHTML(p)).join('');
}

function productCardHTML(p) {
  const inCart = cart[p.id] || 0;
  const wasHTML = p.was ? `<span class="was">₹${p.was}</span>` : '';
  const badgeHTML = p.badge ? `<div class="product-badge">${p.badge}</div>` : '';
  const ctaHTML = inCart > 0
    ? `<div class="qty-control">
         <button onclick="changeQty(${p.id}, -1)">−</button>
         <span>${inCart}</span>
         <button onclick="changeQty(${p.id}, 1)">+</button>
       </div>`
    : `<button class="add-btn" onclick="addToCart(${p.id})">+ Add</button>`;

  return `
    <div class="product-card" id="pcard-${p.id}">
      ${badgeHTML}
      <div class="product-img-area">${p.emoji}</div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-qty">${p.qty}</div>
        <div class="product-footer">
          <div class="product-price">₹${p.price} ${wasHTML}</div>
          <div id="cta-${p.id}">${ctaHTML}</div>
        </div>
      </div>
    </div>
  `;
}

function refreshProductCard(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const inCart = cart[id] || 0;

  const ctaEl = document.getElementById(`cta-${id}`);
  if (!ctaEl) return;

  if (inCart > 0) {
    ctaEl.innerHTML = `
      <div class="qty-control">
        <button onclick="changeQty(${id}, -1)">−</button>
        <span>${inCart}</span>
        <button onclick="changeQty(${id}, 1)">+</button>
      </div>`;
  } else {
    ctaEl.innerHTML = `<button class="add-btn" onclick="addToCart(${id})">+ Add</button>`;
  }

  // Also refresh in featured grid if present
  const ftaEl = document.querySelector(`#featured-grid #cta-${id}`);
  // not directly accessible like that — use querySelectorAll
  document.querySelectorAll(`[id="cta-${id}"]`).forEach(el => {
    if (inCart > 0) {
      el.innerHTML = `
        <div class="qty-control">
          <button onclick="changeQty(${id}, -1)">−</button>
          <span>${inCart}</span>
          <button onclick="changeQty(${id}, 1)">+</button>
        </div>`;
    } else {
      el.innerHTML = `<button class="add-btn" onclick="addToCart(${id})">+ Add</button>`;
    }
  });
}

// ===========================
// CART LOGIC
// ===========================
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  updateCartUI();
  refreshProductCard(id);
  showToast(`🛒 ${product.name} added!`);
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id] += delta;
  if (cart[id] <= 0) {
    delete cart[id];
  }
  saveCart();
  updateCartUI();
  refreshProductCard(id);
}

function saveCart() {
  localStorage.setItem('gethome_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const ids = Object.keys(cart).map(Number);
  const totalQty = ids.reduce((sum, id) => sum + cart[id], 0);
  document.getElementById('cart-count').textContent = totalQty;

  const itemsEl = document.getElementById('cart-items');
  const emptyEl = document.getElementById('cart-empty');
  const footerEl = document.getElementById('cart-footer');

  if (ids.length === 0) {
    emptyEl.style.display = 'flex';
    footerEl.style.display = 'none';
    itemsEl.innerHTML = '';
    itemsEl.appendChild(emptyEl);
    return;
  }

  emptyEl.style.display = 'none';
  footerEl.style.display = 'block';

  let subtotal = 0;
  const itemsHTML = ids.map(id => {
    const p = PRODUCTS.find(p => p.id === id);
    if (!p) return '';
    const lineTotal = p.price * cart[id];
    subtotal += lineTotal;
    return `
      <div class="cart-item">
        <div class="ci-emoji">${p.emoji}</div>
        <div class="ci-info">
          <div class="ci-name">${p.name}</div>
          <div class="ci-price">₹${lineTotal}</div>
        </div>
        <div class="ci-qty-control">
          <button onclick="changeQty(${id}, -1)">−</button>
          <span>${cart[id]}</span>
          <button onclick="changeQty(${id}, 1)">+</button>
        </div>
      </div>
    `;
  }).join('');

  itemsEl.innerHTML = itemsHTML;

  document.getElementById('cart-subtotal').textContent = `₹${subtotal}`;
  document.getElementById('cart-total').textContent = `₹${subtotal}`;
}

function openCart() {
  document.getElementById('cart-drawer').classList.add('show');
  document.getElementById('cart-overlay').classList.add('show');
}

function closeCart() {
  document.getElementById('cart-drawer').classList.remove('show');
  document.getElementById('cart-overlay').classList.remove('show');
}

// ===========================
// LOCATION
// ===========================
function openLocationModal() {
  document.getElementById('location-modal').classList.add('show');
}

function closeLocationModal() {
  document.getElementById('location-modal').classList.remove('show');
}

function setLocation(loc) {
  document.getElementById('address-input').value = loc;
}

function confirmLocation() {
  const val = document.getElementById('address-input').value.trim();
  if (!val) { showToast('⚠️ Please enter a location'); return; }
  currentLocation = val;
  document.getElementById('location-label').textContent = val.length > 22 ? val.slice(0, 22) + '…' : val;
  localStorage.setItem('gethome_location', val);
  closeLocationModal();
  showToast('📍 Location set!');
}

// ===========================
// SEARCH
// ===========================
function setupSearch() {
  const input = document.getElementById('global-search');
  const dropdown = document.getElementById('search-dropdown');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { dropdown.classList.remove('show'); return; }

    const results = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) || p.cat.includes(q)
    ).slice(0, 6);

    if (results.length === 0) {
      dropdown.innerHTML = '<div class="search-result-item"><span class="sr-name">No results found</span></div>';
    } else {
      dropdown.innerHTML = results.map(p => `
        <div class="search-result-item" onclick="searchSelect(${p.id})">
          <span class="sr-emoji">${p.emoji}</span>
          <span class="sr-name">${p.name}<br><small style="color:#9ca3af">${p.qty}</small></span>
          <span class="sr-price">₹${p.price}</span>
        </div>
      `).join('');
    }
    dropdown.classList.add('show');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-search')) dropdown.classList.remove('show');
  });
}

function searchSelect(id) {
  addToCart(id);
  document.getElementById('global-search').value = '';
  document.getElementById('search-dropdown').classList.remove('show');
}

// ===========================
// FILTER BUTTONS
// ===========================
function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.cat;
      renderAllProducts(currentFilter);
    });
  });
}

// ===========================
// CHECKOUT
// ===========================
function proceedToCheckout() {
  if (Object.keys(cart).length === 0) {
    showToast('🛒 Cart is empty!');
    return;
  }
  if (!currentLocation) {
    closeCart();
    setTimeout(() => openLocationModal(), 200);
    return;
  }
  closeCart();

  const ids = Object.keys(cart).map(Number);
  let subtotal = 0;
  const itemsHTML = ids.map(id => {
    const p = PRODUCTS.find(p => p.id === id);
    const line = p.price * cart[id];
    subtotal += line;
    return `<div class="checkout-item"><span>${p.emoji} ${p.name} x${cart[id]}</span><span>₹${line}</span></div>`;
  }).join('');

  document.getElementById('checkout-address-text').textContent = currentLocation;
  document.getElementById('checkout-items').innerHTML = itemsHTML;
  document.getElementById('checkout-total-val').textContent = `₹${subtotal}`;

  document.getElementById('checkout-modal').classList.add('show');
}

function closeCheckout() {
  document.getElementById('checkout-modal').classList.remove('show');
}

function selectPayment(btn, method) {
  document.querySelectorAll('.pay-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedPayment = method;
}

function placeOrder() {
  closeCheckout();
  const orderId = 'GH' + Date.now().toString().slice(-6);
  document.getElementById('order-id').textContent = `Order ID: #${orderId}`;
  document.getElementById('success-modal').classList.add('show');

  // Clear cart
  cart = {};
  saveCart();
  updateCartUI();

  // Reset all product CTAs
  PRODUCTS.forEach(p => refreshProductCard(p.id));
}

function closeSuccess() {
  document.getElementById('success-modal').classList.remove('show');
}

// ===========================
// TOAST
// ===========================
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}
