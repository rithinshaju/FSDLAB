const baseURL = '/api/products';

// For Catalog Page
if (document.getElementById('productGrid')) {
  fetch(baseURL)
    .then(res => res.json())
    .then(products => {
      const grid = document.getElementById('productGrid');
      grid.innerHTML = products.map(p => `
        <div class="card">
          <img src="${p.image || 'https://via.placeholder.com/200'}">
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
          <small>${p.category}</small>
        </div>
      `).join('');
    });
}

// For Admin Page
if (document.getElementById('productForm')) {
  const form = document.getElementById('productForm');
  const list = document.getElementById('adminList');

  function loadProducts() {
    fetch(baseURL)
      .then(res => res.json())
      .then(products => {
        list.innerHTML = products.map(p => `
          <div class="card">
            <img src="${p.image || 'https://via.placeholder.com/200'}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <p>${p.category}</p>
            <button class="delete" onclick="deleteProduct('${p._id}')">Delete</button>
          </div>
        `).join('');
      });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);
    fetch(baseURL, {
      method: 'POST',
      body: formData
    }).then(() => {
      form.reset();
      loadProducts();
    });
  });

  window.deleteProduct = (id) => {
    fetch(`${baseURL}/${id}`, { method: 'DELETE' })
      .then(() => loadProducts());
  };

  loadProducts();
}
