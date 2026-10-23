
import { useEffect, useMemo, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await API.get("/products");

        const data = res.data.products;
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Products load aagala. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // Available categories from fetched products
  const categories = useMemo(() => {
    const uniqueCategories = products
      .map((product) => product.category)
      .filter(Boolean);

    return ["All", ...new Set(uniqueCategories)];
  }, [products]);

  // Search, filter and sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    const searchText = search.trim().toLowerCase();

    if (searchText) {
      result = result.filter((product) => {
        const name = String(product.name || "").toLowerCase();
        const description = String(
          product.description || ""
        ).toLowerCase();
        const productCategory = String(
          product.category || ""
        ).toLowerCase();

        return (
          name.includes(searchText) ||
          description.includes(searchText) ||
          productCategory.includes(searchText)
        );
      });
    }

    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (sort === "low-high") {
      result.sort(
        (a, b) => Number(a.price || 0) - Number(b.price || 0)
      );
    } else if (sort === "high-low") {
      result.sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      );
    } else if (sort === "name") {
      result.sort((a, b) =>
        String(a.name || "").localeCompare(String(b.name || ""))
      );
    }

    return result;
  }, [products, search, category, sort]);

  return (
    <div className="products-page">
      <h1>Latest Gadgets 🛒</h1>

      <div className="product-toolbar">
        <input
          type="search"
          className="product-search"
          placeholder="🔍 Search gadgets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
        />

        <select
          className="product-filter"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Categories" : item}
            </option>
          ))}
        </select>

        <select
          className="product-filter"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort products"
        >
          <option value="default">Sort: Default</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      <p className="product-result-count">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {loading ? (
        <p className="product-message">Loading products... ⏳</p>
      ) : error ? (
        <div className="product-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="product-message">
          <h2>No products found 😕</h2>
          <p>Try another search term or category.</p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
              setSort("default");
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="products">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;

