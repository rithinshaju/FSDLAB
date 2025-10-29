import React, { useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$59.99",
      image: "https://via.placeholder.com/200x150?text=Headphones",
      description: "Noise-cancelling headphones with long battery life."
    },
    {
      id: 2,
      name: "Smartwatch",
      price: "$99.99",
      image: "https://via.placeholder.com/200x150?text=Smartwatch",
      description: "Fitness tracking and notifications on your wrist."
    }
  ]);

  const [selected, setSelected] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // open modal
  const openModal = (product) => {
    setSelected(product);
    setIsEditing(false);
  };

  // close modal
  const closeModal = () => {
    setSelected(null);
  };

  // handle edit form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
  };

  // handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelected({ ...selected, image: imageUrl });
    }
  };

  // save edited product
  const saveChanges = () => {
    setProducts(
      products.map((p) => (p.id === selected.id ? selected : p))
    );
    setIsEditing(false);
  };

  return (
    <div className="app-container">
      <h1 className="title">🛍️ Product Gallery</h1>

      <div className="grid">
        {products.map((item) => (
          <div key={item.id} className="card" onClick={() => openModal(item)}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p className="price">{item.price}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {!isEditing ? (
              <>
                <img src={selected.image} alt={selected.name} className="modal-img" />
                <h2>{selected.name}</h2>
                <p className="price">{selected.price}</p>
                <p className="desc">{selected.description}</p>
                <div className="btn-group">
                  <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
                  <button className="close-btn" onClick={closeModal}>Close</button>
                </div>
              </>
            ) : (
              <>
                <h2>Edit Product</h2>
                <input
                  type="text"
                  name="name"
                  value={selected.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                />
                <input
                  type="text"
                  name="price"
                  value={selected.price}
                  onChange={handleChange}
                  placeholder="Price"
                />
                <textarea
                  name="description"
                  value={selected.description}
                  onChange={handleChange}
                  placeholder="Description"
                />
                <div className="upload-section">
                  <label>Change Image:</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                <div className="btn-group">
                  <button className="save-btn" onClick={saveChanges}>Save</button>
                  <button className="close-btn" onClick={closeModal}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
 