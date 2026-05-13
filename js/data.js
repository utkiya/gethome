// ===== GETHOME PRODUCT DATA =====

const CATEGORIES = [
  { id: 'fruits', name: 'Fruits & Veggies', emoji: '🍎' },
  { id: 'dairy', name: 'Dairy & Eggs', emoji: '🥛' },
  { id: 'snacks', name: 'Snacks', emoji: '🍿' },
  { id: 'bakery', name: 'Bakery', emoji: '🍞' },
  { id: 'beverages', name: 'Beverages', emoji: '☕' },
  { id: 'household', name: 'Household', emoji: '🧴' },
  { id: 'personal', name: 'Personal Care', emoji: '🌿' },
  { id: 'frozen', name: 'Frozen Foods', emoji: '🧊' },
];

const PRODUCTS = [
  // Fruits & Veggies
  { id: 1, name: 'Organic Bananas', cat: 'fruits', emoji: '🍌', qty: '6 pcs (500g)', price: 49, was: 65, featured: true, badge: '25% OFF' },
  { id: 2, name: 'Fresh Tomatoes', cat: 'fruits', emoji: '🍅', qty: '500g', price: 39, was: null, featured: false },
  { id: 3, name: 'Red Apples', cat: 'fruits', emoji: '🍎', qty: '1 kg', price: 149, was: 180, featured: true, badge: '17% OFF' },
  { id: 4, name: 'Broccoli', cat: 'fruits', emoji: '🥦', qty: '300g', price: 59, was: null, featured: false },
  { id: 5, name: 'Baby Spinach', cat: 'fruits', emoji: '🥬', qty: '200g', price: 35, was: null, featured: false },
  { id: 6, name: 'Sweet Corn', cat: 'fruits', emoji: '🌽', qty: '2 pcs', price: 45, was: 55, badge: '18% OFF', featured: false },
  { id: 7, name: 'Mangoes', cat: 'fruits', emoji: '🥭', qty: '1 kg', price: 129, was: 160, featured: true, badge: 'Seasonal' },
  { id: 8, name: 'Potatoes', cat: 'fruits', emoji: '🥔', qty: '1 kg', price: 29, was: null, featured: false },

  // Dairy & Eggs
  { id: 9, name: 'Full Cream Milk', cat: 'dairy', emoji: '🥛', qty: '1 Litre', price: 72, was: null, featured: true },
  { id: 10, name: 'Amul Butter', cat: 'dairy', emoji: '🧈', qty: '500g', price: 225, was: 250, featured: false, badge: '10% OFF' },
  { id: 11, name: 'Paneer', cat: 'dairy', emoji: '🧀', qty: '200g', price: 89, was: 100, featured: true, badge: 'Fresh' },
  { id: 12, name: 'Farm Eggs', cat: 'dairy', emoji: '🥚', qty: '12 pcs', price: 99, was: null, featured: false },
  { id: 13, name: 'Greek Yogurt', cat: 'dairy', emoji: '🍦', qty: '400g', price: 85, was: 99, featured: false },
  { id: 14, name: 'Amul Cheese', cat: 'dairy', emoji: '🧀', qty: '200g', price: 119, was: null, featured: false },

  // Snacks
  { id: 15, name: 'Lays Classic', cat: 'snacks', emoji: '🍟', qty: '78g', price: 30, was: null, featured: true },
  { id: 16, name: 'Dark Chocolate', cat: 'snacks', emoji: '🍫', qty: '100g', price: 99, was: 120, featured: true, badge: '18% OFF' },
  { id: 17, name: 'Kurkure Masala', cat: 'snacks', emoji: '🍿', qty: '80g', price: 20, was: null, featured: false },
  { id: 18, name: 'Bingo Mad Angles', cat: 'snacks', emoji: '🍿', qty: '78g', price: 25, was: null, featured: false },
  { id: 19, name: 'Oreo Cookies', cat: 'snacks', emoji: '🍪', qty: '300g', price: 79, was: 90, featured: true, badge: '12% OFF' },
  { id: 20, name: 'Roasted Almonds', cat: 'snacks', emoji: '🥜', qty: '200g', price: 149, was: null, featured: false },

  // Bakery
  { id: 21, name: 'White Bread', cat: 'bakery', emoji: '🍞', qty: '400g', price: 45, was: null, featured: true },
  { id: 22, name: 'Croissants', cat: 'bakery', emoji: '🥐', qty: '4 pcs', price: 89, was: 110, featured: false, badge: 'Fresh Baked' },
  { id: 23, name: 'Brown Bread', cat: 'bakery', emoji: '🍞', qty: '400g', price: 55, was: null, featured: false },
  { id: 24, name: 'Multigrain Roti', cat: 'bakery', emoji: '🫓', qty: '10 pcs', price: 69, was: null, featured: false },
  { id: 25, name: 'Pav Buns', cat: 'bakery', emoji: '🥖', qty: '6 pcs', price: 35, was: null, featured: true },

  // Beverages
  { id: 26, name: 'Nescafé Classic', cat: 'beverages', emoji: '☕', qty: '200g', price: 349, was: 399, featured: true, badge: '13% OFF' },
  { id: 27, name: 'Green Tea', cat: 'beverages', emoji: '🍵', qty: '25 bags', price: 149, was: null, featured: false },
  { id: 28, name: 'Tropicana Orange', cat: 'beverages', emoji: '🍊', qty: '1 Litre', price: 109, was: 129, featured: false },
  { id: 29, name: 'Red Bull', cat: 'beverages', emoji: '⚡', qty: '250ml', price: 125, was: null, featured: true },
  { id: 30, name: 'Coca Cola', cat: 'beverages', emoji: '🥤', qty: '2 Litre', price: 89, was: null, featured: false },
  { id: 31, name: 'Lipton Tea', cat: 'beverages', emoji: '🫖', qty: '250g', price: 199, was: 230, featured: false, badge: '13% OFF' },

  // Household
  { id: 32, name: 'Surf Excel', cat: 'household', emoji: '🧺', qty: '1 kg', price: 199, was: 230, featured: true, badge: '13% OFF' },
  { id: 33, name: 'Harpic Cleaner', cat: 'household', emoji: '🧴', qty: '500ml', price: 89, was: null, featured: false },
  { id: 34, name: 'Vim Dishwash', cat: 'household', emoji: '🫧', qty: '500g', price: 69, was: null, featured: false },
  { id: 35, name: 'Scotch Brite', cat: 'household', emoji: '🧽', qty: '3 pcs', price: 79, was: 95, featured: false },
  { id: 36, name: 'Air Freshener', cat: 'household', emoji: '🌸', qty: '300ml', price: 149, was: null, featured: true },

  // Personal Care
  { id: 37, name: 'Dove Soap', cat: 'personal', emoji: '🧼', qty: '100g x 3', price: 149, was: 175, featured: true, badge: '15% OFF' },
  { id: 38, name: 'Head & Shoulders', cat: 'personal', emoji: '🧴', qty: '340ml', price: 279, was: 320, featured: false },
  { id: 39, name: 'Colgate MaxFresh', cat: 'personal', emoji: '🦷', qty: '150g', price: 89, was: null, featured: true },
  { id: 40, name: 'Dettol Handwash', cat: 'personal', emoji: '🌿', qty: '250ml', price: 99, was: null, featured: false },

  // Frozen
  { id: 41, name: 'McCain Fries', cat: 'frozen', emoji: '🍟', qty: '420g', price: 149, was: 175, featured: true, badge: '15% OFF' },
  { id: 42, name: 'Amul Ice Cream', cat: 'frozen', emoji: '🍨', qty: '500ml', price: 175, was: null, featured: true },
  { id: 43, name: 'Frozen Peas', cat: 'frozen', emoji: '🫛', qty: '500g', price: 79, was: null, featured: false },
];
