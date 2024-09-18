// Smooth Scroll for Navigation Links
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) { // Only apply smooth scroll for internal links
          e.preventDefault();
          document.querySelector(href).scrollIntoView({
              behavior: 'smooth'
          });
      }
  });
});

// Scroll-to-Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.id = 'scrollToTop';
scrollToTopBtn.style.position = 'fixed';
scrollToTopBtn.style.bottom = '30px';
scrollToTopBtn.style.right = '30px';
scrollToTopBtn.style.padding = '10px';
scrollToTopBtn.style.backgroundColor = '#333';
scrollToTopBtn.style.color = '#fff';
scrollToTopBtn.style.border = 'none';
scrollToTopBtn.style.borderRadius = '5px';
scrollToTopBtn.style.cursor = 'pointer';
scrollToTopBtn.style.display = 'none';
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
      scrollToTopBtn.style.display = 'block';
  } else {
      scrollToTopBtn.style.display = 'none';
  }
});

// Hover Effect on Product Images
document.querySelectorAll('.product img').forEach(img => {
  img.addEventListener('mouseover', () => {
      img.style.transform = 'scale(1.07)';
      img.style.transition = 'transform 0.9s ease';
  });

  img.addEventListener('mouseout', () => {
      img.style.transform = 'scale(1)';
  });
});

// Cart Functionality with LocalStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

function addToCart(productID) {
  const product = findProductById(productID);
  const existingItem = cart.find(item => item.id === productID);

  if (existingItem) {
      existingItem.quantity++;
  } else {
      cart.push({ ...product, quantity: 1 });
  }
  
  updateCartCount();
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`Product ${product.name} added to cart.`);
}

function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cart-count').innerText = cartCount;
}

function findProductById(productID) {
  // Add your actual products data here or fetch from the DOM
  const products = [
      { id: 1, name: 'Mobile Cover', price: 70 },
      { id: 2, name: 'Privacy Glasses', price: 90 },
      { id: 3, name: 'Pendrives', price: 90 },
      { id: 5, name: 'Discounted Item', price: 8 }
  ];
  return products.find(product => product.id === productID);
}

// Wishlist Functionality
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
updateWishlistView();

function updateWishlistView() {
  const wishlistContainer = document.getElementById('wishlist-items');
  if (wishlist.length === 0) {
      wishlistContainer.innerHTML = 'No items in wishlist';
  } else {
      wishlistContainer.innerHTML = wishlist.map(item => `
          <div class="wishlist-item">
              <p>${item.name}</p>
              <button onclick="removeFromWishlist(${item.id})">Remove</button>
          </div>
      `).join('');
  }
}

function addToWishlist(productID) {
  const product = findProductById(productID);
  if (!wishlist.some(item => item.id === productID)) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      updateWishlistView();
      alert(`Product ${product.name} added to wishlist.`);
  }
}

function removeFromWishlist(productID) {
  wishlist = wishlist.filter(item => item.id !== productID);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateWishlistView();
}

// Filter and Sort Products
document.getElementById('apply-filters').addEventListener('click', () => {
  const category = document.getElementById('categories').value;
  const sortOption = document.getElementById('sort').value;

  filterAndSortProducts(category, sortOption);
});

function filterAndSortProducts(category, sortOption) {
  const loader = document.getElementById('filter-loader');
  loader.style.display = 'block';

  setTimeout(() => {
      // Example filtering and sorting logic
      let filteredProducts = products.filter(product => category === 'all' || product.category === category);

      if (sortOption === 'low-high') {
          filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'high-low') {
          filteredProducts.sort((a, b) => b.price - a.price);
      }

      displayFilteredProducts(filteredProducts);
      loader.style.display = 'none';
  }, 1000); // Simulate loading
}

function displayFilteredProducts(filteredProducts) {
  const productSection = document.getElementById('products');
  productSection.innerHTML = filteredProducts.map(product => `
      <div class="product" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
          <a href="product-details.html">
              <img src="${product.image}" alt="${product.name}">
              <h2>${product.name}</h2>
              <p>$${product.price}</p>
          </a>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
          <button onclick="addToWishlist(${product.id})">Add to Wishlist</button>
      </div>
  `).join('');
}

// Search Functionality
document.getElementById('search-button').addEventListener('click', () => {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  searchProducts(searchTerm);
});

function searchProducts(searchTerm) {
  const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
  );
  displayFilteredProducts(filteredProducts);
}

// Clear Cart and Wishlist
document.getElementById('clear-cart').addEventListener('click', () => {
  cart = [];
  localStorage.removeItem('cart');
  updateCartCount();
  alert('Cart cleared!');
});

document.getElementById('clear-wishlist').addEventListener('click', () => {
  wishlist = [];
  localStorage.removeItem('wishlist');
  updateWishlistView();
  alert('Wishlist cleared!');
});


document.getElementById('apply-filters').addEventListener('click', function () {
  const selectedCategory = document.getElementById('categories').value;
  const sortOption = document.getElementById('sort').value;

  let products = document.querySelectorAll('.product');
  
  products.forEach(product => {
    const category = product.dataset.category;
    const price = parseFloat(product.dataset.price);

    if (selectedCategory === 'all' || category === selectedCategory) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }

    // Sorting logic can be applied here based on sortOption
  });
});
  // Function to open the slider menu
function openSliderMenu() {
  document.getElementById("slider-menu").style.width = "250px";
  document.body.classList.add("slider-open");
}

// Function to close the slider menu
function closeSliderMenu() {
  document.getElementById("slider-menu").style.width = "0";
  document.body.classList.remove("slider-open");
}

// Function to view the cart
function viewCart() {
  alert("Redirecting to your cart...");
  // Redirect logic can go here
  closeSliderMenu();
}

// Function to handle logout
function logout() {
  alert("Logging out...");
  // Logout logic can go here (e.g., clearing session, redirecting to homepage, etc.)
  closeSliderMenu();
}
