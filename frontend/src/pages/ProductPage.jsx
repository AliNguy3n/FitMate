import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../layouts/MainLayout";
import useProductStore from "../stores/useProductStore";
import LinkCard from "../components/products/LinkCard";

function ProductPage() {
  // product: (type, id, name, image, price, discount, rate, categories)
  const { products } = useProductStore();
  const [activeTab, setActiveTab] = useState("tab-e"); // tab-e (equipment) | tab-s (supplement)
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  // get categories
  const getUnitCategories = (productList) => {
    const categoriesSet = new Set();
    productList.forEach((product) => {
      if (product.categories && Array.isArray(product.categories)) {
        product.categories.forEach((category) => categoriesSet.add(category));
      }
    });

    return [...categoriesSet];
  };

  // search by Name
  const searchByName = (products, name) => {
    if (name === "") {
      return products;
    }

    return products.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  const handleSearchChange = (e) => {
    setName(e.target.value);
  };

  const clearSearch = () => {
    setName("");
  };

  // selected Categories
  const addSelectedCategory = (category) => {
    setSelectedCategories([...selectedCategories, category]);
  };

  const removeSelectedCategory = (category) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== category));
  };

  const clearCategories = () => {
    setSelectedCategories([]);
  };

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      removeSelectedCategory(category);
    } else {
      addSelectedCategory(category);
    }
  };

  // filter products
  const filterProducts = (products, categories, name = "") => {
    let filtered = products;

    if (name !== "") {
      filtered = searchByName(filtered, name);
    }

    if (categories.length > 0) {
      filtered = filtered.filter(
        (p) =>
          p.categories &&
          p.categories.some((category) => categories.includes(category))
      );
    }

    return filtered;
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  useEffect(() => {
    setCurrentPage(1);
    if (activeTab === "tab-e") {
      const equipments = products.filter((p) => p.type === "equipment");
      setCategories(getUnitCategories(equipments));
      setFilteredProducts(filterProducts(equipments, selectedCategories, name));
    } else {
      const supplements = products.filter((p) => p.type === "supplement");
      setCategories(getUnitCategories(supplements));
      setFilteredProducts(
        filterProducts(supplements, selectedCategories, name)
      );
    }
  }, [activeTab, products, selectedCategories, name]);

  return (
    <MainLayout>
      <div className="bg-white p-4 md:p-6">
        {/* Tabs & Search */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-4 border-b border-gray-200">
            <button
              className={`py-2 px-4 font-bold rounded-t ${activeTab === "tab-e"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
                }`}
              onClick={() => setActiveTab("tab-e")}
            >
              <FontAwesomeIcon icon={["fas", "toolbox"]} className="mr-2" />
              Equipment
            </button>
            <button
              className={`py-2 px-4 font-bold rounded-t ${activeTab === "tab-s"
                ? "text-rose-700 border-b-2 border-rose-700"
                : "text-gray-600"
                }`}
              onClick={() => setActiveTab("tab-s")}
            >
              <FontAwesomeIcon icon={["fas", "pills"]} className="mr-2" />
              Dietary Supplement
            </button>
          </div>

          {/* Search box */}
          <div className="flex items-center w-full md:w-96 border border-gray-300 rounded-lg px-3">
            <input
              type="text"
              placeholder="Search by name"
              value={name}
              onChange={handleSearchChange}
              className="w-full py-2 focus:outline-none"
            />
            {name && (
              <button
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-600"
              >
                <FontAwesomeIcon icon={["fas", "xmark"]} />
              </button>
            )}
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filter */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Filter by Category</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.length === 0}
                  onChange={clearCategories}
                  className="mr-2"
                />
                <label>All categories</label>
              </div>
              {categories.map((category, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="mr-2"
                  />
                  <label>
                    {category.charAt(0).toUpperCase() +
                      category.slice(1).replace("-", " ")}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Product List */}
          <div className="w-full md:w-3/4">
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm font-medium">Active filters:</span>
                {selectedCategories.map((category, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {category.charAt(0).toUpperCase() +
                      category.slice(1).replace("-", " ")}
                    <button
                      type="button"
                      onClick={() => removeSelectedCategory(category)}
                      className="ml-1 text-blue-400 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentProducts.length > 0 ? (
                currentProducts.map((p, index) => (
                  <LinkCard
                    key={p.id || index}
                    type={p.type}
                    id={p.id}
                    name={p.name}
                    image={p.image}
                    price={p.price}
                    discount={p.discount}
                    stock={p.stock}
                    rating={p.rating}
                    categories={p.categories}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">
                    {name || selectedCategories.length > 0
                      ? "No products found matching your criteria"
                      : "No products found"}
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredProducts.length > itemsPerPage && (
              <div className="mt-6 flex justify-center space-x-2 flex-wrap">
                {(() => {
                  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
                  const pages = [];

                  const createPageBtn = (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded border ${currentPage === page
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      {page}
                    </button>
                  );

                  if (totalPages <= 6) {
                    // hiển thị tất cả
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(createPageBtn(i));
                    }
                  } else {
                    // luôn hiển thị trang 1
                    pages.push(createPageBtn(1));

                    if (currentPage > 3) {
                      pages.push(<span key="start-ellipsis">...</span>);
                    }

                    // hiển thị 3 trang xung quanh currentPage
                    const start = Math.max(2, currentPage - 1);
                    const end = Math.min(totalPages - 1, currentPage + 1);

                    for (let i = start; i <= end; i++) {
                      pages.push(createPageBtn(i));
                    }

                    if (currentPage < totalPages - 2) {
                      pages.push(<span key="end-ellipsis">...</span>);
                    }

                    // luôn hiển thị trang cuối
                    pages.push(createPageBtn(totalPages));
                  }

                  return pages;
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default ProductPage;
