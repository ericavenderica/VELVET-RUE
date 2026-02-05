import { useState, useEffect, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { Heart } from 'lucide-react';

const ProductList = () => {
  const { search, addToWishlist, removeFromWishlist, isInWishlist } = useContext(ShopContext);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  
  //filters state
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  // 1.fetch Data Once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
           throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
           setAllProducts(data);
           setFilteredProducts(data);
        } else {
           console.error('Data is not an array:', data);
           setAllProducts([]);
           setFilteredProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setAllProducts([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 2.apply filters & sort whenever dependencies change
  useEffect(() => {
    let result = [...allProducts];

    //filter by URL category
    if (category) {
      result = result.filter(p => p.category === category);
    }

    //filter by Search
    if (search) {
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    //filter by Selected Categories
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    //filter by Selected Types (Subcategories)
    if (selectedTypes.length > 0) {
      result = result.filter(p => 
        selectedTypes.includes(p.subCategory) || selectedTypes.includes(p.type)
      );
    }

    //sort
    switch (sortType) {
      case 'low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [allProducts, category, search, selectedCategories, selectedTypes, sortType]);

  const toggleCategory = (e) => {
    if (selectedCategories.includes(e.target.value)) {
      setSelectedCategories(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSelectedCategories(prev => [...prev, e.target.value]);
    }
  };

  const toggleType = (e) => {
    const value = e.target.value;
    setSelectedTypes(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  return (
    <div className="collection-container">
      <div className="collection-layout">
        
        {/* Sidebar Filters */}
        <div className="filter-sidebar">
          <h2 className="filter-title-main">Filters</h2>
          
          <div className="filter-section">
            <h3 className="filter-subtitle">Categories</h3>
            <div className="filter-group">
              <label className="filter-label">
                <input type="checkbox" value="makeup" onChange={toggleCategory} checked={selectedCategories.includes('makeup')} /> Makeup
              </label>
              <label className="filter-label">
                <input type="checkbox" value="skincare" onChange={toggleCategory} checked={selectedCategories.includes('skincare')} /> Skincare
              </label>
              <label className="filter-label">
                <input type="checkbox" value="accessories" onChange={toggleCategory} checked={selectedCategories.includes('accessories')} /> Accessories
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-subtitle">Type</h3>
            <div className="filter-group">
              <label className="filter-label">
                <input type="checkbox" value="face" onChange={toggleType} checked={selectedTypes.includes('face')} /> Face
              </label>
              <label className="filter-label">
                <input type="checkbox" value="eyes" onChange={toggleType} checked={selectedTypes.includes('eyes')} /> Eyes
              </label>
              <label className="filter-label">
                <input type="checkbox" value="lips" onChange={toggleType} checked={selectedTypes.includes('lips')} /> Lips
              </label>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="collection-content">
          <div className="collection-header">
            <div className="heading-text heading-line" style={{ fontSize: '1.5rem', margin: 0 }}>
              ALL <span>COLLECTIONS</span>
            </div>
            <select 
              className="sort-select"
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          <div className="product-grid">
            {loading ? <p>Loading...</p> : filteredProducts.map((product) => (
              <div key={product.id} className="product-card-wrapper">
                 <button 
                    className="wishlist-btn"
                    onClick={(e) => {
                       e.preventDefault(); 
                       if (isInWishlist(product.id)) {
                          removeFromWishlist(product.id);
                       } else {
                          addToWishlist(product);
                       }
                    }}
                 >
                    <Heart 
                       size={18} 
                       fill={isInWishlist(product.id) ? "#ef4444" : "none"}
                       className={isInWishlist(product.id) ? "icon-active" : "icon-inactive"} 
                    />
                 </button>
                <Link to={`/products/${product.id}`} className="block">
                <div className="product-img-wrap">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="product-img"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x250?text=No+Image';
                    }}
                  />
                </div>
                <h3 className="product-title">{product.name}</h3>
                <p className="product-price">${product.price}</p>
              </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
